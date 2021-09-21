import { IBlog } from "Entities/Blog";
import {Request, Response} from "express";
import { initializeBlogRepository } from "repository/setup";

const blogController = {
  createBlog: async (req:Request, res:Response) => {
    try {
      const data = req.body 
      const repository = await initializeBlogRepository()
      const payload:IBlog = {
        post: data.post,
        content: data.content,
         createdAt : new Date(),
        updatedAt: new Date()    }
      await repository.create(payload)
      return res.status(201).json({payload})
    } catch (e) {
      return res.status(500).json(e)
    }
  },
  getAllBlogs: async (_req:Request, res:Response) => {
    try {
      
    } catch (e) {
      return res.status(500).json(e)
    }
  },
  getBlog: async (_req:Request, res:Response) => {
    try {
      
    } catch (e) {
      return res.status(500).json(e)
    }
  },
  deleteBlog: async (_req:Request, res:Response) => {
    try {
      
    } catch (e) {
      return res.status(500).json(e)
    }
  },
  updateBlog: async (_req:Request, res:Response) => {
    try {
      
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default blogController