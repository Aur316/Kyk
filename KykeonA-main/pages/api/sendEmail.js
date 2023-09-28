import axios from "axios";
import nodemailer from "nodemailer";

export default async (req, res) => {
  console.log("Request received");

  if (req.method === "POST") {
    console.log("POST request confirmed");

    const { name, substance, description, recaptchaValue } = req.body;

    // Verify hCaptcha
    try {
      console.log("Verifying hCaptcha");

      const captchaResponse = await axios.post(
        "https://hcaptcha.com/siteverify",
        `secret=0x53200c9eBA09BfE05bBf2d815d571FD5b21C9874&response=${encodeURIComponent(
          recaptchaValue
        )}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (!captchaResponse.data.success) {
        console.error("hCaptcha verification failed");
        return res.status(400).json({ error: "hCaptcha verification failed" });
      }
    } catch (error) {
      console.error("Error during hCaptcha verification: ", error);
      return res.status(400).json({ error: "hCaptcha verification failed" });
    }
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "borisz0929@gmail.com", // your SendinBlue email login
        pass: "3cyXVvGwahzZjtg5", // your SendinBlue SMTP key
      },
    });

    let mailOptions = {
      to: "office@kykeonanalytics.com", // recipient email address
      from: "borisz0929@gmail.com", // sender email address (your SendinBlue email)
      subject: "New Submission",
      text: `Name: ${name}\nSubstance: ${substance}\nDescription: ${description}`,
    };

    try {
      console.log("Sending email");
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).send("Email sent successfully!");
    } catch (error) {
      console.error("Error during email sending: ", error);
      return res.status(500).send(error.toString());
    }
  }
};
