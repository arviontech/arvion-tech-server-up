import config from "../config";
import { UserRole } from "../modules/User/user.contant";
import { User } from "../modules/User/user.model";
import { Admin } from "../modules/Admin/admin.model";

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
};

export default seedSuperAdmin;
