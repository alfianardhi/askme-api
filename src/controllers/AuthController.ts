
import { Request, Response } from "express";
import Authentication from "../utils/Authentication";
const db = require("../db/models");

class AuthController {

    register = async (req: Request, res: Response) : Promise<Response> => {
        
        let { username, password } = req.body;

        try{

            let passwordHash = await Authentication.passwordHash(password);
            await db.user.create({
                username: username,
                password: passwordHash
            });
    
            res.status(200).send({
                message: 'Register Success'
            });

        }catch (error) {
            res.status(500).send({
                success: false,
                message: 'Something wrong. Try again later'
            });
        }

        return res;
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
                    return res.status(200).send({
                        token: token,
                        message: 'Generate token success'
                    });;
                } else {
                    errMessage = "Generate token failed";
                }

            }else{
                errMessage = "Invalid password";
            }
        } else {
            errMessage = "Invalid user";
        }

        return res.status(500).send({
            message: errMessage
        });;
    }

    profile = (req: Request, res: Response) : Response => {
        return res.send(req.app.locals.credential);
    }

}
export default new AuthController();