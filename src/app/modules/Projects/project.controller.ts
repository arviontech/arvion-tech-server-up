
import { TImageFiles } from '../../interface/image.interface';
import catchAsync from '../../utils/catchAsync';
import {
  generateHateoasLinks,
  generatePaginationLinks,
  generateResourceLinks,
} from '../../utils/hateoas';
import sendResponse from '../../utils/sendResponse';
import { ProjectService } from './project.services';
import httpStatus from 'http-status';


const createProject = catchAsync(async (req, res) => {
  const result = await ProjectService.createProject(
    req.body,
    req.files as TImageFiles,
  );
  const API_BASE_PATH = '/api/v1/projects';
  const projectResourceUrl = `${API_BASE_PATH}/${result?._id}`;

  const projectLinks = generateHateoasLinks({
    self: { href: API_BASE_PATH, method: 'POST' },
    get: { href: projectResourceUrl, method: 'GET' },
    update: { href: projectResourceUrl, method: 'PATCH' },
    delete: { href: projectResourceUrl, method: 'DELETE' },
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project created successfully',
    links: projectLinks,
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectService.getAllProjects(req.query);
  const path = 'projects';
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
    success: true,
    message: 'All projects retrieved successfully',
    meta: metaWithLinks,
    data: dataWithLinks,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const result = await ProjectService.getProjectById(req.params.id);
  const path = 'projects';
  const dataWithLinks = {
    ...result.toObject(),
    links: generateResourceLinks(result, path),
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project retrieved successfully',
    data: dataWithLinks,
  });
});

const getProjectBySlug = catchAsync(async (req, res) => {
  const result = await ProjectService.getProjectBySlug(req.params.slug);
  const path = 'projects';
  const dataWithLinks = {
    ...result.toObject(),
    links: generateResourceLinks(result, path),
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project retrieved successfully',
    data: dataWithLinks,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectService.updateProjectById(
    req.body,
    id,
    req.files as TImageFiles,
  );

  if (!result) {
    throw new Error('Project not found');
  }

  const path = 'projects';
  const dataWithLinks = {
    ...result.toObject(),
    links: generateResourceLinks(result, path),
  };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully',
    data: dataWithLinks,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectService.deleteProjectById(id);
  if (!result) {
    throw new Error('Project not found');
  }

  const API_BASE_PATH = '/api/v1/projects';
  const projectResourceUrl = `${API_BASE_PATH}/${id}`;

  const deleteLinks = generateHateoasLinks({
    self: { href: projectResourceUrl, method: 'DELETE' },
    getAll: { href: API_BASE_PATH, method: 'GET' },
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project deleted successfully',
    links: deleteLinks,
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectBySlug,
  updateProject,
  deleteProject,
};
