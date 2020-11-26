import mongoose from "mongoose";
const emprestimoSchema = mongoose.Schema({
  mesAno: {
    type: String,
    requered: true,
  },
  valorEmprestimoMes: {
    type: Number,
    requered: true,
  },
  tipo: {
    type: String,
    requered: true,
  },
  detalhes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "emprestimo_detalhes" },
  ],
});

const Emprestimos = mongoose.model("emprestimos", emprestimoSchema);

export default Emprestimos;
