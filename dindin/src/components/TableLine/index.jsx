import "./style.css";
import Pencil from "../../assets/edit.png";
import Trash from "../../assets/delete.png";
import api from "../../services/api";
import { useState } from "react";
import { getItem } from "../../utils/localStorage";

function TableLine({ listTransaction }) {
  return (
    <>
      {listTransaction.map((item) => (
        <div key={item.id} className="line-content">
          <span className="line1">{item.data}</span>
          <span className="line2">Sexta</span>
          <span className="line3">{item.categoria_nome}</span>
          <span className="line4">{item.descricao}</span>
          <span className="line5">{item.valor}</span>
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
