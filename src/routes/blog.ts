import { Router } from 'express';
import blogController from "controller/blog"

const router = Router();
const { createBlog, getAllBlogs, getBlog, deleteBlog, updateBlog } = blogController;

router.post("/", createBlog)
router.get("/", getAllBlogs)
router.get("/:id", getBlog)
router.put("/:id", updateBlog)
router.delete("/:id", deleteBlog)




export default router