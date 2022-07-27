import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface BlogInput{
    blogId?: string,
    title: string;
    content: string
};

export interface BlogDocument extends BlogInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema = new mongoose.Schema(
    {
      blogId: {
            type: String,
            required: true,
            unique: true,
            default: () => `blog_${nanoid()}`,
        },
      title: { type: String, required: true },
      content: { type: String, required: true },
      image: { type: String },
    },
    {
      timestamps: true,
    }
);

const BlogModel = mongoose.model<BlogDocument>('Blog', blogSchema);

export default BlogModel;