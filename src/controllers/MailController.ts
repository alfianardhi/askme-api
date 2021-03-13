
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import IController from "./ControllerInterface";

import MailService from "../services/MailService";

const db = require("../db/models");

require("dotenv").config();

class MailController implements IController {

    index = async (req: Request, res: Response) : Promise<Response> => {

        try{

            const service: MailService = new MailService(req);

            const mail = await service.getAll();

            res.status(200).send({
                data: mail,
                message:"get mail datas success"
            });

        }catch (error) {
            res.status(500).send({
                success: false,
                message: 'Something wrong. Try again later'
            });
        }

        return res;
    }

    create = async(req: Request, res: Response) : Promise<Response> => {

        let status:number = 0;
        let { name, email, subject, message} = req.body;

        try {

            //notif
            /*const mailDetails = {
                from: process.env.EMAIL_ADDRESS, // sender address
                to: email,
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
            };*/

            //askme
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
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            await new Promise((resolve, reject) => {
                transporter.sendMail(mailDetails, (error, data) => {
                    if (error) {
                        status = 4;
                        res.status(500).send({
                            success: false,
                            message: 'Something wrong. Try again later'
                        });
                        reject(error);
                    } else {
                        status = 5;
                        res.status(200).send({
                            success: true,
                            message: 'Thanks for contacting us. We will get back to you shortly'
                        });
                        resolve(data);
                    }
                });
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

    show = (req: Request, res: Response) : Response => {
        return res.send("");
    }

    update = (req: Request, res: Response) : Response => {
        return res.send("");
    }

    delete = (req: Request, res: Response) : Response => {
        return res.send("");
    }
}
export default new MailController();