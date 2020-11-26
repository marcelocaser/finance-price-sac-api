import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import financeRouter from "./routes/financeRouter.js";

dotenv.config();

const { USER_DB, USER_PWD, DB_NAME, PORT } = process.env;

const app = express();

(async () => {
  try {
    console.log("Conectando ao MongoDB... ");
    await mongoose.connect(
      `mongodb+srv://${USER_DB}:${USER_PWD}@cluster0.d0mxy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("Conectado com sucesso ao MongoDB");
  } catch (error) {
    console.log("Erro ao conectar no MongoDB. " + error);
  }
})();

app.get("/", (_, response) => {
  response.send({
    message:
      "Bem-vindo à API finance-price-sac. Acesse /api/finance para consumo",
  });
});
app.use(express.json());
app.use(cors());
app.use("/api/finance", financeRouter);
app.use(financeRouter);
app.listen(PORT, () => {
  console.log("API started on PORT " + PORT);
});
