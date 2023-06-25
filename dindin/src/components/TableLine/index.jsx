import "./style.css";
import Pencil from "../../assets/edit.png";
import Trash from "../../assets/delete.png";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { getItem } from "../../utils/localStorage";
import { format } from "date-fns";
import TransactionModal from "../TransactionModal";

function TableLine({ listTransaction, handleListTransactions, handleExtract }) {
  const token = getItem("token");

  function chooseDay(data) {
    if (new Date().getDay(data) === 0) {
      return "Domingo";
    } else if (new Date(data).getDay() === 1) {
      return "Segunda";
    } else if (new Date(data).getDay() === 2) {
      return "Terça";
    } else if (new Date(data).getDay() === 3) {
      return "Quarta";
    } else if (new Date(data).getDay() === 4) {
      return "Quinta";
    } else if (new Date(data).getDay() === 5) {
      return "Sexta";
    } else if (new Date(data).getDay() === 6) {
      return "Sábado";
    }
  }

  async function handleDeleteTransaction(id) {
    try {
      const response = await api.delete(`/transacao/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await handleListTransactions();
      await handleExtract();
    } catch (error) {
      console.log(error);
    }
  }
  let Real = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      {listTransaction.map((item) => (
        <div key={item.id} className="line-content">
          <span className="line1">
            {format(new Date(item.data), "dd/MM/yyy")}
          </span>
          <span className="line2">{chooseDay(item.data)}</span>
          <span className="line3">{item.descricao}</span>
          <span className="line4">{item.categoria_nome}</span>
          <span className={item.tipo === "saida" ? "outcome" : "income"}>
            {Real.format(item.valor)}
          </span>
          <div className="icons">
            <img className="edit-transaction" src={Pencil} alt="pencil" />
            <img
              className="delete-transaction"
              src={Trash}
              alt="trash"
              onClick={() => handleDeleteTransaction(item.id)}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default TableLine;
