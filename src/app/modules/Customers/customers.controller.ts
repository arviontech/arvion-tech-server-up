import catchAsync from '../../utils/catchAsync';
import {
  generatePaginationLinks,
  generateResourceLinks,
} from '../../utils/hateoas';
import sendResponse from '../../utils/sendResponse';
import { CustomersService } from './customers.services';
import httpStatus from 'http-status';

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await CustomersService.getAllCustomersFromDB(req.query);
  const path = 'customers';
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
    message: 'Customers fetched successfully',
    meta: metaWithLinks,
    data: dataWithLinks,
  });
});

const getSingleCustomer = catchAsync(async (req, res) => {
  const result = await CustomersService.getSingleCustomerFromDB(req.params.id);
  if (result) {
    const links = generateResourceLinks(result, 'customers');
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Customer fetched successfully',
      links: links,
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      message: 'Customer not found',
      data: null,
    });
  }
});

export const CustomersController = {
  getAllCustomers,
  getSingleCustomer,
};
