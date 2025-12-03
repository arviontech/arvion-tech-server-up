
import { Request } from 'express';
import { Skill } from './skill.model';

const createSkill = async (req: Request) => {
  const payload = req.body;
  const icon = req.file;

  if (icon) {
    payload.icon = icon.path;
  }

  const result = await Skill.create(payload);
  return result;
};

const getAllSkillsFromDB = async (category?: string) => {
  const filter = category ? { category } : {};
  const result = await Skill.find(filter).sort('createdAt');
  return result;
};

const deleteSkillFromDB = async (id: string) => {
  const result = await Skill.findByIdAndDelete(id);
  return result;
};

export const SkillService = {
  createSkill,
  getAllSkillsFromDB,
  deleteSkillFromDB,
};
