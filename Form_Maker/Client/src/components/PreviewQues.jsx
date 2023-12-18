import React from "react";

const PreviewQues = ({ question, allQuestions, setAllQuestions, index }) => {
  const handleRemoveQuestion = () => {
    const newAllQuestions = [...allQuestions];
    newAllQuestions.splice(question, 1);
    setAllQuestions(newAllQuestions);
  };

  if (question.type === "Category") {
    return (
      <div className="flex  flex-col justify-center gap-2 p-4  ">
        <div className="flex items-center ">
          <h2 className="underline font-extrabold text-2xl ">
            Question : {index + 1}
          </h2>
          <button
            className="ml-10  text-red-400 hover:text-white hover:bg-red-600 border-2 border-red-500   p-1 "
            onClick={() => {
              handleRemoveQuestion();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
        <div className=" flex items-center gap-4">
          <h2 className="text-xl">Categories : </h2>
          {question.categories.map((category, index) => {
            return (
              <h2
                key={index}
                className="bg-slate-600 text-white text-md font-bold border-2 border-slate-600 hover:border-slate-600  px-3   py-2"
              >
                {category}
              </h2>
            );
          })}
        </div>
        <div className=" flex items-center gap-4">
          <h2 className="text-xl">Items : </h2>
          {question.items.map((item, index) => {
            return (
              <h2
                key={index}
                className="bg-white  text-slate-600  text-md font-bold border-2 border-slate-600 hover:border-slate-600  px-3   py-2"
              >
                {item.name}
              </h2>
            );
          })}
        </div>
      </div>
    );
  }
  if (question.type === "Cloze") {
    return (
      <div className=" flex  bg-white  p-4 ">
        <div className="flex flex-col gap-3">
          <div className="flex ">
            <h2 className="underline font-extrabold text-2xl ">
              Question : {index + 1}
            </h2>
            <button
              className="ml-10  text-red-400 hover:text-white hover:bg-red-600 border-2 border-red-500   p-1 "
              onClick={() => {
                handleRemoveQuestion();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>

          <div>
            <div className="border-2 border-gray-600 tracking-widest px-3 py-2  bg-white ">
              {question.preview}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {question.words.map((word, index) => {
              return (
                <div
                  key={index}
                  className="bg-white text-slate-600 text-md font-bold border-2 border-slate-600 hover:border-slate-600  px-2  py-1 hover:cursor-move "
                >
                  {word}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  if (question.type === "comprehension") {
    return (
      <div className="flex flex-col justify-center gap-2 p-4 bg-white  ">
        <div className="flex items-center ">
          <h2 className="underline font-extrabold text-2xl ">
            Question : {index + 1}
          </h2>
          <button
            className="ml-10  text-red-400 hover:text-white hover:bg-red-600 border-2 border-red-500   p-1 "
            onClick={() => {
              handleRemoveQuestion();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
        <div className="  flex  flex-col bg-white p-2 border-2 border-gray-500 mb-4">
          <h2 className=" text-lg font-bold ">Passage : </h2>
          {question.passage}
        </div>

        <div>
          <h2 className=" text-lg font-bold ">Questions : </h2>
          <div className="border-2 border-gray-400">
            {question.questions.map((ques, index) => (
              <div key={index} className="bg-white  p-2">
                <h2 className="text-lg font-bold mb-1">
                  Q.{index + 1} {ques.question}
                </h2>

                <div>
                  {ques.options.map((opt, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input type="checkbox" className="self-center" />
                      <h2 className="text-md text-gray-700">{opt.text}</h2>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default PreviewQues;
