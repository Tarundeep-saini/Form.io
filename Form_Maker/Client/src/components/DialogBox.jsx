import React from "react";
import { useNavigate } from "react-router-dom";

const DialogBox = ({ dialog, result }) => {
  const navigate = useNavigate();
  return (
    <dialog className=" p-4   border-2 border-gray-500  ">
      {!result.isError && (
        <div className="flex flex-col gap-2">
          {Array.isArray(result) ? (
            <div className="flex flex-col gap-2 ">
              {result.length > 0 &&
                result.map((answer, index) => (
                  <div className=" rounded-lg flex gap-2 " key={index}>
                    <h2 className=" rounded-lg bg-gray-500 font-extrabold text-white p-2 ">
                      {" "}
                      Question : {index + 1}
                    </h2>
                    {Array.isArray(answer) ? (
                      answer.length > 0 &&
                      answer.map((item, itemIndex) => (
                        <h2
                          className={`rounded-lg font-bold text-white p-2 ${
                            item === true ? "bg-green-500" : "bg-red-500"
                          }`}
                          key={itemIndex}
                        >
                          {item ? "Correct" : "False"}
                        </h2>
                      ))
                    ) : (
                      <h2
                        className={` rounded-lg font-bold text-white p-2 ${
                          answer === true ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {answer ? "Correct  " : "False"}
                      </h2>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div>
              <h2
                className={`  font-bold text-white p-2 ${
                  result === true ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {result ? "Correct" : "False"}
              </h2>
            </div>
          )}
          <div className="flex justify-center">
            <button
              className=" font-bold text-blue-800 p-2 border-2 border-blue-400 bg-blue-200 hover:bg-blue-800  hover:text-white  "
              autoFocus
              onClick={() => {
                dialog.close();
                navigate("/");
              }}
            >
              Home
            </button>
          </div>
        </div>
      )}
      {result.isError && (
        <div className="flex flex-col gap-2">
          {result.message}

          <div className="flex justify-center">
            <button
              className=" font-bold text-blue-800 px-2 py-1 border-2 border-blue-400 bg-blue-200 hover:bg-blue-800 rounded-md hover:text-white  "
              autoFocus
              onClick={() => dialog.close()}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default DialogBox;
