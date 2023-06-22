import "./style.css";
import Logo from "../../assets/Logo.png";
import Account from "../../assets/account.png";
import Logout from "../../assets/logout.png";
import { removeItem } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

function Main() {
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
          <h1>Roberto</h1>
          <img onClick={handleExit} src={Logout} alt="logout-button" />
        </div>
      </header>
      <div className="main-content">
        
      </div>
    </div>
  );
}

export default Main;
