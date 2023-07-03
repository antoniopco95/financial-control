import "./style.css";
import Logo from "../../assets/Logo.png";
import Account from "../../assets/account.png";
import Logout from "../../assets/logout.png";
import Filter from "../../assets/filtro.png";
import ArrowUp from "../../assets/arrowUp.png";
import { getItem, removeItem } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TransactionModal from "../../components/TransactionModal";
import TableLine from "../../components/TableLine";
import api from "../../services/api";

function Main() {
  const userName = getItem("name");
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [listTransaction, setListTransaction] = useState([]);
  const [extract, setExtract] = useState({ entrada: 0, saida: 0 });
  const [sortOrder, setSortOrder] = useState(null);
  const token = getItem("token");
  let Real = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    handleListTransactions();
  }, []);

  useEffect(() => {
    handleExtract();
  }, []);

  async function handleExtract() {
    try {
      const response = await api.get("/transacao/extrato", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExtract({
        entrada: response.data.entrada,
        saida: response.data.saida,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleListTransactions() {
    try {
      const response = await api.get("/transacao", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListTransaction(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOptions() {
    try {
      const response = await api.get("/categoria", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function closeModal() {
    setModal(!modal);
  }
  
  function handleExit() {
    removeItem("token");
    navigate("/");
  }

  function handleSortOrder() {
    if (sortOrder === null) {
      setSortOrder("asc"); 
    } else if (sortOrder === "asc") {
      setSortOrder("desc"); 
    } else if (sortOrder === "desc") {
      setSortOrder(null); 
    }
  }

  return (
    <div className="container-main">
      <header>
        <img className="dindin" src={Logo} alt="logo" />
        <div className="profile-container">
          <img src={Account} alt="account" />
          <h1>{userName}</h1>
          <img
            className="img-logout"
            onClick={handleExit}
            src={Logout}
            alt="logout-button"
          />
        </div>
      </header>
      <div className="main-content">
        <div className="filter">
          <img src={Filter} alt="filter" />
          <p>Filtrar</p>
        </div>

        <div className="table">
          <div className="table-header">
            <span className="table-header-title1">
              Data <img src={ArrowUp} alt="ArrowUp" onClick={handleSortOrder} />
            </span>
            <span className="table-header-title2">Dia da semana</span>
            <span className="table-header-title3">Descrição</span>
            <span className="table-header-title4">Categoria</span>
            <span className="table-header-title5">Valor</span>
          </div>
        </div>
        <TableLine
          listTransaction={listTransaction}
          options={options}
          handleListTransactions={handleListTransactions}
          handleExtract={handleExtract}
          sortOrder={sortOrder}
        />
        <div className="right-side">
          <div className="resume">
            <h1>Resumo</h1>
            <div className="resume-in">
              <h2>Entradas</h2>
              <h3>{Real.format(extract.entrada)}</h3>
            </div>
            <div className="resume-out">
              <h2>Saídas</h2>
              <h3>{Real.format(extract.saida)}</h3>
            </div>
            <div className="line"></div>
            <div className="resume-balance">
              <h2>Saldo</h2>
              <h3>{Real.format(extract.entrada - extract.saida)}</h3>
            </div>
          </div>
          <button
            className="btn-add-transaction"
            onClick={() => setModal(!modal)}
          >
            Adicionar Registro
          </button>
          {modal && (
            <TransactionModal
              close={closeModal}
              category={options}
              handleListTransactions={handleListTransactions}
              handleExtract={handleExtract}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
