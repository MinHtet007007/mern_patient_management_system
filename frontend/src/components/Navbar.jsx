import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { removeCookies } from "../redux/services/authSlice";
import { Popover, Text, Button } from "@mantine/core";
import { BsFillPersonFill } from "react-icons/bs";
import { Input } from "@mantine/core";
import { removeCookies } from "../redux/services/authSlice";
// import { setSearchTerm } from "../redux/services/contactSlice";

const Navbar = () => {
  const user = JSON.parse(Cookies.get("user"));
  const [logout] = useLogoutMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const { data } = await logout();
    if (data == "success") {
      dispatch(removeCookies());
      nav("/login");
    }
  };

  return (
    <div className=" flex justify-around p-3 mt-3 shadow">
      <h2 className=" text-2xl text-gray-700">Dashboard</h2>
      <div className=" flex gap-3">
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target className=" bg-blue-500">
            <Button>
              {" "}
              <BsFillPersonFill className=" text-2xl" />{" "}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <div className=" flex flex-col  gap-5 items-center">
              <div className=" flex flex-col">
                <p>{user?.name}</p>
                <p className="">{user?.code}</p>
              </div>
              <p
                className=" px-4 py-1 bg-red-500 text-white cursor-pointer rounded"
                onClick={logoutHandler}
              >
                Logout
              </p>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
