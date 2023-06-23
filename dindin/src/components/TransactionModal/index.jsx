import "./style.css";
import X from "../../assets/x.png";
import { useState } from "react";

function TransactionModal({ close }) {
  const [trasactionType, setTransactionType] = useState("saida");
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
          <input type="number" />
          <h3>Categoria</h3>
          <select name="" id=""></select>
          <h3>Data</h3>
          <input type="date" />
          <h3>Descrição</h3>
          <input type="text" />
          <button className="btn-confirm">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default TransactionModal;
