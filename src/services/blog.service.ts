import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import BlogModel, {
  BlogDocument,
  BlogInput,
} from '../models/blog.model';

export async function createBlogPost(input: BlogInput) {
    const result = await BlogModel.create(input);
    return result;
}

export async function findBlogPost(
  query: FilterQuery<BlogDocument>,
  options: QueryOptions = { lean: true }
) {
    const result = await BlogModel.findOne(query, {}, options);
    return result;
}

export async function findAllBlogPost() {
    const blogs = await BlogModel.find().exec();
    return blogs.map(blog => ({
        id: blog.blogId,
        title: blog.title,
        content: blog.content,
      }));
}

export async function findAndUpdateBlogPost (
  query: FilterQuery<BlogDocument>,
  update: UpdateQuery<BlogDocument>,
  options: QueryOptions
) {
  return BlogModel.findOneAndUpdate(query, update, options);
}

export async function deleteBlogPost(query: FilterQuery<BlogDocument>) {
  return BlogModel.deleteOne(query);
}