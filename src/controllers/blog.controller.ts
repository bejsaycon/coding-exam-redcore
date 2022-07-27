import { Request, Response } from 'express';
import {
    CreateBlogInput,
    UpdateBlogInput,
} from '../schemas/blog.schema';
import {
    createBlogPost,
    deleteBlogPost,
    findAndUpdateBlogPost,
    findBlogPost,
    findAllBlogPost,
} from '../services/blog.service';

export async function getAllBlogsController (
    req: Request,
    res: Response
  ) {
    const blogPosts = await findAllBlogPost();
    return res.send(blogPosts);
}

export async function createBlogController (
    req: Request<{}, {}, CreateBlogInput['body']>,
    res: Response
) {
    const body = req.body;
    const blog = await createBlogPost({ ...body });
    return res.send(blog);
}

export async function updateBlogController (
    req: Request<UpdateBlogInput['params']>,
    res: Response
) {
    const blogId = req.params.blogId;
    const update = req.body;

    const blog = await findBlogPost({ blogId });
    if (!blog) {
        return res.sendStatus(404);
    }
    const updatedBlogPost = await findAndUpdateBlogPost({ blogId }, update, {
        new: true,
    });

    return res.send(updatedBlogPost);
}

export async function getBlogController (
  req: Request<UpdateBlogInput['params']>,
  res: Response
) {
  const blogId = req.params.blogId;
  const blog = await findBlogPost({ blogId });

  if (!blog) {
    return res.sendStatus(404);
  }

  return res.send(blog);
}

export async function deleteBlogController (
    req: Request<UpdateBlogInput['params']>,
    res: Response
  ) {

    const blogId = req.params.blogId;
    const blog = await findBlogPost({ blogId });
    if (!blog) {
      return res.sendStatus(404);
    }
    await deleteBlogPost({ blogId });
    return res.sendStatus(200);
}