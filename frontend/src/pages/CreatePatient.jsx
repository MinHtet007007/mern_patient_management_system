import { Loader, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  useCreatePatientMutation,
  useGetVolunteerQuery,
} from "../redux/api/patientApi";

const CreatePatient = () => {
  const [CreatePatient, { isLoading }] = useCreatePatientMutation();
  const nav = useNavigate();
  const { data } = useGetVolunteerQuery();
  // console.log(data);
  const form = useForm({
    initialValues: {
      name: "",
      volunteer_id: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Patient name must have at least 2 letters" : null,
      volunteer_id: (value) => (value ? null : "Please select volunteer"),
    },
  });
  return (
    <div className=" flex h-screen justify-center items-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await CreatePatient({
              patient: values,
            });
            console.log(data);
            // console.log(values);
            if (data == "success") {
              nav("/");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 flex flex-col gap-10 shadow-lg p-7"
      >
        <h4 className=" text-2xl">Add patient</h4>
        <TextInput
          placeholder="Enter patient name..."
          {...form.getInputProps("name")}
        />
        <Select
          placeholder="Select volunteer..."
          data={data?.volunteers?.map((d) => {
            return { value: d._id, label: d.name };
          })}
          {...form.getInputProps("volunteer_id")}
        />
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-500 text-white px-4 py-1"
        >
          {isLoading ? (
            <Loader className=" mx-auto block" color="dark" size="sm" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePatient;
