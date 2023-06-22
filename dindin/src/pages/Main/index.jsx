import "./style.css";
import Logo from "../../assets/Logo.png";
import Account from "../../assets/account.png";
import Logout from "../../assets/logout.png";
import Filter from "../../assets/filtro.png";
import ArrowUp from "../../assets/arrowUp.png";
import { getItem, removeItem } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

function Main() {
  const userName = getItem("name");
  const navigate = useNavigate();
  function handleExit() {
    removeItem("token");
    navigate("/");
  }
  return (
    <div className="container-main">
      <header>
        <img className="dindin" src={Logo} alt="logo" />
        <div className="profile-container">
          <img src={Account} alt="account" />
          <h1>{userName}</h1>
          <img onClick={handleExit} src={Logout} alt="logout-button" />
        </div>
      </header>
      <div className="main-content">
        <div className="filter">
          <img src={Filter} alt="filter" />
          <p>Filtrar</p>
        </div>
        <div>
          <table>
            <tr>
              <th>
                Data <img src={ArrowUp} alt="ArrowUp" />
              </th>
              <th>Dia da semana</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Valor</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Main;
