import { Loader, Select, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useGetVolunteerQuery,
  useUpdatePatientMutation,
} from "../redux/api/patientApi";

const EditPatient = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const patients = useSelector((state) => state.patientSlice.patients);
  const updatePatientInfo = patients.filter((patient) => patient?._id == id);
  const [updatePatient, { isLoading }] = useUpdatePatientMutation();
  const { data } = useGetVolunteerQuery();

  // console.log(updatePatientInfo);

  const form = useForm({
    initialValues: {
      name: updatePatientInfo[0].name,
      volunteer_id: updatePatientInfo[0].volunteer_id._id,
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
            const { data } = await updatePatient({
              patient: values,
              id,
            });
            // console.log(data);
            // console.log(values);
            if (data) {
              nav("/");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 flex flex-col gap-10 shadow-lg p-7"
      >
        <h4 className=" text-2xl">Update patient</h4>
        <TextInput
          placeholder="Enter your name..."
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
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditPatient;
