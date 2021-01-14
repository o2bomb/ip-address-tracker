import "dotenv-safe/config";
import express from "express";
import cors from "cors";
import path from "path";
import fetch from "node-fetch";

const main = async () => {
  const app = express();

  // CORS
  const corsOptions = {
    origin: process.env.CORS_ORIGIN
  }
  app.use(cors(corsOptions));

  // ROUTES
  app.get("/hello", (_, res) => res.send("Hello World!"));

  app.get("/search/:ip?", async (req, res) => {
    const ip = req.params.ip || "";
    const uri = `https://geo.ipify.org/api/v1/?apiKey=${process.env.IPIFY_SECRET_KEY}&ipAddress=${ip}`;
    const data = await fetch(uri).then(res => res.json());
    res.send(data);
  })

  app.use("/", express.static(path.join(__dirname, "..", "build")));
  if (process.env.NODE_ENV === "production") {
  
    // app.get("*", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // });
  }

  app.listen(parseInt(process.env.PORT), () => {
    console.log("Express server started on port", process.env.PORT);
  });
}

main().catch((error) => {
  console.error(error);
})