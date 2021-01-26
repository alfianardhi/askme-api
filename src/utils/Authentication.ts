import bcrypt from "bcrypt";

require("dotenv").config();

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    }
}
export default Authentication;