import "reflect-metadata";
import * as console from "console";
import * as path from "path";

const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const multer = require("multer")
const app = express();

app.use(morgan("dev")) // morgan => logging middleware
app.use(cookieParser("dongpark")); // cookieParser(secret)
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "dongpark",
    cookie: {
        httpOnly: true
    }
}))
app.use(express.json()); // body의 헤더가 json으로 되어 들어오는 것들을 파싱해준다.
app.use(express.urlencoded({extended: true})) // url 파라미터들 인코딩되어 들어오게 해준다.

// 미들웨어 확장법, 세션아이디가 존재하는 경우에만 static path 를 제공해주는 경우의 예
// app.use("/", (req, res, next) => {
//     if (req.session.id) {
//         express.static(__dirname, "public")
//     } else {
//         next();
//     }
// })

/// multer upload 객체 생성
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
})

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.image);
    res.send("ok");
})

app.use((req, res, next) => {
    console.log("모든 요청에 실행하고 싶어요.");
    next();
})

app.get("/", (req, res, next) => {
    // res.sendfile(path.join(__dirname, "index.html"));
    //res.send("sendfile 이나 send 를 두번하면 에러납니다");

    if (false) {
        next("route")
    } else {
        next();
    }
}, (req, res) => {
    res.sendfile(path.join(__dirname, "index.html"));
    // res.send("그냥 넥스트 일때 여기먼저 실행됨")
})

app.get("/", (req, res) => {
    res.send("라우트로 넘기면 여기가 실행됨");
})

app.get("/users", (req, res) => {
    res.send({
        response: "hi"
    })
})

app.get("/users/:id", (req, res) => {
    res.send({
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
