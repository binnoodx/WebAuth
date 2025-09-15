import nodemailer from 'nodemailer';

export const sendMail =  async({email}:any) => {

    console.log(email)

    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        secure: true, // use SSL
        auth: {
            user: 'd5efc0603c6faf',
            pass: '0546719af64a2d',
        }
    });

    // Configure the mailoptions object
    const mailOptions = {
        from: 'test@test.com',
        to: "thebinod404@gmail.com",
        subject: 'Reset Password',
        text: 'Click Here!'
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error Happened"+error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
