import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import eventRoutes from "./routes/events.js";
import competitionRoutes from "./routes/competitions.js";
import adminRoutes from "./routes/admin.js";
import bettingRoutes from "./routes/betting.js";
import { isMyAccount, verifyToken } from "./middleware/middleware.js";
import { editUserAccount } from "./controllers/users/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.put("/:userId/edit", verifyToken, isMyAccount, upload.single("picture"), editUserAccount);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/competitions", competitionRoutes);
app.use("/admin", adminRoutes);
app.use("/betting", bettingRoutes);


const PORT = process.env.PORT || 6001;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL!, {
  })
  .then(() => {
    console.log("Database connected!");

    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
