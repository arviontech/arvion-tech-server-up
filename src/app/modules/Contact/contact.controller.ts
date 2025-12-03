import CatchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/sendResponse';
import { ContactServices } from './contact.services';
import httpStatus from 'http-status';
const sendEmail = CatchAsync(async (req, res) => {
  const { name, email, message } = req.body;
  const result = await ContactServices.sendEmail(name, email, message);
  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email sent successfully',
    data: result,
  });
});

export const ContactController = {
  sendEmail,
};
