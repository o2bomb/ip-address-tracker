import "dotenv-safe/config";
import express from "express";
import cors from "cors";
import path from "path";

const main = async () => {
  const app = express();

  // CORS
  const corsOptions = {
    origin: process.env.CORS_ORIGIN
  }
  app.use(cors(corsOptions));

  // ROUTES
  app.get("/hello", (req, res) => res.send("Hello World!"));

  if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "..", "client")));
  
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