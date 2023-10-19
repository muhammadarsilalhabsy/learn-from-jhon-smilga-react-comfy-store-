import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitButton } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (user) {
    return redirect("/");
  }
  return null;
};
export const action = async ({ request }) => {
  console.log(request);

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("Account created successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check you credential";
    toast.error(errorMessage);
    return null;
  }
};
const Register = () => {
  return (
    <section className="grid place-items-center h-screen">
      <Form
        method="POST"
        className="card bg-base-100 w-96 p-8 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="username" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitButton text="register" />
        </div>
        <button className="btn btn-secondary btn-block">Login As Guest</button>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
