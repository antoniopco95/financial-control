import "./style.css";
import Logo from "../../assets/Logo.png";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../../utils/localStorage";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  function redirectToSignUp() {
    navigate("/sign-up");
  }

    useEffect(() => {
    const token = getItem("token");

    if (token) {
      navigate("/main");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!email || !senha) {
        console.log("Preencha todos os campos!");
        return;
      }

      const response = await api.post("/login", {
        email,
        senha,
      });

      const { token, usuario } = response.data;
      setItem("token", token);
      setItem("userId", usuario.id);

      navigate("/main");
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.message);
    }
  }

  return (
    <div className="container">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="first-text">
        <span>
          <span className="first-text1">Controle suas</span>
          <span className="first-text2"> </span>
          <span className="first-text3">finanças</span>
          <span className="first-text4">
            ,<br />
            sem planilha chata.
          </span>
        </span>
      </div>
      <div className="second-text">
        Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem
        tudo num único lugar e em um clique de distância.
      </div>
      <button onClick={redirectToSignUp} className="first-button">
        Cadastre-se
      </button>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <span>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Password</span>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
