import { Router } from 'express';
import blogController from "controller/blog"

const router = Router();
const { createBlog, getAllBlogs, getBlog, deleteBlog, updateBlog } = blogController;

router.post("/blog", createBlog)
router.get("/blogs", getAllBlogs)
router.get("/blog/:id", getBlog)
router.put("/blog/:id", updateBlog)
router.delete("/blog/:id", deleteBlog)




export default router