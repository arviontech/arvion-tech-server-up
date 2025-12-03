import QueryBuilder from '../../builder/QueryBuilder';
import { Customers } from './customers.model';

const getAllCustomersFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['fullName', 'email', 'address'];

  const customerQuery = new QueryBuilder(
    Customers.find().populate('user'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const data = await customerQuery.modelQuery;
  const meta = await customerQuery.countTotal();

  return {
    meta,
    data,
  };
};

const getSingleCustomerFromDB = async (id: string) => {
  const result = await Customers.findById(id).populate('user');
  return result;
};

export const CustomersService = {
  getAllCustomersFromDB,
  getSingleCustomerFromDB,
};
