/* eslint-disable @typescript-eslint/no-explicit-any */
import CatchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/sendResponse';
import {
  generateHateoasLinks,
  generateResourceLinks,
} from '../../utils/hateoas';
import { SkillService } from './skill.services';
import httpStatus from 'http-status';

const createSkill = CatchAsync(async (req, res) => {

  const result = await SkillService.createSkill(req);

  const API_BASE_PATH = '/api/v1/skills';
  const skillResourceUrl = `${API_BASE_PATH}/${result?._id}`;

  const skillLinks = generateHateoasLinks({
    self: { href: API_BASE_PATH, method: 'POST' },
    get: { href: skillResourceUrl, method: 'GET' },
    delete: { href: skillResourceUrl, method: 'DELETE' },
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill created successfully',
    links: skillLinks,
    data: result,
  });
});

const getAllSkills = CatchAsync(async (req, res) => {
  const { category } = req.query;
  const result = await SkillService.getAllSkillsFromDB(category as string);
  const path = 'skills';

  const dataWithLinks = result.map((item: any) => ({
    ...item.toObject(),
    links: generateResourceLinks(item, path),
  }));

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: category
      ? `Skills for category: ${category}`
      : 'All skills retrieved successfully',
    data: dataWithLinks,
  });
});

const deleteSkill = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillService.deleteSkillFromDB(id);

  if (!result) {
    throw new Error('Skill not found');
  }

  const API_BASE_PATH = '/api/v1/skills';
  const skillResourceUrl = `${API_BASE_PATH}/${id}`;

  const deleteLinks = generateHateoasLinks({
    self: { href: skillResourceUrl, method: 'DELETE' },
    getAll: { href: API_BASE_PATH, method: 'GET' },
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill deleted successfully',
    links: deleteLinks,
    data: result,
  });
});

export const SkillController = { createSkill, getAllSkills, deleteSkill };
