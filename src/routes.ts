import { Express, Request, Response } from 'express';
import validateResource from './middlewares/validateResource';
import {
    createBlogController,
    getBlogController,
    getAllBlogsController,
    updateBlogController,
    deleteBlogController,
} from './controllers/blog.controller';
import {
    createBlogSchema,
    deleteBlogSchema,
    getBlogSchema,
    updateBlogSchema,
} from './schemas/blog.schema';

function routes(app: Express) {
    app.get(
        '/routercheck',
        (req: Request, res: Response) => res.sendStatus(200)
    );

    app.post(
        '/api/blogpost',
        validateResource(createBlogSchema),
        createBlogController
    );

    app.get(
        '/api/blogpost',
        getAllBlogsController
    );
    
    app.put(
        '/api/blogpost/:blogId',
        validateResource(updateBlogSchema),
        updateBlogController
    );
    
    app.get(
        '/api/blogpost/:blogId',
        validateResource(getBlogSchema),
        getBlogController
    );
    
    app.delete(
        '/api/blogpost/:blogId',
        validateResource(deleteBlogSchema),
        deleteBlogController
    );
}

export default routes;