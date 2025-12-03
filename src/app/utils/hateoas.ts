interface Link {
  href: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

const API_BASE_PATH = '/api/v1';

export const generateResourceLinks = (
  data: { _id: any },
  path: string,
): Record<string, Link> => {
  const resourceUrl = `${API_BASE_PATH}/${path}/${data._id}`;

  return {
    self: { href: resourceUrl, method: 'GET' },
    update: { href: resourceUrl, method: 'PATCH' },
    delete: { href: resourceUrl, method: 'DELETE' },
  };
};

export const generateHateoasLinks = (
  links: Record<string, Link>,
): Record<string, Link> => {
  return links;
};

export const generateRegisterLinks = (): Record<string, Link> => {
  const authBaseUrl = `/auth`;
  return {
    self: { href: `${authBaseUrl}/signup`, method: 'POST' },
    signin: { href: `${authBaseUrl}/signin`, method: 'POST' },
  };
};

export const generateLoginLinks = () => {
  const authBaseUrl = `/auth`;
  return {
    self: { href: `${authBaseUrl}/signin`, method: 'POST' },
    profile: { href: `users/me`, method: 'GET' },
    signup: { href: `${authBaseUrl}/signup`, method: 'POST' },
  };
};

export const generatePaginationLinks = (
  meta: any,
  path: string,
): Record<string, string> => {
  const baseUrl = `${API_BASE_PATH}/${path}`;
  const { page, limit, totalPage } = meta;

  const links: Record<string, string> = {
    self: `${baseUrl}?page=${page}&limit=${limit}`,
    first: `${baseUrl}?page=1&limit=${limit}`,
    last: `${baseUrl}?page=${totalPage}&limit=${limit}`,
  };

  if (page > 1) {
    links.prev = `${baseUrl}?page=${page - 1}&limit=${limit}`;
  }
  if (page < totalPage) {
    links.next = `${baseUrl}?page=${page + 1}&limit=${limit}`;
  }

  return links;
};
