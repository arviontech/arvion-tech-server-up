export const verifyEmailHtml = (fullName: string, verifyLink: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Taskopedia</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .logo { color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .header-text { color: white; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 24px; color: #333; margin-bottom: 20px; }
        .message { color: #666; line-height: 1.6; margin-bottom: 30px; font-size: 16px; }
        .verify-btn { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0; }
        .verify-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4); }
        .disclaimer { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 30px 0; }
        .disclaimer-title { color: #856404; font-weight: bold; margin-bottom: 10px; }
        .disclaimer-text { color: #856404; font-size: 14px; line-height: 1.5; }
        .footer { background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; }
        .footer-text { color: #6c757d; font-size: 14px; line-height: 1.5; }
        .support-link { color: #667eea; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">📋 Taskopedia</div>
            <div class="header-text">Your Ultimate Task Management Solution</div>
        </div>
        
        <div class="content">
            <h1 class="greeting">Hello ${fullName}!</h1>
            
            <p class="message">
                Welcome to Taskopedia! We're excited to have you join our community of productive individuals. 
                To complete your registration and start organizing your tasks, please verify your email address by clicking the button below.
            </p>
            
            <div style="text-align: center;">
                <a href="${verifyLink}" class="verify-btn">Verify My Email Address</a>
            </div>
            
            <div class="disclaimer">
                <div class="disclaimer-title">⚠️ Important Security Notice</div>
                <div class="disclaimer-text">
                    If you did not create an account with Taskopedia, please do not click the verification link above. 
                    This email may have been sent to you by mistake. You can safely ignore this email or 
                    <a href="mailto:support@taskopedia.com" class="support-link">contact our support team</a> 
                    if you have any concerns about receiving this message.
                </div>
            </div>
            
            <p class="message">
                This verification link will expire in 24 hours for security purposes. If you need a new verification link, 
                please try registering again or contact our support team.
            </p>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                <strong>Need Help?</strong><br>
                If you're having trouble with the verification process, please don't hesitate to reach out to our support team at 
                <a href="mailto:support@taskopedia.com" class="support-link">support@taskopedia.com</a>
                <br><br>
                <strong>Taskopedia Team</strong><br>
                Making productivity simple, one task at a time.
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
