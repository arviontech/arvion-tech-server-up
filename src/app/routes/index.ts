import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { UserRoutes } from '../modules/User/user.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { CustomersRoutes } from '../modules/Customers/customers.route';
import { ProjectRoutes } from '../modules/Projects/project.route';
import { TestimonialRoutes } from '../modules/Testimonials/testimonial.route';
import { SkillRoutes } from '../modules/Skills/skill.route';
import { StatsRoutes } from '../modules/Stats/stats.route';
import { BlogRoutes } from '../modules/Blogs/blog.route';

const middlewareRoutes = Router();

const router = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/admins',
    routes: AdminRoutes,
  },
  {
    path: '/customers',
    routes: CustomersRoutes,
  },
  {
    path: '/projects',
    routes: ProjectRoutes,
  },
  {
    path: '/testimonials',
    routes: TestimonialRoutes,
  },
  {
    path: '/skills',
    routes: SkillRoutes,
  },
  {
    path: '/blogs',
    routes: BlogRoutes,
  },
  {
    path: '/stats',
    routes: StatsRoutes,
  }
];

router.forEach((route) => middlewareRoutes.use(route.path, route.routes));

export default middlewareRoutes;
