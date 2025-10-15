import express from "express";
import applicationRouter from "./application.js";
import userRouter from "./user.js";
import jobRouter from "./job.js";
import companyRouter from "./company.js";


const router = express.Router();

router.use("/application", applicationRouter);
router.use("/user", userRouter);
router.use("/job", jobRouter);
router.use("/company", companyRouter);


export default router;