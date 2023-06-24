import "./style.css";
import Pencil from "../../assets/edit.png";
import Trash from "../../assets/delete.png";
import api from "../../services/api";
import { useState } from "react";
import { getItem } from "../../utils/localStorage";
import { format } from "date-fns";

function TableLine({ listTransaction }) {
  function chooseDay(data) {
    if (new Date().getDay(data) === 0) {
      return "Segunda";
    } else if (new Date(data).getDay() === 1) {
      return "Terça";
    } else if (new Date(data).getDay() === 2) {
      return "Quarta";
    } else if (new Date(data).getDay() === 3) {
      return "Quinta";
    } else if (new Date(data).getDay() === 4) {
      return "Sexta";
    } else if (new Date(data).getDay() === 5) {
      return "Sábado";
    } else if (new Date(data).getDay() === 6) {
      return "Domingo";
    }
  }
  return (
    <>
      {listTransaction.map((item) => (
        <div key={item.id} className="line-content">
          <span className="line1">
            {format(new Date(item.data), "dd/MM/yyy")}
          </span>
          <span className="line2">{chooseDay(item.data)}</span>
          <span className="line3">{item.categoria_nome}</span>
          <span className="line4">{item.descricao}</span>
          <span className="line5">R$ {item.valor}</span>
          <div className="icons">
            <img src={Pencil} alt="pencil" />
            <img src={Trash} alt="trash" />
          </div>
        </div>
      ))}
    </>
  );
}

export default TableLine;
