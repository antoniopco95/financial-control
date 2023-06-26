import "./style.css";
import X from "../../assets/x.png";
import { useState, useEffect } from "react";
import { getItem } from "../../utils/localStorage";
import api from "../../services/api";
import { format } from "date-fns";

function TransactionModal({
  close,
  category,
  handleListTransactions,
  handleExtract,
}) {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("saida");
  const [select, setSelect] = useState({ id: "", categoria: "" });
  const [transactionForm, setTransactionForm] = useState({
    tipo: transactionType,
    valor: "0",
    categoria_id: "",
    data: "",
    descricao: "",
  });
  const token = getItem("token");

  useEffect(() => {
    setTransactionForm((prevState) => ({
      ...prevState,
      tipo: transactionType,
    }));
  }, [transactionType]);

  useEffect(() => {
    setTransactionForm((prevState) => ({
      ...prevState,
      categoria_id: select.id,
    }));
  }, [select.id]);

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setTransactionForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleChangeSelect(event) {
    const localOptions = [...category];
    const myOption = localOptions.find(
      (item) => item.id === parseInt(event.target.value)
    );
    setSelect({ id: myOption.id, categoria: myOption.descricao });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !transactionForm.valor ||
        transactionForm.valor === 0 ||
        !transactionForm.categoria_id ||
        !transactionForm.descricao ||
        !transactionForm.data
      ) {
        console.log("Todos os campos são obrigatórios!");
        return;
      }
      const splitedDate = transactionForm.data.split("-");
      const formatedDate = new Date(
        splitedDate[0],
        splitedDate[1] - 1,
        splitedDate[2]
      );
      const newTransaction = {
        tipo: transactionType,
        descricao: transactionForm.descricao,
        valor: transactionForm.valor,
        data: formatedDate,
        categoria_id: transactionForm.categoria_id,
      };

      const response = await api.post(
        "/transacao",
        { ...newTransaction },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data);
      handleClearForm();
      await handleListTransactions();
      await handleExtract();
    } catch (error) {
      console.log(error);
    }
  }

  function handleClearForm() {
    setTransactionType("saida");
    setSelect({ id: "", categoria: "" });
    setTransactionForm({
      tipo: "saida",
      valor: "0",
      categoria_id: "",
      data: "",
      descricao: "",
    });
    close();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title-close">
          <h1>Adicionar Registro</h1>
          <img onClick={close} src={X} alt="x" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="btns">
            <button
              type="button"
              onClick={() => setTransactionType("entrada")}
              className={
                transactionType === "entrada" ? "btn-blue" : "btn-gray"
              }
            >
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setTransactionType("saida")}
              className={transactionType === "saida" ? "btn-red" : "btn-gray"}
            >
              Saída
            </button>
          </div>
          <h3>Valor</h3>
          <input
            type="number"
            required
            name="valor"
            value={transactionForm.valor}
            onChange={handleChangeInput}
          />
          <h3>Categoria</h3>
          <select
            value={select.descricao}
            required
            onChange={(event) => handleChangeSelect(event)}
          >
            <option>Selecione uma categoria</option>
            {category.map((item) => (
              <option key={item.id} value={item.id}>
                {item.descricao}
              </option>
            ))}
          </select>
          <h3>Data</h3>
          <input
            type="date"
            value={transactionForm.data}
            required
            name="data"
            onChange={handleChangeInput}
          />
          <h3>Descrição</h3>
          <input
            type="text"
            value={transactionForm.descricao}
            required
            name="descricao"
            onChange={handleChangeInput}
          />
          <button className="btn-confirm">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default TransactionModal;
