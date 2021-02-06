import { NextFunction, Request, Response } from "express";
import { check, validationResult} from "express-validator";

const validate = [
    check('name').isString(),
    check('email').isString(),
    check('subject').isString(),
    check('message').isString(),
    (req:Request, res:Response, next: NextFunction) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).send({errors: errors.array()});
        }
        return next();
    }
]
export default validate;