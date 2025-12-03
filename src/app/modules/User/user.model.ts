import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import { AppError } from '../../Error/AppError';
import HttpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import config from '../../config';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'vendor', 'superAdmin'],
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      required: true,
      default: 'ACTIVE',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.email) {
    const isExisting = await User.findOne({
      contactNumber: user.email,
    });
    if (isExisting && this.isNew) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'User already exists');
    }
  }

  if (user.isModified('password')) {
    if (user.password) {
      const password = user.password;
      user.password = await bcrypt.hash(password, Number(config.salt_rounds));
    }
  }

  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

export const User = model<IUser>('User', userSchema);
