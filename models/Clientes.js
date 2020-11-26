import mongoose from "mongoose";
const clienteSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    requered: true,
  },
  cpf: {
    type: String,
    requered: true,
  },
  salario: {
    type: Number,
    requered: true,
  },
  situacao: {
    type: String,
    requered: true,
  },
  emprestimos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'emprestimos'
  }],
});

const Clientes = mongoose.model("clientes", clienteSchema);

export default Clientes;
