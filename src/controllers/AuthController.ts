
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
    
    login = async (req: Request, res: Response) : Promise<Response> => {
        
        let errMessage:string = "";

        //Get data user
        let { username, password } = req.body;

        const user = await db.user.findOne({
            where : {username: username}
        });

        if(user) {

            // Check password
            let passValid:boolean = await Authentication.passwordCompare(password, user.password);
            
            if(passValid){

                //generate token
                let token = Authentication.generateToken(user.id, username, user.password);
                if(token){
                    return res.send({token});
                } else {
                    errMessage = "generate token failed";
                }

            }else{
                errMessage = "invalid password";
            }
        } else {
            errMessage = "invalid user";
        }

        return res.send(errMessage);
    }

    profile = (req: Request, res: Response) : Response => {
        return res.send(req.app.locals.credential);
    }

}
export default new AuthController();