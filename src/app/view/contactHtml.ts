export const contactEmailHtml = (
    name: string, 
    email: string, 
    message: string, 
    phone?: string, 
    company?: string, 
    service?: string, 
    budget?: string
) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message - Arvion Tech</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; }
        .logo { margin-bottom: 10px; }
        .logo img { height: 50px; width: auto; }
        .header-text { color: white; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .title { font-size: 24px; color: #333; margin-bottom: 20px; text-align: center; }
        .message-box { background: #f8f9fa; border-left: 4px solid #06b6d4; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .info-row { margin-bottom: 15px; }
        .info-label { color: #06b6d4; font-weight: bold; font-size: 14px; margin-bottom: 5px; }
        .info-value { color: #333; font-size: 16px; }
        .message-content { color: #555; line-height: 1.6; font-size: 16px; }
        .footer { background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; }
        .footer-text { color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <img src="https://i.ibb.co.com/yBnsF2WQ/arvion-logo1.jpg" alt="Arvion Tech" style="height: 50px; width: auto;">
            </div>
            <div class="header-text">New Contact Form Submission</div>
        </div>
        
        <div class="content">
            <h2 class="title">Contact Details</h2>
            
            <div class="info-row">
                <div class="info-label">Name:</div>
                <div class="info-value">${name}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value">${email}</div>
            </div>
            
            ${phone ? `
            <div class="info-row">
                <div class="info-label">Phone:</div>
                <div class="info-value">${phone}</div>
            </div>
            ` : ''}
            
            ${company ? `
            <div class="info-row">
                <div class="info-label">Company:</div>
                <div class="info-value">${company}</div>
            </div>
            ` : ''}
            
            ${service ? `
            <div class="info-row">
                <div class="info-label">Service Interested In:</div>
                <div class="info-value">${service}</div>
            </div>
            ` : ''}
            
            ${budget ? `
            <div class="info-row">
                <div class="info-label">Budget Range:</div>
                <div class="info-value">${budget}</div>
            </div>
            ` : ''}
            
            <div class="message-box">
                <div class="info-label">Message:</div>
                <div class="message-content">${message}</div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                This email was sent from the Arvion Tech contact form.<br>
                Please respond to the customer at: ${email}
            </div>
        </div>
    </div>
</body>
</html>
    `;
};
