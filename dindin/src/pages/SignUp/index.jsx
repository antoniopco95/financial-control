import "./style.css";
import Logo from "../../assets/Logo.png";
import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../utils/localStorage";

function SignUp() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function redirectToSignIn() {
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!nome || !email || !senha || !confirmPassword) {
        console.log("Preencha todos os campos!");
        return;
      }
      if (senha !== confirmPassword) {
        console.log("A senha e a confirmação da senha devem ser iguais!");
      }

      const response = await api.post("/usuario", {
        nome,
        email,
        senha,
      });

      const { token, user } = response.data;
      setItem("token", token);
      setItem("userId", user.id);

      navigate("/");
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
      <div className="sign-up-container">
        <h1>Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
          <span>Nome</span>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <span>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Senha</span>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <span>Confirmação de senha</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button>Cadastrar</button>
          <p onClick={redirectToSignIn}>Já tem cadastro? Clique aqui</p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
