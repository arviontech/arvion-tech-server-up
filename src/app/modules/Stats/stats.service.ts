import { Project } from '../Projects/project.model';
import { User } from '../User/user.model';
import { Skill } from '../Skills/skill.model';
// import { Blog } from '../Blogs/blog.model'; // Assuming Blog model exists, need to verify

const getDashboardStatsFromDB = async () => {
    const totalProjects = await Project.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalSkills = await Skill.countDocuments();
    // const totalBlogs = await Blog.countDocuments(); 

    // For now, we'll return what we have. If Blog exists, we'll add it.
    // Also, we can add more specific stats like "active users" or "completed projects" if the models support it.

    // Example of more detailed stats if needed:
    // const activeUsers = await User.countDocuments({ status: 'active' });
    // const completedProjects = await Project.countDocuments({ status: 'completed' });

    return {
        totalProjects,
        totalUsers,
        totalSkills,
        // totalBlogs,
        // revenue: 0, // Placeholder if we don't have a revenue model yet
    };
};

export const StatsService = {
    getDashboardStatsFromDB,
};
