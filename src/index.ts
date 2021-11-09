import "reflect-metadata";
import * as console from "console";
import * as path from "path";

const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("모든 요청에 실행하고 싶어요.");
    next();
})

app.get("/", (req,res) => {
    res.sendfile(path.join(__dirname, "index.html"));
})

app.get("/users", (req, res) => {
    res.send({
        response: "hi"
    })
})

app.get("/users/:id", (req, res) => {
    res.send( {
        response: `${req.params.id}번째 손님입니다.`
    })
})

// throw exception
app.get("/error", () => {
    throw new Error("this is error message");
})

// app.get("*", (req, res) => {
//     res.send({
//         response: "기타 페이지 입니다."
//     })
// })

app.use((req, res, next) => {
    res.status(404).send("404 에러가 발생했습니다.")
})

app.use((err, req, res, next) => {
    console.error(err);
    res.send("에러가 발생했습니다.")
})


app.set("port", process.env.PORT || 3000)
app.listen(app.get("port"), () => {
    console.log("익스프레스 서버가 실행되었습니다.");
});
