import express from "express";
import cors from "cors";
import { PORT } from "./constants";
import router from "./routes/itemsRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/items", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
