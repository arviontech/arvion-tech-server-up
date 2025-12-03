import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import {
  generateHateoasLinks,
  generateLoginLinks,
  generateRegisterLinks,
} from '../../utils/hateoas';

const register = catchAsync(async (req, res) => {
  const { password, customer } = req.body;

  console.log('payload:', customer);

  const result = await AuthService.registerUser(password, customer);
  const links = generateRegisterLinks();
  if (result) {
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      //secure: true,
      //sameSite: 'none',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Signup successfully',
    links: links,
    data: result,
  });
});

//** login
const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);
  const links = generateRegisterLinks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    links: links,
    message: 'Logged in successfully',
    data: result,
  });
});

// //**verify otp
// const verifyOtp = catchAsync(async (req, res) => {
//   const result = await AuthService.verifyOtp(req.body);
//   if (result) {
//     const { refreshToken } = result;
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "none",
//     });
//   }
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "OTP verified successfully",
//     data: result,
//   });
// });

// //**google login
// const googleLogin = catchAsync(async (req, res) => {
//   const result = await AuthService.googleLogin(req.body);
//   if (result) {
//     const { refreshToken } = result;
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     });
//   }
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Login successfully",
//     data: result,
//   });
// });

// //** check token is correct or not or expired or not */
// const checkToken = catchAsync(async (req, res) => {
//   const { token } = req.body;
//   const result = await AuthService.veryFyTokenForUser(token);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Token verified successfully",
//     data: result,
//   });
// });

// //**generate token
// const generateToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;

//   const result = await AuthService.generateAccessToken(refreshToken);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "Access Token generate successfully",
//     data: result,
//   });
// });

//!forget-password-- Do not need our application
const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthService.forgetPasswordLink(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Reset password link sent successfully',
    data: result,
  });
});

//!reset-password-- Do not need our application
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthService.resetPassword(req.body, token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Password reset  successfully',
    data: result,
  });
});

//!update-password-- Do not need our application
const updatePassword = catchAsync(async (req, res) => {
  const result = await AuthService.updatePasswordForStaff(req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Password updated  successfully',
    data: result,
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { email, token } = req.body;
  const result = await AuthService.verifyEmail(email, token);
  const links = generateHateoasLinks({
    self: { href: '/api/v1/auth/verify-email', method: 'POST' },
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Email verified successfully',
    links: links,
    data: result,
  });
});

export const AuthController = {
  register,
  login,

  //   googleLogin,
  //   generateToken,
  forgetPassword,
  resetPassword,
  updatePassword,
  verifyEmail,
  //   verifyOtp,
  //   checkToken,
};
