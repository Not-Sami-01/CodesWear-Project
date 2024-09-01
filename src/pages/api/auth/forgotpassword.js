import connectDB from "@/middleware/connection"

const handler = (req, res) =>{
  if(req.method === 'POST'){
    const token = 'sdfg23sdfg42sdfg3sdfg42sdfg34dfggdfgs'
    const email = `Subject: Password Reset Request for Your Codeswear Account

Dear ${2},

We received a request to reset the password for your Codeswear.com account. To proceed with resetting your password, please click the following link:

${`${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}`}

This link will direct you to a secure page where you can enter a new password. The link will be valid for the next 15 minutes.

If you did not request a password reset, you can safely ignore this email. If you need any further assistance, please contact our support team at support@codeswear.com.

Best regards,  
The Codeswear Team  
www.codeswear.com

`;

  }else{

    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})
  }
}
export default connectDB(handler);