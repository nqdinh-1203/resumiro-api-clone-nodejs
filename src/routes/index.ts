// import newsRouter from "./news.route";
import siteRouter from "./site.route";
import candidateRouter from "./candidate.route";
import { Express } from "express";

function route(app: Express) {
    app.use('/candidate', candidateRouter);
    app.use('/', siteRouter);
}

export default route;