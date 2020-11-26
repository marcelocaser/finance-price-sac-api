import express from "express";
import financeService from "../services/financeService.js";

const financesRouter = express.Router();

financesRouter.get("/clientes", financeService.getClientes);
financesRouter.post("/saveCliente", financeService.saveCliente);
financesRouter.patch("/saveCliente", financeService.saveClienteEmprestimo);


financesRouter.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default financesRouter;
