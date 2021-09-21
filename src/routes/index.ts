import { Router } from 'express';
import blogRouter from "./blog"


const router = Router();


router.use("/blog", blogRouter)

export default router