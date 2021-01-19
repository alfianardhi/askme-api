import express, {Application, Request, Response} from "express";


class App {
    public app:Application;
    constructor(){
        this.app = express();
        this.routes();
    }

    private routes(): void {
        this.app.route('/').get((req:Request, res:Response) => {
            res.send("hello rest api with typescript");
        });
    }
}

const app = new App().app;
const port: number = 3000;

app.listen(port, () => {
    console.log(`This app listening at http://localhost:${port}`);

    //console.log(`This app run is ${process.env.DB_HOST}`);
});