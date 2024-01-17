import express from "express";
import config from "./config";
import apiRouter from "./api-router";
import serverRender from "./render";

const server = express();

server.use(express.static("dist"));

server.get(["/", "/contest/:contestId"], async (req, res) => {
  const { initialMarkup, initialData } = await serverRender(req);
  res.render("index", {
    initialMarkup,
    initialData,
  });
});

server.use("/api", apiRouter);

server.set("view engine", "ejs");

server.listen(config.PORT, config.HOST, () => {
  console.log(
    `Express server is listening at ${config.SERVER_URL}`,
  );
});
