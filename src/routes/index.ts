import { Router } from 'express';
import blogRouter from "./blog"


const router = Router();


router.use("/blogs", blogRouter)

export default router