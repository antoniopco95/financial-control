import "./style.css";
import X from "../../assets/x.png";
import { useState, useEffect } from "react";
import { getItem } from "../../utils/localStorage";
import api from "../../services/api";
import { format } from "date-fns";

function EditModal({ opcoes, function1, function2, function3, information }) {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState(information.tipo);
  const [select, setSelect] = useState({ id: information.categoria_id, categoria: "" });
  const [transactionForm, setTransactionForm] = useState({
    tipo: transactionType,
    valor: information.valor,
    categoria_id: information.categoria_id,
    data: format(new Date(information.data), "yyyy-MM-dd"),
    descricao: information.descricao,
  });
  console.log(information.categoria_id);

  const token = getItem("token");

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

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
    console.log(event);
    const localOptions = [...opcoes];
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
        !information.categoria_id ||
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
      const response = await api.put(
        `/transacao/${information.id}`,
        { ...transactionForm, data: formatedDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(transactionForm);
      setTransactions(response.data);
      handleClearForm();
      await function1();
      await function2();
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
    function3();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title-close">
          <h1>Editar Registro</h1>
          <img onClick={function3} src={X} alt="x" />
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
            value={select.id}
            required
            onChange={(event) => handleChangeSelect(event)}
          >
            <option>{information.categoria_nome}</option>
            {opcoes.map((item) => (
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

export default EditModal;
