import mongoose from "mongoose";
const emprestimoDetalhesSchema = mongoose.Schema({
  numeroPrestacao: {
    type: Number,
    requered: true,
  },
  valorPrestacao: {
    type: Number,
    requered: true,
  },
  juros: { type: Number, requered: true },
  amortizacao: {
    type: Number,
    requered: true,
  },
  saldoDevedor: {
    type: Number,
    requered: true,
  },
});

const EmprestimoDetalhes = mongoose.model(
  "emprestimo_detalhes",
  emprestimoDetalhesSchema
);

export default EmprestimoDetalhes;
