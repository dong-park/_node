import "reflect-metadata";
import * as console from "console";
import * as path from "path";

const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("모든 요청에 실행하고 싶어요.");
    next();
})

app.set("port", process.env.PORT || 3000)
app.get("/", (req,res) => {
    res.sendfile(path.join(__dirname, "index.html"));
})


app.listen(app.get("port"), () => {
    console.log("익스프레스 서버 실행!!");
});
