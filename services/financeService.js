import Clientes from "../models/Clientes.js";
import Emprestimos from "../models/Emprestimo.js";
import EmprestimoDetalhes from "../models/EmprestimoDetalhes.js";

const getClientes = async (req, res, next) => {
  try {
    await Clientes.find({})
      .populate({
        path: "emprestimos",
        populate: {
          path: "detalhes",
        },
      })
      .exec(async (err, clientes) => {
        if (err) {
          next(err);
        }
        res.send(clientes);
      });
  } catch (error) {
    next(error);
  }
};

const saveCliente = async (req, res, next) => {
  try {
    let newCliente = req.body;
    if (newCliente) {
      const {
        nome,
        sobrenome,
        cpf,
        salario,
        situacao,
        emprestimos,
      } = newCliente;
      newCliente = {
        nome,
        sobrenome,
        cpf,
        salario,
        situacao,
      };
      let cliente = new Clientes(newCliente);
      cliente = await cliente.save();

      let newEmprestimos = [];
      emprestimos.map(({ mesAno, valorEmprestimoMes, tipo }) => {
        const newEmprestimo = {
          mesAno,
          valorEmprestimoMes,
          tipo,
        };
        newEmprestimos.push(newEmprestimo);
      });

      for (const emp of newEmprestimos) {
        let emprestimo = new Emprestimos(emp);
        emprestimo = await emprestimo.save();

        cliente.emprestimos.push(emprestimo._id);
        cliente = await cliente.save();

        let newEmprestimoDetalhes = [];
        emprestimos.map(({ detalhes }) => {
          detalhes.map(
            ({
              numeroPrestacao,
              valorPrestacao,
              juros,
              amortizacao,
              saldoDevedor,
            }) => {
              const newEmprestimoDetalhe = {
                numeroPrestacao,
                valorPrestacao,
                juros,
                amortizacao,
                saldoDevedor,
              };
              newEmprestimoDetalhes.push(newEmprestimoDetalhe);
            }
          );
        });

        for (const emprestimoDetalhe of newEmprestimoDetalhes) {
          let emprestimoDetalhes = new EmprestimoDetalhes(emprestimoDetalhe);
          emprestimoDetalhes = await emprestimoDetalhes.save();

          emprestimo.detalhes.push(emprestimoDetalhes._id);
          emprestimo = await emprestimo.save();
        }
      }

      await Clientes.find({})
        .populate({
          path: "emprestimos",
          populate: {
            path: "detalhes",
          },
        })
        .exec(async (err, clientes) => {
          if (err) {
            next(err);
          }
          res.send(clientes);
        });
    } else {
      throw new Error("nenhum cliente informado");
    }
  } catch (error) {
    next(error);
  }
};

const saveClienteEmprestimo = async (req, res, next) => {
  try {
    const id = req.query.cliente;
    const emprestimos = req.body;
    if (id && emprestimos) {
      let cliente = await Clientes.findOne({ _id: id });
      console.log(cliente);
      if (cliente) {
        let newEmprestimos = [];
        emprestimos.map(({ mesAno, valorEmprestimoMes, tipo }) => {
          const newEmprestimo = {
            mesAno,
            valorEmprestimoMes,
            tipo,
          };
          newEmprestimos.push(newEmprestimo);
        });
        for (const emp of newEmprestimos) {
          let emprestimo = new Emprestimos(emp);
          emprestimo = await emprestimo.save();
          console.log(emprestimo);
          cliente.emprestimos.push(emprestimo._id);
          cliente = await cliente.save();

          let newEmprestimoDetalhes = [];
          emprestimos.map(({ detalhes }) => {
            detalhes.map(
              ({
                numeroPrestacao,
                valorPrestacao,
                juros,
                amortizacao,
                saldoDevedor,
              }) => {
                const newEmprestimoDetalhe = {
                  numeroPrestacao,
                  valorPrestacao,
                  juros,
                  amortizacao,
                  saldoDevedor,
                };
                newEmprestimoDetalhes.push(newEmprestimoDetalhe);
              }
            );
          });

          for (const emprestimoDetalhe of newEmprestimoDetalhes) {
            let emprestimoDetalhes = new EmprestimoDetalhes(emprestimoDetalhe);
            emprestimoDetalhes = await emprestimoDetalhes.save();

            emprestimo.detalhes.push(emprestimoDetalhes._id);
            emprestimo = await emprestimo.save();
          }
        }
      } else {
        throw new Error("nenhum cliente encontrado");
      }
    } else {
      throw new Error("nenhum cliente encontrado");
    }

    res.send("OK");
  } catch (error) {
    next(error);
  }
};

export default { getClientes, saveCliente, saveClienteEmprestimo };
