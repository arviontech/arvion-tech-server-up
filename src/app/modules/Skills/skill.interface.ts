export const Skill_Category = {
  // Frontend: 'Frontend',
  // Backend: 'Backend',
  Web: 'Web',
  Mobile: 'Mobile',
  DevOps: 'DevOps',
  Database: 'Database',
  // Android: 'Android',
  Cloud: 'Cloud',
  Tools: 'Tools',
  Other: 'Other',
} as const;

export interface TSkill {
  name: string;
  category: keyof typeof Skill_Category;
  icon: string;
}
