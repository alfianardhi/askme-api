
import { Request, Response } from "express";
import nodemailer from "nodemailer";
const db = require("../db/models");

require("dotenv").config();

class MailController {

    contact = async (req: Request, res: Response) : Promise<Response> => {
        
        let status = 0;
        let { name, email, subject, message} = req.body;

        try {

            const mailDetails = {
                from: email, // sender address
                to: process.env.EMAIL_ADDRESS,
                subject: subject,
                html: `
                <p>You have new contact request (email).</p>
                <h3>Contact Details</h3>
                <ul>
                <li>Name: ${name}</li>
                <li>Email: ${email}</li>
                <li>Subject: ${subject}</li>
                <li>Message: ${message}</li>
                </ul>
                `
            };

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_EMAIL_PASSWORD,
                },
            });

            await transporter.sendMail(mailDetails).catch(error => {
                if (error) {
                    status = 4;
                    res.status(500).send({
                        success: false,
                        message: 'Something wrong. Try again later'
                    });
                } else {
                    status = 5;
                    res.send({
                        success: true,
                        message: 'Thanks for contacting us. We will get back to you shortly'
                    });
                }
            });
        
        } catch (error) {
            status = 4;
            res.status(500).send({
                success: false,
                message: 'Something wrong. Try again later'
            });
        }

        await db.visitor.create({
            name: name,
            email: email,
            subject:subject,
            message: message,
            status: status
        });

        return res;
    }
}
export default new MailController();