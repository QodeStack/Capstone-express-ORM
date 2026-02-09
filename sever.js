import express from "express"
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/handle-error.helper.js";
import { NotFoundException } from "./src/common/helpers/exception.helper.js";


const app = express()

app.use(express.json())

app.use("/api",rootRouter);

app.use((req,res,next)=>{
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;
    //console.log(`${method} ${url} ${ip}`);
    throw new NotFoundException();;
})

app.use(appError);

const port = 3069; 
app.listen(port,()=>{
    console.log(`Sever online attttt: ${port}`);
});