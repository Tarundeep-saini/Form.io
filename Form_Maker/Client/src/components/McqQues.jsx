import React, { useEffect, useState } from "react";

const McqQues = ({ addquestion }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [warningText, setWarningText] = useState("");
  const [newOption, setNewOption] = useState({ text: "", isTrue: false });

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const addOption = () => {
    if (newOption.text === "") {
      return;
    }
    setOptions([...options, newOption]);
    setNewOption({ text: "", isTrue: false });
  };

  const handleWaringText = (text) => {
    setWarningText(text);
    setTimeout(() => {
      setWarningText("");
    }, 3000);
  };

  const handleAddQuestion = () => {
    if (options.length === 0) {
      handleWaringText("Add Options");
      return;
    }
    if (question === "") {
      handleWaringText("Write The Question");

      return;
    }
    let data = { question, options };
    addquestion(data);
    setOptions([]);
    setQuestion("");
  };

  return (
    <div className="border-2 p-4">
      <h2 className="text-lg mb-2">Add New Question:</h2>
      <input
        className="border-2 border-gray-600  w-10/12 h-auto p-2 mb-4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter Text Here"
      />

      <div className="flex items-center gap-2 mb-2">
        <input
          className=" flex border-2 border-gray-600 p-2"
          type="text"
          value={newOption.text}
          onChange={(e) => setNewOption({ ...newOption, text: e.target.value })}
          placeholder="New Option"
        />

        <input
          className="transform scale-[2] translate-x-1 mr-2 border-gray-600 "
          type="checkbox"
          checked={newOption.isTrue}
          onChange={() =>
            setNewOption({ ...newOption, isTrue: !newOption.isTrue })
          }
        />

        <button
          className="bg-white hover:bg-slate-600 text-slate-600 hover:text-white text-md font-bold border-2 border-slate-600 hover:border-slate-600  px-3   py-2"
          onClick={addOption}
        >
          Add Option
        </button>
      </div>
      <div className="  flex flex-col   gap-2">
        {options.map((opt, index) => (
          <div
            key={index}
            className="bg-white w-4/12 flex items-center p-1 border border-gray-400"
          >
            <h2 className="mr-2 overflow-hidden ">{opt.text}</h2>
            {opt.isTrue && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <button
              onClick={() => handleRemoveOption(index)}
              className="ml-auto bg-slate-500 text-white px-3 py-1 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2 ">
          <button
            className="bg-white hover:bg-slate-600 text-slate-600 hover:text-white text-md font-bold border-2 border-slate-600 hover:border-slate-600  px-3   py-2"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
          <h2 className=" font-bold text-xl text-slate-600 ">{warningText} </h2>
        </div>
      </div>
    </div>
  );
};

export default McqQues;
