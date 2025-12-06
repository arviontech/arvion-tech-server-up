import config from "../config";
import { UserRole } from "../modules/User/user.contant";
import { User } from "../modules/User/user.model";
import { Admin } from "../modules/Admin/admin.model";
import { Testimonial } from "../modules/Testimonials/testimonial.model";
import { Blog } from "../modules/Blogs/blog.model";

const superUser = {
  userId: "Super-001",
  email: config.super_admin_email,
  password: config.super_admin_password,
  needPasswordChange: false,
  role: UserRole.superAdmin,
  status: "ACTIVE",
  isDeleted: false,
  isVerified: true,
};

const adminUser = {
  userId: "Admin-001",
  email: "admin@arviontech.com",
  password: "admin123",
  needPasswordChange: false,
  role: UserRole.admin,
  status: "ACTIVE",
  isDeleted: false,
  isVerified: true,
};

const seedSuperAdmin = async () => {
  // Seed Super Admin
  const isSuperAdminExist = await User.findOne({ role: UserRole.superAdmin });
  if (!isSuperAdminExist) {
    const createdSuperAdmin = await User.create(superUser);
    console.log("✅ Super admin created successfully");
    console.log(`   Email: ${superUser.email}`);
  } else {
    console.log("ℹ️  Super admin already exists");
  }

  // Seed Regular Admin
  const isAdminExist = await User.findOne({ email: adminUser.email });
  if (!isAdminExist) {
    const createdAdmin = await User.create(adminUser);

    // Create Admin profile
    await Admin.create({
      fullName: "Arvion Admin",
      email: adminUser.email,
      user: createdAdmin._id,
    });

    console.log("✅ Admin user created successfully");
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Password: ${adminUser.password}`);
  } else {
    console.log("ℹ️  Admin user already exists");
  }

  // Seed Testimonials
  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    const testimonials = [
      {
        name: "John Doe",
        title: "CEO at TechCorp",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        review: "Arvion Tech delivered an outstanding solution for our business. Their team is highly skilled and professional.",
        date: "2023-10-15",
      },
      {
        name: "Jane Smith",
        title: "Marketing Director",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        review: "Working with Arvion Tech was a pleasure. They understood our needs and exceeded our expectations.",
        date: "2023-11-01",
      },
      {
        name: "Mike Johnson",
        title: "CTO at StartupX",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        review: "The quality of code and attention to detail provided by Arvion Tech is top-notch. Highly recommended!",
        date: "2023-11-20",
      },
    ];
    await Testimonial.insertMany(testimonials);
    console.log("✅ Testimonials seeded successfully");
  } else {
    console.log("ℹ️  Testimonials already exist");
  }

  // Seed Blogs
  const blogCount = await Blog.countDocuments();
  if (blogCount === 0) {
    const blogs = [
      {
        blogTitle: "The Future of Web Development in 2024",
        content: "<p>Web development is evolving rapidly. From AI-driven coding assistants to new frameworks like Next.js 14, the landscape is changing. In this article, we explore the top trends to watch out for.</p>",
        blogImage: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"],
        authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        blogTitle: "Why UI/UX Design Matters for Your Business",
        content: "<p>Good design is not just about aesthetics; it's about how it works. A well-designed user interface can significantly improve user retention and conversion rates. Learn why investing in UI/UX is crucial.</p>",
        blogImage: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000"],
        authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        blogTitle: "Scaling Your Startup with Cloud Solutions",
        content: "<p>Cloud computing offers scalable and cost-effective solutions for startups. Whether it's AWS, Azure, or Google Cloud, choosing the right provider can make or break your infrastructure strategy.</p>",
        blogImage: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"],
        authorImage: "https://randomuser.me/api/portraits/men/85.jpg",
      },
    ];
    await Blog.insertMany(blogs);
    console.log("✅ Blogs seeded successfully");
  } else {
    console.log("ℹ️  Blogs already exist");
  }
};

export default seedSuperAdmin;
