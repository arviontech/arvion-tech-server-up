export const contactEmailHtml = (name: string, email: string, message: string) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message - Arvion</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; }
        .logo { color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .header-text { color: white; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .title { font-size: 24px; color: #333; margin-bottom: 20px; text-align: center; }
        .message-box { background: #f8f9fa; border-left: 4px solid #6366f1; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .info-row { margin-bottom: 15px; }
        .info-label { color: #6366f1; font-weight: bold; font-size: 14px; margin-bottom: 5px; }
        .info-value { color: #333; font-size: 16px; }
        .message-content { background: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-top: 20px; }
        .message-label { color: #6366f1; font-weight: bold; font-size: 14px; margin-bottom: 10px; }
        .message-text { color: #666; line-height: 1.6; font-size: 16px; white-space: pre-wrap; }
        .divider { height: 1px; background: #e9ecef; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; }
        .footer-text { color: #6c757d; font-size: 14px; line-height: 1.5; }
        .note { background: #e0e7ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 15px; margin: 20px 0; }
        .note-text { color: #4338ca; font-size: 14px; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">💼 Arvion</div>
            <div class="header-text">New Contact Form Submission</div>
        </div>
        
        <div class="content">
            <h1 class="title">📧 New Message Received</h1>
            
            <div class="message-box">
                <div class="info-row">
                    <div class="info-label">From:</div>
                    <div class="info-value">${name}</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value">${email}</div>
                </div>
                
                <div class="divider"></div>
                
                <div class="message-content">
                    <div class="message-label">Message:</div>
                    <div class="message-text">${message}</div>
                </div>
            </div>
            
            <div class="note">
                <div class="note-text">
                    💡 <strong>Note:</strong> This is an automated notification. Please respond to the sender at <strong>${email}</strong>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                <strong>Arvion Contact Management System</strong><br>
                This email was sent from your website contact form.<br><br>
                <strong>Arvion Team</strong><br>
                Building excellence, one project at a time.
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
