import React, { useEffect, useRef, useState } from "react";
import CategoriesQues from "../components/CategoriesQues";
import ClozeQues from "../components/ClozeQues";
import ComprehensionQues from "../components/ComprehensionQues";
import PreviewQues from "../components/PreviewQues";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DialogModal from "../components/DialogModal";

const Form_maker = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [creator, setCreator] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dialogMessage, setDialogMessage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useNavigate();
  const dialogRef = useRef(null);

  const handleModalClose = () => {
    dialogRef.current.close();
    setDialogOpen(false);
    if (!isError) {
      location("/");
    }
  };
  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleSubmit = async () => {
    if (creator === "") {
      handleError("Enter The Creator Name");
      return;
    }
    if (allQuestions.length === 0) {
      handleError("There Are No Questions");
      return;
    }
    const data = {
      creator,
      allQuestions,
    };
    setIsLoading(true);
    try {
      const response = await axios.post("/CreateForm", data);
      setDialogOpen(true);
      setIsLoading(false);
      setDialogMessage(response.data.message);
      setIsError(response.data.isError);
      dialogRef.current.showModal();
    } catch (error) {
      setIsLoading(false);
      setDialogMessage(error.response.data.message);
      setIsError(error.response.data.isError);
      dialogRef.current.showModal();
    }
  };

  return (
    <div
      className={` bg-gray-400  min-h-screen ${
        dialogOpen ? "  opacity-50" : ""
      } `}
    >
      <div className="flex items-center  gap-7 p-4 bg-[#394f69] ">
        <Link
          className="text-2xl  p-2 border-r-2 border-white  text-[#F7F7FF]  font-extrabold tracking-wider "
          to={"/"}
        >
          Form.io
        </Link>
        <h2 className="text-xl  text-white tracking-wider ">
          You are Making a Form . . .
        </h2>
      </div>
      <DialogModal
        handleModalClose={handleModalClose}
        dialogRef={dialogRef}
        dialogMessage={dialogMessage}
      />
      <div className="flex justify-center  bg-[#f3efea]">
        <div
          className={` mt-2 w-8/12 bg-opacity-60 border-2 border-black bg-white  flex flex-col gap-3 
          ${!dialogOpen ? "" : "hidden bg-red-300"} 
          `}
        >
          <div className=" flex flex-col gap-3 py-4 ">
            {allQuestions.length > 0 &&
              allQuestions.map((question, index) => {
                return (
                  <PreviewQues
                    key={index}
                    allQuestions={allQuestions}
                    setAllQuestions={setAllQuestions}
                    index={index}
                    question={question}
                  />
                );
              })}
          </div>
          <div>
            <CategoriesQues setAllQuestions={setAllQuestions} />
            <br></br>
            <ClozeQues setAllQuestions={setAllQuestions} />
            <br></br>
            <ComprehensionQues setAllQuestions={setAllQuestions} />
          </div>
          <div className="flex items-center justify-end gap-4 p-3 ">
            {errorMessage && (
              <h2 className=" font-extrabold text-lg text-red-500 ">
                {errorMessage}*
              </h2>
            )}
            <input
              className="border-2 border-gray-600 p-2"
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              placeholder="Enter Creator name"
            />

            <button
              disabled={isLoading}
              className="bg-slate-700  font-bold   text-white px-4 py-2 "
              onClick={() => handleSubmit()}
            >
              {isLoading ? "Loading..." : "  Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form_maker;
