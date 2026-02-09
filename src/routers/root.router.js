import express from "express"
import authRouter from "./auth.rooter.js";
import pictureRouter from "./pircture.router.js";
import nguoiDungRouter from "./nguoidung.router.js";
import binhluanRouter from "./binhluan.router.js";

const rootRouter = express.Router();

rootRouter.use("/auth",authRouter);
rootRouter.use("/picture",pictureRouter);
rootRouter.use("/nguoidung",nguoiDungRouter);
rootRouter.use("/binhluan",binhluanRouter);




export default rootRouter