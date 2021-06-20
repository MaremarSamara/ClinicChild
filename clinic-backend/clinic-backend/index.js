const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const LabRouter = require("./routes/lab");
const CompanyRouter = require("./routes/insurance-company");
const flash = require("express-flash");
const cors = require("cors");

app.use(cors())
app.set("view engine", "ejs");

app.use(cookieParser("test"))
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/labs", LabRouter)
app.use("/company", CompanyRouter)
app.get("/", (req, res) => {
  res.render("pages/home", {title: "Home", message: "Home Page"})
})
app.listen(4000);
