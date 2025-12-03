import { Request } from 'express';
import { Blog } from './blog.model';
import httpStatus from 'http-status'
import { AppError } from '../../Error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';


const createBlogIntoDB = async (
  req: Request
) => {
  const { authorImage, blogImage } = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = req.body;
  payload.authorImage = authorImage;
  payload.blogImage = blogImage;
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['blogTitle'];

  const blogQueryBuilder = new QueryBuilder(
    Blog.find(),
    query,
  )
    .search(searchableFields)
    .filter();

  // count the total before pagination
  const meta = await blogQueryBuilder.countTotal();

  // now get the data with remaining method
  const data = await blogQueryBuilder.sort().pagination().fields().modelQuery;

  return {
    meta,
    data,
  };
};

const getBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlog = async (
  req: Request
) => {
  const { authorImage, blogImage } = req.files as { [fieldname: string]: Express.Multer.File[] };

  const payload = req.body;
  const id = req.params.id;
  payload.authorImage = authorImage;
  payload.blogImage = blogImage;

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!updatedBlog) throw new AppError(httpStatus.NOT_FOUND, 'Blog not found')

  return updatedBlog
}

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Blog not found')
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogFromDB,
  updateBlog,
  deleteBlogFromDB
};
