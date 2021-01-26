
import { Request, Response } from "express";
import Authentication from "../utils/Authentication";
const db = require("../db/models");

class AuthController {

    register = async (req: Request, res: Response) : Promise<Response> => {
        
        let { username, password } = req.body;
        let passwordHash = await Authentication.passwordHash(password);
        await db.user.create({
            username: username,
            password: passwordHash
        });

        return res.send("Register Success");
    }
    
    login(req: Request, res: Response) : Response {

        return res.send("Login Success");
    }

}
export default new AuthController();