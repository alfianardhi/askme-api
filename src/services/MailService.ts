import { Request } from "express";

const db = require("../db/models");

class MailService {

    body: Request['body'];
    params: Request['params'];

    constructor(req:Request) {
        this.body = req.body;
        this.params = req.params;
    }

    getAll = async () => {
        const mails = await db.visitor.findAll({
            where: {
              status: 5
            },
            attributes: ['id', 'name', 'email', 'subject', 'message', 'status']
          });

        return mails;
    }

    store = async () => {

        const { description } = this.body;

        return "";
    }

    getOne = async () => {

        const { id } = this.params;
        
        return "";
    }

    update = async () => {

        const { id } = this.params;
        const { description } = this.body;

        return "";
    }

    delete = async () => {

        const { id } = this.params;

        return "";
    }

}
export default MailService;