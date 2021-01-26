import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    }

    public static passwordCompare = (password: string, passEncrypted:string): Promise<boolean> => {
        
        let result = bcrypt.compare(password, passEncrypted);

        return result;
    }

    public static generateToken = (id: number, username:string, password: string): string => {

        const secretKey:string = process.env.JWT_SECRET_KEY || "secret";
        const token: string = jwt.sign({ id, username, password}, secretKey);

        return token;
    }
}
export default Authentication;