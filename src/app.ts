import express from "express";
import { Request, Response } from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./MiddleWare/globalErrorHandler";

// declare app variable.
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173","https://home-store-10400.vercel.app/"], credentials: true }));
app.use("/api", routes);

app.use(globalErrorHandler);
// handle invalid route.
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

// export app.
export default app;
