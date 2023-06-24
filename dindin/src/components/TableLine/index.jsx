import "./style.css";
import Pencil from "../../assets/edit.png";
import Trash from "../../assets/delete.png";
import api from "../../services/api";
import { useState } from "react";
import { getItem } from "../../utils/localStorage";

function TableLine() {
  return (
    <div className="line-content">
      <span className="line1">23/06/2023</span>
      <span className="line2">Sexta</span>
      <span className="line3">Salário</span>
      <span className="line4">Pix</span>
      <span className="line5">R$ 100,00</span>
      <div className="icons">
        <img src={Pencil} alt="pencil" />
        <img src={Trash} alt="trash" />
      </div>
    </div>
  );
}

export default TableLine;
