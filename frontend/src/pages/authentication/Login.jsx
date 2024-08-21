import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { addUser } from "../../redux/services/authSlice";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      code: "",
      password: "",
    },
    validate: {
      code: (value) => (value ? null : "Login code required"),
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 character" : null,
    },
  });

  return (
    <div className=" flex h-screen justify-center items-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await login(values);
            if (data?.success) {
              dispatch(addUser({ user: data?.data }));
              nav("/");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 flex flex-col gap-10 shadow-lg p-7"
      >
        <h4 className=" text-2xl">Log In</h4>
        <TextInput
          placeholder="Enter your code..."
          {...form.getInputProps("code")}
        />
        <PasswordInput
          placeholder="Enter your password..."
          {...form.getInputProps("password")}
        />
        <div className=" flex gap-3">
          <p>You don't have account?</p>
          <Link to={"/register"}>
            <p className=" text-blue-500">Register</p>
          </Link>
        </div>
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-500 text-white px-4 py-1"
        >
          {isLoading ? (
            <Loader className=" mx-auto block" color="dark" size="sm" />
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
