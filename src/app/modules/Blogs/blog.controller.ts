/* eslint-disable @typescript-eslint/no-explicit-any */

import CatchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/sendResponse';
import {
  generateHateoasLinks,
  generatePaginationLinks,
  generateResourceLinks,
} from '../../utils/hateoas';
import { BlogService } from './blog.services';
import httpStatus from 'http-status';

const createBlog = CatchAsync(async (req, res) => {
  const result = await BlogService.createBlogIntoDB(req);

  const API_BASE_PATH = '/api/v1/blogs';
  const blogResourceUrl = `${API_BASE_PATH}/${result?._id}`;

  const blogLinks = generateHateoasLinks({
    self: { href: API_BASE_PATH, method: 'POST' },
    get: { href: blogResourceUrl, method: 'GET' },
    update: { href: blogResourceUrl, method: 'PATCH' },
    delete: { href: blogResourceUrl, method: 'DELETE' },
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully',
    links: blogLinks,
    data: result,
  });
});

const getAllBlogs = CatchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogsFromDB(req.query);
  const path = 'blogs';

  const metaWithLinks = {
    ...result.meta,
    links: generatePaginationLinks(result.meta, path),
  };

  const dataWithLinks = result.data.map((item: any) => ({
    ...item.toObject(),
    links: generateResourceLinks(item, path),
  }));

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    meta: metaWithLinks,
    data: dataWithLinks,
  });
});

const getSingleBlog = CatchAsync(async (req, res) => {
  const result = await BlogService.getBlogFromDB(req.params.id);

  if (!result) {
    throw new Error('Blog not found');
  }

  const path = 'blogs';

  const dataWithLinks = {
    ...result.toObject(),
    links: generateResourceLinks(result, path),
  };

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched successfully',
    data: dataWithLinks,
  });
});

const updateBlog = CatchAsync(async (req, res) => {
  const result = await BlogService.updateBlog(req);

  if (!result) {
    throw new Error('Blog not found');
  }

  const path = 'blogs';

  const dataWithLinks = {
    ...result.toObject(),
    links: generateResourceLinks(result, path),
  };

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: dataWithLinks,
  });
});

const deleteBlog = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogFromDB(id);

  if (!result) {
    throw new Error('Blog not found');
  }

  const API_BASE_PATH = '/api/v1/blogs';
  const blogResourceUrl = `${API_BASE_PATH}/${id}`;

  const deleteLinks = generateHateoasLinks({
    self: { href: blogResourceUrl, method: 'DELETE' },
    getAll: { href: API_BASE_PATH, method: 'GET' },
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    links: deleteLinks,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
