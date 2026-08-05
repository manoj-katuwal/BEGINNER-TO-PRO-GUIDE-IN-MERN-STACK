import e from "express";
// import { logger } from "./utils/Logger";
const app = e();


app.use(e.json());

app.listen(3000)