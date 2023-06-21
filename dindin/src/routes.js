import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoutes({ redirectTo }) {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route element={<ProtectedRoutes redirectTo={"/"} />}>
        <Route path="/main" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default MyRoutes;
