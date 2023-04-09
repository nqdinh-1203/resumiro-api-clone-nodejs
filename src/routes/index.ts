// import newsRouter from "./news.route";
import siteRouter from "./site.route";
import { Express } from "express";

function route(app: Express) {
    app.use('/', siteRouter);
}

export default route;