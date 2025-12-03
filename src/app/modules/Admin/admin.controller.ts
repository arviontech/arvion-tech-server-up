import catchAsync from '../../utils/catchAsync';
import {
  generateHateoasLinks,
  generatePaginationLinks,
  generateResourceLinks,
} from '../../utils/hateoas';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';
import httpStatus from 'http-status';

const createAdminIntoDB = catchAsync(async (req, res) => {
  const result = await AdminService.createAdmin(req.body);
  const API_BASE_PATH = '/api/v1/admins';
  const userResourceUrl = `${API_BASE_PATH}/${result?._id}`;

  const userLinks = generateHateoasLinks({
    self: { href: API_BASE_PATH, method: 'POST' },
    get: { href: userResourceUrl, method: 'GET' },
    update: { href: userResourceUrl, method: 'PATCH' },
    delete: { href: userResourceUrl, method: 'DELETE' },
  });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Admin created successfully',
    links: userLinks,
    data: result,
  });
});

//get all admin
const getAllAdminFromDB = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdmin(req.query);
  const path = 'admins';
  const metaWithLinks = {
    ...result.meta,
    links: generatePaginationLinks(result.meta, path),
  };

  const dataWithLinks = result.data.map((item: any) => ({
    ...item.toObject(),
    links: generateResourceLinks(item, path),
  }));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Admin get successfully',
    meta: metaWithLinks,
    data: dataWithLinks,
  });
});

export const AdminController = {
  createAdminIntoDB,
  getAllAdminFromDB,
};
