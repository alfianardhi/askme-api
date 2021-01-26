import BaseRouters from "./BaseRouters";

import AuthController from "../controllers/AuthController";
//import validate from "../middleware/AuthValidate";
import { auth } from "../middleware/AuthMiddleware";

class AuthRouters extends BaseRouters {
    public routes(): void {
        //this.router.post('/register', validate, AuthController.register);
        //this.router.post('/login', validate, AuthController.login);
        this.router.post('/register', AuthController.register);
        this.router.post('/login', AuthController.login);
        //this.router.get('/profile', auth, AuthController.profile);
    }
}

export default new AuthRouters().router;