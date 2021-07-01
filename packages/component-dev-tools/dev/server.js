const Koa = require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors");
const multer = require("@koa/multer");

const app = new Koa();
const router = new Router();
const upload = multer();

app.use(cors());

router.post(
  "/upload",
  upload.fields([{ name: "file", maxCount: 1024 * 1024 }]),
  (ctx) => {
    console.log("ctx.files", ctx.files.file[0]);
    ctx.body = "done";
  }
);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(9002);
