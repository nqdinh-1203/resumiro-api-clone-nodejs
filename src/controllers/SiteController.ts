import { Request, Response, NextFunction } from 'express';

class SiteController {
    // [GET] /
    index(req: Request, res: Response, next: NextFunction) {
        res.send('Trang chu');
    }
}

export default new SiteController;
