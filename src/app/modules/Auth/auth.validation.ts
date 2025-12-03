import { z } from 'zod';

const registerSchemaValidation = z.object({
  password: z.string().nonempty('Password is required').min(8),
  customer: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.email('Email is required'),
  }),
});

const loginSchemaValidation = z.object({
  email: z.email('Email is required'),
  password: z.string().min(1, 'Password is required'),
});

const otpSchemaValidation = z.object({
  otp: z.string().min(1, 'OTP is required'),
  email: z.email('Email is required'),
});

export const AuthValidation = {
  registerSchemaValidation,
  loginSchemaValidation,
  otpSchemaValidation,
};
