/* eslint-disable @typescript-eslint/no-explicit-any */

import CatchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/sendResponse';
import {
  generateHateoasLinks,
  generateResourceLinks,
} from '../../utils/hateoas';
import { TestimonialService } from './testimonial.services';
import httpStatus from 'http-status';

const createTestimonial = CatchAsync(async (req, res) => {
  const result = await TestimonialService.createTestimonialIntoDB(req);

  const API_BASE_PATH = '/api/v1/testimonials';
  const testimonialResourceUrl = `${API_BASE_PATH}/${result?._id}`;

  const testimonialLinks = generateHateoasLinks({
    self: { href: API_BASE_PATH, method: 'POST' },
    get: { href: testimonialResourceUrl, method: 'GET' },
    update: { href: testimonialResourceUrl, method: 'PATCH' },
    delete: { href: testimonialResourceUrl, method: 'DELETE' },
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial created successfully',
    links: testimonialLinks,
    data: result,
  });
});

const getAllTestimonials = CatchAsync(async (req, res) => {
  const result = await TestimonialService.getAllTestimonialsFromDB();
  const path = 'testimonials';

  const dataWithLinks = result.map((item: any) => ({
    ...item.toObject(),
    links: generateResourceLinks(item, path),
  }));

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonials fetched successfully',
    data: dataWithLinks,
  });
});

const getSingleTestimonial = CatchAsync(async (req, res) => {
  const result = await TestimonialService.getTestimonialFromDB(req.params.id);

  if (!result) {
    throw new Error('Testimonial not found');
  }

  const path = 'testimonials';

  const dataWithLinks = {
    ...result.toObject(),
    links: generateResourceLinks(result, path),
  };

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial fetched successfully',
    data: dataWithLinks,
  });
});

const updateTestimonial = CatchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const file = req.file;

  const result = await TestimonialService.updateTestimonialInDB(
    id,
    payload,
    file,
  );

  if (!result) {
    throw new Error('Testimonial not found');
  }

  const path = 'testimonials';
  const dataWithLinks = {
    ...result.toObject(),
    links: generateResourceLinks(result, path),
  };

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial updated successfully',
    data: dataWithLinks,
  });
});

const deleteTestimonial = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TestimonialService.deleteTestimonialFromDB(id);

  if (!result) {
    throw new Error('Testimonial not found');
  }

  const API_BASE_PATH = '/api/v1/testimonials';
  const testimonialResourceUrl = `${API_BASE_PATH}/${id}`;

  const deleteLinks = generateHateoasLinks({
    self: { href: testimonialResourceUrl, method: 'DELETE' },
    getAll: { href: API_BASE_PATH, method: 'GET' },
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial deleted successfully',
    links: deleteLinks,
    data: result,
  });
});

export const TestimonialController = {
  createTestimonial,
  getAllTestimonials,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
