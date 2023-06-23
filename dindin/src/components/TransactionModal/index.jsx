import "./style.css";
import X from "../../assets/x.png";
import { useState } from "react";

function TransactionModal({ close, category }) {
  const [trasactionType, setTransactionType] = useState("saida");
  const [select, setSelect] = useState({ id: "", categoria: "" });
  const [transactionForm, setTransactionForm] = useState({
    valor: "",
    categoria_id: select.id,
    data: "",
    descricao: "",
  });

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

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title-close">
          <h1>Adicionar Registro</h1>
          <img onClick={close} src={X} alt="x" />
        </div>

        <form action="">
          <div className="btns">
            <button
              type="button"
              onClick={() => setTransactionType("entrada")}
              className={trasactionType === "entrada" ? "btn-blue" : "btn-gray"}
            >
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setTransactionType("saida")}
              className={trasactionType === "saida" ? "btn-red" : "btn-gray"}
            >
              Saída
            </button>
          </div>
          <h3>Valor</h3>
          <input
            type="number"
            name="valor"
            value={transactionForm.valor}
            onChange={handleChangeInput}
          />
          <h3>Categoria</h3>
          <select
            value={select.descricao}
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
            name="data"
            onChange={handleChangeInput}
          />
          <h3>Descrição</h3>
          <input
            type="text"
            value={transactionForm.descricao}
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
