import { object, string, TypeOf } from 'zod';

const payload = {
    body: object({
      title: string({
        required_error: 'Title is required',
      }),
      content: string({
        required_error: 'Content is required',
      }).min(120, 'Blog Content should be at least 120 characters long')
    }),
};
const params = {
    params: object({
      blogId: string({
        required_error: 'Blog ID is required',
      }),
    }),
};

export const createBlogSchema = object({
    ...payload,
});
  
export const updateBlogSchema = object({
    ...payload,
    ...params,
});
  
export const deleteBlogSchema = object({
    ...params,
});
  
export const getBlogSchema = object({
    ...params,
});

export type CreateBlogInput = TypeOf<typeof createBlogSchema>;
export type UpdateBlogInput = TypeOf<typeof updateBlogSchema>;
export type ReadBlogInput = TypeOf<typeof getBlogSchema>;
export type DeleteBlogInput = TypeOf<typeof deleteBlogSchema>;