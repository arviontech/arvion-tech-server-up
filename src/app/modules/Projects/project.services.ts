
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../Error/AppError';
import { TImageFiles } from '../../interface/image.interface';
import { TProject } from './project.interface';
import { Project } from './project.model';
import httpStatus from 'http-status';

const createProject = async (payload: TProject, images: TImageFiles) => {
  const projectImages = images?.['project-images'] || [];

  if (projectImages.length > 0) {
    payload.images = projectImages.map((image) => image.path);
  }

  const newProject = await Project.create(payload);
  return newProject;
};

const getAllProjects = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'description'];

  const projectQueryBuilder = new QueryBuilder(
    Project.find().populate('technologies'),
    query,
  )
    .search(searchableFields)
    .filter();

  // count the total before pagination
  const meta = await projectQueryBuilder.countTotal();

  // now get the data with remaining method
  const data = await projectQueryBuilder.sort().pagination().fields().modelQuery;

  return {
    meta,
    data,
  };

};

const getProjectById = async (id: string) => {
  const project = await Project.findById(id).populate('technologies');
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
  }
  return project;
};

const getProjectBySlug = async (slug: string) => {
  const project = await Project.findOne({ slug }).populate('technologies');
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
  }
  return project;
};

const updateProjectById = async (
  payload: Partial<TProject> = {},
  projectId: string,
  images?: TImageFiles,
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
  }
  const postImages = images?.['project-images'] ?? [];
  if (postImages.length > 0) {
    payload.images = [
      ...(project.images ?? []),
      ...postImages.map((image) => image.path),
    ];
  } else {
    payload.images = project.images;
  }

  const updatedProject = await Project.findByIdAndUpdate(projectId, payload, {
    new: true,
  });
  return updatedProject;
};

const deleteProjectById = async (id: string) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
  }
  return project;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectBySlug,
  updateProjectById,
  deleteProjectById,
};
