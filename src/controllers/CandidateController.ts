import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

type Data = {
    message: string
    status: string
    data?: any
}

class CandidateController {
    // [GET] /
    index(req: Request, res: Response, next: NextFunction) {
        res.send('Candidate');
    }

    async getCandidateById(req: Request, res: Response<Data>, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            const candidate = await prisma.candidates
                .findFirst({
                    where: { id: id },
                    include: {
                        resumes: {
                            orderBy: {
                                create_at: 'desc'
                            }
                        },
                        candidate_skills: {
                            select: {
                                skill: true
                            }
                        },
                        experiences: {
                            include: {
                                companies: true
                            }
                        },
                        certificates: true
                    }
                })

            if (!candidate) {
                res.status(404).json({
                    message: "Candidate not found",
                    status: "error"
                })
                return;
            }

            res.status(200).json({
                message: 'Successfully get candidate',
                status: 'ok',
                data: candidate
            })
            return;
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                status: "error"
            })
            return;
        }
    }

    async updateInfor(req: Request, res: Response<Data>, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            // console.log(req.body);
            const { avatar, background, full_name, email, phone } = req.body;

            const data = await prisma.candidates.update({
                where: { id: id },
                data: {
                    avatar: avatar,
                    background: background,
                    full_name: full_name,
                    email: email,
                    phone: phone
                }
            })

            if (!data) {
                res.status(400).json({
                    message: "cannot update candidate",
                    status: "error"
                });
                return;
            }

            res.status(200).json({
                message: "Update candidate successfully",
                status: "ok",
                data: data
            })
            return;
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                status: "error"
            });
            return;
        }
    }

    async updateAbout(req: Request, res: Response<Data>, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            // console.log(req.body);
            const { about } = req.body;

            const data = await prisma.candidates.update({
                where: { id: id },
                data: {
                    about
                }
            })

            if (!data) {
                res.status(400).json({
                    message: "cannot update about candidate",
                    status: "error"
                });
                return;
            }

            res.status(200).json({
                message: "Update about candidate successfully",
                status: "ok",
                data: data
            })
            return;
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                status: "error"
            });
            return;
        }
    }

    async insertSkill(req: Request, res: Response<Data>, next: NextFunction) {
        try {
            const candidateId = Number(req.params.id);
            const { skill_id } = req.body;

            const existingSkill = await prisma.skills.findFirst({
                where: { id: Number(skill_id) }
            });

            if (!existingSkill) {
                res.status(404).json({
                    message: "Skill not found",
                    status: "error"
                });
                return;
            }

            const existingSkillWithCandidate = await prisma.candidates_skills.findFirst({
                where: {
                    candidate_id: candidateId,
                    skill_id: Number(skill_id)
                }
            });

            if (existingSkillWithCandidate) {
                res.status(400).json({
                    message: "Skill already added for candidate",
                    status: "error"
                })
                return;
            }

            const data = await prisma.candidates_skills.create({
                data: {
                    candidate_id: candidateId,
                    skill_id: Number(skill_id)
                }
            })

            if (!data) {
                res.status(400).json({
                    message: "cannot add skill for candidate",
                    status: "error"
                })
                return;
            }

            res.status(200).json({
                message: "Successfully add skill for candidate",
                status: "ok",
                data: data
            })
            return;

        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                status: "error"
            })
            return;
        }
    }

    async deleteSkill(req: Request, res: Response<Data>, next: NextFunction) {
        try {
            const candidateId = Number(req.params.id);
            const { skill_id } = req.body;

            const existingSkill = await prisma.skills.findFirst({
                where: { id: Number(skill_id) }
            });

            if (!existingSkill) {
                res.status(404).json({
                    message: "Skill not found",
                    status: "error"
                });
                return;
            }

            const existingSkillWithCandidate = await prisma.candidates_skills.findFirst({
                where: {
                    candidate_id: candidateId,
                    skill_id: Number(skill_id)
                }
            });

            if (!existingSkillWithCandidate) {
                res.status(400).json({
                    message: "Skill not added for candidate",
                    status: "error"
                })
                return;
            }

            const data = await prisma.candidates_skills.delete({
                where: {
                    candidate_id_skill_id: {
                        candidate_id: candidateId,
                        skill_id: Number(skill_id)
                    }
                }
            })

            if (!data) {
                res.status(400).json({
                    message: "cannot delete skill for candidate",
                    status: "error"
                })
                return;
            }

            res.status(200).json({
                message: "Successfully delete skill for candidate",
                status: "ok",
                data: data
            })
            return;
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                status: "error"
            })
        }
    }
}

export default new CandidateController;