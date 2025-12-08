import CatchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/sendResponse';
import { ContactServices } from './contact.services';
import httpStatus from 'http-status';

const sendEmail = CatchAsync(async (req, res) => {
  const contactData = req.body;
  await ContactServices.sendEmail(contactData);
  
  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email sent successfully',
    data: null,
  });
});

export const ContactController = {
  sendEmail,
};
