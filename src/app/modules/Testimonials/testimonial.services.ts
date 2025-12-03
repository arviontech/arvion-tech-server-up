import { Request } from 'express';
import { TImageFile } from '../../interface/image.interface';
import { ITestimonial } from './testimonial.interface';
import { Testimonial } from './testimonial.model';

const createTestimonialIntoDB = async (
  req: Request
) => {
  const payload = req.body
  const file = req.file

  payload.image = file?.path
  const result = await Testimonial.create(payload);
  return result;
};

const getAllTestimonialsFromDB = async () => {
  const result = await Testimonial.find().sort('-createdAt');
  return result;
};

const getTestimonialFromDB = async (id: string) => {
  const result = await Testimonial.findById(id);
  return result;
};

const updateTestimonialInDB = async (
  id: string,
  payload: Partial<ITestimonial>,
  imageFile: TImageFile | undefined,
) => {
  if (imageFile) {
    payload.image = imageFile.path;
  }
  const result = await Testimonial.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteTestimonialFromDB = async (id: string) => {
  const result = await Testimonial.findByIdAndDelete(id);
  return result;
};

export const TestimonialService = {
  createTestimonialIntoDB,
  getAllTestimonialsFromDB,
  getTestimonialFromDB,
  updateTestimonialInDB,
  deleteTestimonialFromDB,
};
