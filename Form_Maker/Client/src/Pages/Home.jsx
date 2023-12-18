import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    setIsLoading(true);

    const getUsers = async () => {
      try {
        const { data } = await axios.get("/users");
        if (data.isError === true) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        setUsers(data.users);
      } catch {
        setIsError(true);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="bg-[#edeee7] h-screen ">
      <div className="flex items-center gap-7 p-4  bg-[#394f69]  ">
        <h2
          className="text-2xl p-2 border-r-2 border-white  text-[#F7F7FF] font-extrabold tracking-wider "
          to={"/"}
        >
          Form.io
        </h2>
        <Link className="text-xl  text-white tracking-wider " to={"/formMaker"}>
          Make A Form
        </Link>
      </div>
      {!isLoading ? (
        isError ? (
          <h2 className=" font-bold text-xl tracking-widest p-2">
            Error Occured Fetching the Users.
          </h2>
        ) : (
          <div className="flex flex-wrap justify-between gap-6 px-9 py-6 ">
            {users.length > 0 &&
              users.map((user, index) => (
                <Link
                  to={`/form/${user.creator}`}
                  className={`basis-1/6 min-w-[13rem] flex bg-white overflow-hidden border-2 border-gray-500 hover:border-gray-400`}
                  key={user._id}
                >
                  <div className="bg-[#e9e9e9] flex items-center justify-center p-2   ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-12 h-12  border-gray-200 text-[#364a6f]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <div className=" whitespace-nowrap bg-[#415A77] p-2 px-4 hover:bg-[#5b7797] w-full">
                    <h2 className="font-extrabold tracking-wider text-white ">
                      {user.creator}
                    </h2>
                    <h4 className="font-extrabold tracking-wider text-white">
                      Questions: {user.allquestions.length}
                    </h4>
                  </div>
                </Link>
              ))}
          </div>
        )
      ) : (
        <h2 className=" font-bold text-xl tracking-widest p-2">
          Fetching Users...
        </h2>
      )}
    </div>
  );
};

export default Home;
