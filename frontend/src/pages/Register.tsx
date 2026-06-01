import { useForm } from "react-hook-form";

import {
 registerUser,
 type RegisterPayload
}
from "../services/auth.service";

function Register() {

 const {
  register,
  handleSubmit
 } =
 useForm<RegisterPayload>();

 const onSubmit =
 async (
  data: RegisterPayload
 ) => {

  try {

   await registerUser(
    data
   );

   alert(
    "Registration Successful"
   );

  } catch (
   error: unknown
  ) {

   console.error(
    error
   );
  }
 };

 return (

  <div
   className="container mt-5"
  >

   <h2>
    Register
   </h2>

   <form
    onSubmit={
     handleSubmit(
      onSubmit
     )
    }
   >

    <input
     className="form-control mb-3"
     placeholder="Name"
     {...register(
      "name"
     )}
    />

    <input
     className="form-control mb-3"
     placeholder="Organization Name"
     {...register(
      "organizationName"
     )}
    />

    <input
     className="form-control mb-3"
     placeholder="Email"
     {...register(
      "email"
     )}
    />

    <input
     className="form-control mb-3"
     type="password"
     placeholder="Password"
     {...register(
      "password"
     )}
    />

    <button
     type="submit"
     className="btn btn-success"
    >
     Register
    </button>

   </form>

  </div>

 );
}

export default Register;