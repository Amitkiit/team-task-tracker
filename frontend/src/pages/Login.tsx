import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  type LoginPayload,
} from "../services/auth.service";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<LoginPayload>();

 const onSubmit = async (
  data: LoginPayload
) => {
  try {

    const response =
      await loginUser(data);

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );

    localStorage.setItem(
      "accessToken",
      response.accessToken
    );

    localStorage.setItem(
      "refreshToken",
      response.refreshToken
    );

    navigate("/dashboard");

  } catch (error) {

    console.error(error);

    alert(
      "Login Failed"
    );
  }
};

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="form-control mb-3"
          placeholder="Email"
          {...register("email")}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          {...register("password")}
        />

        <button
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;