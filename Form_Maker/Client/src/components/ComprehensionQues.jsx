import React, { useEffect, useState } from "react";
import McqQues from "./McqQues";

const ComprehensionQues = ({ setAllQuestions }) => {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = () => {
    if (passage === "" || questions.length === 0) {
      return;
    }
    const data = { type: "comprehension", passage, questions };
    setAllQuestions((prevQuestions) => [...prevQuestions, data]);
    setPassage("");
    setQuestions([]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const addquestion = (newQues) => {
    setQuestions([...questions, newQues]);
  };

  useEffect(() => {
    const textarea = document.getElementById("auto-resize-textarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [passage]);

  return (
    <div className="border-b-2 flex flex-col gap-3  border-gray-600 p-4 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Comprehension Questions</h2>

      <textarea
        id="auto-resize-textarea"
        className="border-2 w-10/12 h-auto p-2 mb-4"
        value={passage}
        onChange={(e) => setPassage(e.target.value)}
        placeholder="Enter Text Here"
      />

      {questions.length > 0 && (
        <div className=" bg-white bg-opacity-80 border-2 border-gray-600  p-4 mb-4 ">
          <h2 className=" font-semibold text-xl  text-gray-800 mb-2">
            Preview of Questions :
          </h2>
          {questions.map((question, index) => (
            <div key={index} className="p-2 border-2 border-gray-400">
              <div className="flex justify-between items-center">
                <h2 className="w-11/12 whitespace-wrap overflow-clip text-sm text-gray-700 font-semibold mb-2">
                  Ques{index + 1}. {question.question}
                </h2>
                <button
                  onClick={() => handleRemoveQuestion(index)}
                  className="ml-2 text-sm text-slate-800 hover:underline"
                >
                  Remove
                </button>
              </div>

              <div>
                {question.options.map((option, optionIndex) => (
                  <h5 key={optionIndex} className=" text-gray-600 text-md">
                    <input type="checkbox" />
                    {option.text}
                  </h5>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <McqQues addquestion={addquestion} />
      <div className="flex justify-center ">
        <button
          className=" bg-slate-600 text-white text-md font-bold border-2 border-slate-600  rounded-sm  px-3  py-2 mt-2 tracking-tighter hover:tracking-tight "
          onClick={() => handleSubmit()}
        >
          Add Comprehension Question
        </button>
      </div>
    </div>
  );
};

export default ComprehensionQues;
