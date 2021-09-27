import { IBlog } from "Entities/Blog";
import {Request, Response} from "express";
import { ObjectId } from "mongodb";
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
  /**
   * 
   * @param _req 
   * @param res 
   * @desc u can pass filters for pagination
   * @returns 
   */
  getAllBlogs: async (_req:Request, res:Response) => {
    try {
      const repository = await initializeBlogRepository()
      // const filters = {limit:3}
      const blogs = await repository.find()
      return res.status(201).json({blogs})

    } catch (e) {
      return res.status(500).json(e)
    }
  },
  getBlog: async (req:Request, res:Response) => {
    try {
      const blogId = req.params.id
      console.log(blogId)
      const repository = await initializeBlogRepository()
      const blogs = await repository.findOne({_id: new ObjectId(blogId)})
      return res.status(201).json({blogs})

    } catch (e) {
      return res.status(500).json(e)
    }
  },
  deleteBlog: async (req:Request, res:Response) => {
    try {
      const blogId = new ObjectId(req.params.id) 
      console.log(blogId)
      const repository = await initializeBlogRepository()
      const blogs = await repository.delete({_id:blogId})
      return res.status(201).json({blogs})

    } catch (e) {
      return res.status(500).json(e)
    }
  },
  updateBlog: async (req:Request, res:Response) => {
    try {
      const blogId = new ObjectId(req.params.id) 
      console.log(blogId)
      const repository = await initializeBlogRepository()
      await repository.update({ _id:blogId}, { post:"Updated"})
      return res.status(201).json({msg:"Blog successfully updated"})
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default blogController