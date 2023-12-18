import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QuestionForm from "../components/QuestionForm";
import DialogBox from "../components/DialogBox";

const Form = () => {
  const { creator } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState({ text: "", isError: false });
  const [resultError, setResultError] = useState(false);
  const dialog = document.querySelector("dialog");

  useEffect(() => {
    const getQuestions = async () => {
      setFormLoading(true);
      try {
        const { data } = await axios.get(`/questions/${creator}`);
        if (data.isError === true) {
          throw data;
        }
        setQuestions(data);
        setAnswers(data);
      } catch (error) {
        setFormError({ text: error.message, isError: true });
      } finally {
        setFormLoading(false);
      }
    };

    getQuestions();
  }, [creator]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/CheckForm", answers);
      setLoading(false);
      setResult(data);
      dialog.showModal();
    } catch (error) {}
  };

  return (
    <div className=" min-h-screen bg-[#efefeb] ">
      <DialogBox result={result} dialog={dialog} />
      <div className="flex items-center gap-7 p-4  bg-[#394f69] ">
        <Link
          className="text-2xl p-2 border-r-2 border-white  text-[#F7F7FF] font-extrabold tracking-wider "
          to={"/"}
        >
          Form.io
        </Link>
        <h2 className="text-xl  text-white tracking-wider " to={"/formMaker"}>
          Form Created by : <span className="underline">{creator}</span>
        </h2>
      </div>
      <div className="flex justify-center py-8 ">
        {formError.isError === false &&
          (formLoading === false ? (
            <div className=" flex flex-col gap-3 w-2/3  bg-white   p-2  ">
              {questions.map((question, index) => {
                return (
                  <QuestionForm
                    key={index}
                    question={question}
                    QuestionFormIndex={index}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                );
              })}
              <div className="flex justify-center">
                <button
                  className=" bg-slate-600 text-white text-md font-bold border-2 border-slate-600  rounded-sm  px-3  py-2 mt-2  "
                  onClick={() => handleSubmit()}
                >
                  {loading === true ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-green-500 font-bold text-white text-lg rounded-md  p-4">
              Form is Loading. . .
            </div>
          ))}

        {formError.isError === true && (
          <div className="bg-red-500 font-bold text-white text-lg rounded-md  p-4">
            {formError.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
