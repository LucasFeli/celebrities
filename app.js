require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const hbs = require("hbs");
const connectDb = require("./config");
const celebritiesRoutes = require("./routes/celebrity.routes");
const app = express();

connectDb();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const { _method } = req.body;
  if (_method) {
    req.method = _method;
  }
  next();
});

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

hbs.registerPartials(`${__dirname}/views/partials/`);

app.get("/", (req, res) => res.render("index"));
app.use("/celebrity", celebritiesRoutes);

app.listen(process.env.PORT);
