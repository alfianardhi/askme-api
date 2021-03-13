import BaseRouters from "./BaseRouters";
import MailController from "../controllers/MailController";
import { auth } from "../middleware/AuthMiddleware";
import validate from "../middleware/MailValidate";

class AskmeRouters extends BaseRouters {
    
    public routes(): void {
        this.router.get('/',auth, MailController.index);
        this.router.post('/',auth, validate, MailController.create);
        this.router.get('/:id',auth, MailController.show);
        this.router.put('/:id',auth, validate, MailController.update);
        this.router.delete('/:id', auth, MailController.delete);
    }
}
export default new AskmeRouters().router;