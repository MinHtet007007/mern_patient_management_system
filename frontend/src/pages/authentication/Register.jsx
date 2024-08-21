import { Loader, PasswordInput, Select, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/authApi";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/services/authSlice";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      role: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      role: (value) => (value ? null : "Please select account type"),
      password: (value) =>
        value.length < 6 ? "Passwords must have at least 6 character" : null,
      password_confirmation: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <div className=" flex h-screen justify-center items-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const userValues = {
              name: values.name,
              role: values.role,
              password: values.password,
            };
            const { data } = await register(userValues);
            // console.log(data);
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
        <h4 className=" text-2xl">Register</h4>
        <TextInput
          placeholder="Enter your name..."
          {...form.getInputProps("name")}
        />
        <Select
          placeholder="Select account type..."
          data={[
            { value: "admin", label: "Admin" },
            { value: "volunteer", label: "Volunteer" },
          ]}
          {...form.getInputProps("role")}
        />
        <PasswordInput
          placeholder="Enter your password..."
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="Password Confirm..."
          {...form.getInputProps("password_confirmation")}
        />
        <div className=" flex gap-3">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <p className=" text-blue-500">Login</p>
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
            "Sign up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
