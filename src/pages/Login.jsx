import { FormInput, SubmitButton } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (user) {
    return redirect("/");
  }
  return null;
};

export const action =
  (store) =>
  async ({ request }) => {
    console.log(store);

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);

    try {
      const response = await customFetch.post("/auth/local", data);
      console.log(response);
      store.dispatch(loginUser(response.data));
      toast.success("Logged in successfully");
      return redirect("/"); // redirect hanya diggunakan pada action dan loader
      // return null;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check you credential";
      toast.error(errorMessage);
      return null;
    }
  };
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });

      dispatch(loginUser(response.data));
      toast.success("Welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Guest user login error, please try again");
      return null;
    }
  };
  return (
    <section className="grid place-items-center h-screen">
      <Form
        method="POST"
        className="card bg-base-100 w-96 p-8 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitButton text="login" />
        </div>
        <button
          type="button"
          onClick={loginAsGuestUser}
          className="btn btn-secondary btn-block"
        >
          Login As Guest
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
