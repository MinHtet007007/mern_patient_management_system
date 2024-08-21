import { Button, Input, Loader, Table } from "@mantine/core";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Menu } from "@mantine/core";
import {
  useDeletePatientMutation,
  useGetPatientQuery,
} from "../redux/api/patientApi";
import { setPatients } from "../redux/services/patientSlice";

const PatientTable = () => {
  const user = JSON.parse(Cookies.get("user"));
  const { data, isLoading } = useGetPatientQuery({
    volunteerId: user?.role == "volunteer" && user?.id,
  });
  const [deletePatient] = useDeletePatientMutation();
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patientSlice.patients);
  // console.log(patients);
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deletePatient({ id });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    dispatch(setPatients(data?.patients));
  }, [data]);

  const rows = patients?.map((patient) => (
    <tr key={patient._id}>
      <td style={{ textAlign: "center" }}>{patient.name}</td>
      <td style={{ textAlign: "center" }}>{patient.code}</td>
      <td style={{ textAlign: "center" }}>{patient.volunteer_id.name}</td>
      {user?.role == "admin" && (
        <td style={{ textAlign: "center" }}>
          <Menu transitionProps={{ transition: "rotate-right", duration: 150 }}>
            <Menu.Target>
              <Button className=" bg-blue-500" size="xs">
                ...
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Link to={`/edit/${patient?._id}`}>
                <Menu.Item>Edit</Menu.Item>
              </Link>
              <Menu.Item>
                <p
                  onClick={() => deleteHandler(patient?._id)}
                  className=" text-red-500"
                >
                  Delete
                </p>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      )}
    </tr>
  ));
  // console.log(user)
  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Loader size="xl" variant="bars" />
      </div>
    );
  } else if (rows?.length == 0) {
    return (
      <>
        <div className=" font-bold my-3 text-center">
          Use this code to login again : {user?.code}
        </div>
        <div className=" flex justify-center h-[90vh] items-center flex-col">
          <p className=" text-2xl font-bold">There is no patient!!!</p>
          {user.role == "admin" && (
            <Link to={"/create"}>
              <button className=" bg-blue-500 text-white px-6 py-1 my-5 rounded">
                Add Patient Now
              </button>
            </Link>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <div className=" flex flex-col items-center gap-3 my-3">
        <div className=" font-bold">
          Use this code to login again : {user?.code}
        </div>
        {user?.role == "admin" && (
          <Link to={"/create"}>
            <button className=" bg-blue-500 text-white px-6 py-1 my-5 rounded">
              Add patient
            </button>
          </Link>
        )}
      </div>
      <div className=" overflow-auto">
        <Table>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Patient Name</th>
              <th style={{ textAlign: "center" }}>Code</th>
              <th style={{ textAlign: "center" }}>Volunteer Name</th>
              {user?.role == "admin" && (
                <th style={{ textAlign: "center" }}>Action</th>
              )}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </>
  );
};

export default PatientTable;
