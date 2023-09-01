const mailer = require("../Middleware/Mail");
const User=require("../models/User")
const jwt=require("jsonwebtoken")
exports.postMail = async (req, res, next) => {
const {userId,accesstokener,email}=req.body
console.log({userId,accesstokener,email})
  const secret=userId + process.env.ONE_SECRET_KEY;
  const tokener=jwt.sign({userId:userId},secret,{
    expiresIn:'2m'
  })
const verifylink=`${process.env.BaseUrl}/resetpassword/${userId}/${tokener}`
  try {
    if (req.body) {
      mailer({
        from: process.env.EMAIL_USER, // sender address
        to: email, // list of receivers
        subject: "Update Password", // Subject line
        html: `

       
        <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
        <table role="presentation"
          style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
          <tbody>
            <tr>
              <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                  <tbody>
                    <tr>
                      <td style="padding: 40px 0px 0px;">
                        <div style="text-align: left;">
                          <div style="padding-bottom: 20px;"><img src="https://i.ibb.co/Qbnj4mz/logo.png" alt="Company" style="width: 56px;"></div>
                        </div>
                        <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                          <div style="color: rgb(0, 0, 0); text-align: left;">
                            <h1 style="margin: 1rem 0">Trouble signing in?</h1>
                            <p style="padding-bottom: 16px">We've received a request to reset the password for this user account.</p>
                            <p style="padding-bottom: 16px"><a  href=${verifylink} target="_blank"
                                style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Reset
                                your password</a></p>
                            <p style="padding-bottom: 16px">If you didn't ask to reset your password, you can ignore this email.</p>
                            <p style="padding-bottom: 16px">Thanks,<br>The Shop team</p>
                          </div>
                        </div>
                        <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    `,
      });
      res.status(201).json({ message: "sent" });
    }
  } catch (err) {}
};
exports.postforgotMail = async (req, res, next) => {
  const {email}=req.body;
  if(email){
      try {
    const user= await User.findOne({email:email})
  if(user){
      const secret=user._id + process.env.ONE_SECRET_KEY;
      const tokener=jwt.sign({userId:user._id,isAdmin:user.isAdmin},secret,
          {expiresIn:"3d"
  })
  const verifylink=`http://localhost:3000/resetpassword/${user._id}/${tokener}`
  console.log(verifylink)   
  if (req.body) {
    console.log("working")
        mailer({
          from: process.env.EMAIL_USER, // sender address
          to: email, // list of receivers
          subject: "Reset Password", // Subject line
          html: `
  
         
          <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
          <table role="presentation"
            style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
            <tbody>
              <tr>
                <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                  <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                    <tbody>
                      <tr>
                        <td style="padding: 40px 0px 0px;">
                          <div style="text-align: left;">
                            <div style="padding-bottom: 20px;"><img src="https://i.ibb.co/Qbnj4mz/logo.png" alt="Company" style="width: 56px;"></div>
                          </div>
                          <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                            <div style="color: rgb(0, 0, 0); text-align: left;">
                              <h1 style="margin: 1rem 0">Trouble signing in?</h1>
                              <p style="padding-bottom: 16px">We've received a request to reset the password for this user account.</p>
                              <p style="padding-bottom: 16px"><a  href=${verifylink} target="_blank"
                                  style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Reset
                                  your password</a></p>
                              <p style="padding-bottom: 16px">If you didn't ask to reset your password, you can ignore this email.</p>
                              <p style="padding-bottom: 16px">Thanks,<br>The Shop team</p>
                            </div>
                          </div>
                          <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      `,
        }
  );
        res.status(201).json({ message: "sent" });
      }
    }
    } catch (err) {}
  }
};
