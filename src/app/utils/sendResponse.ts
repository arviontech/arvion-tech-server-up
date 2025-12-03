import { Response } from 'express';
export interface Link {
  href: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

interface IResponse<T> {
  statusCode: number;
  success?: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    links?: Record<string, string>;
  };
  data: T | null;
  links?: Record<string, Link>;
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  const responseData: Partial<IResponse<T>> = {
    statusCode: data.statusCode,
    success: data.statusCode >= 200 && data.statusCode < 300,
    message: data.message,
  };

  if (data.meta) {
    responseData.meta = data.meta;
  }

  // links অবজেক্ট থাকলে তা রেসপন্সে যুক্ত করা হবে
  if (data.links) {
    responseData.links = data.links;
  }

  // ডেটা null না হলেই কেবল রেসপন্সে যুক্ত হবে
  if (data.data !== null && data.data !== undefined) {
    responseData.data = data.data;
  }

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;


