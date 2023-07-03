import "./style.css";
import Pencil from "../../assets/edit.png";
import Trash from "../../assets/delete.png";
import api from "../../services/api";
import { useState } from "react";
import { getItem } from "../../utils/localStorage";
import { format } from "date-fns";
import EditModal from "../EditModal";

function TableLine({
  listTransaction,
  handleListTransactions,
  handleExtract,
  options,
  sortOrder,
}) {
  const token = getItem("token");
  const [isEditing, setIsEditing] = useState(null);

  function closeEditModal(content) {
    if (!isEditing) {
      setIsEditing(content);
      return;
    }
    setIsEditing(null);
  }

  function chooseDay(data) {
    if (new Date(data).getDay() === 0) {
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
      await api.delete(`/transacao/${id}`, {
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

  function sortListByDate() {
    let sortedList = [...listTransaction];

    if (sortOrder === "asc") {
      sortedList.sort((a, b) => new Date(a.data) - new Date(b.data));
    } else if (sortOrder === "desc") {
      sortedList.sort((a, b) => new Date(b.data) - new Date(a.data));
    }

    return sortedList;
  }

  const sortedList = sortListByDate();
  return (
    <>
      {sortedList.map((item) => (
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
            <img
              className="edit-transaction"
              src={Pencil}
              alt="pencil"
              onClick={() => closeEditModal(item)}
            />

            <img
              className="delete-transaction"
              src={Trash}
              alt="trash"
              onClick={() => handleDeleteTransaction(item.id)}
            />
          </div>
        </div>
      ))}
      {isEditing && (
        <EditModal
          opcoes={options}
          function1={handleListTransactions}
          function2={handleExtract}
          function3={closeEditModal}
          information={isEditing}
        />
      )}
    </>
  );
}

export default TableLine;
