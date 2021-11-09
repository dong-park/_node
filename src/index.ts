import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as console from "console";
import * as path from "path";

const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000)
app.get("/", (req,res) => {
    res.sendfile(path.join(__dirname, "index.html"));
})

app.listen(app.get("port"), () => {
    console.log("익스프레스 서버 실행!");
});
