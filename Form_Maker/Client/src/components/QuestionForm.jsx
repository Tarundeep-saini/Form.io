import React, { useEffect, useState } from "react";

const QuestionForm = ({ question, setAnswers, answers, QuestionFormIndex }) => {
  const [newQuestion, setNewQuestion] = useState(question);

  const handleDragStart = (item, index) => (event) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(item));
    event.dataTransfer.setData("index", index);
  };

  const hanldeResetCloze = () => {
    const updatedQues = { ...newQuestion };
    updatedQues.preview = updatedQues.showPreview;
    setNewQuestion(updatedQues);

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[QuestionFormIndex] = updatedQues;
      return newAnswers;
    });
  };

  const handleClozeDragStart = (word) => (event) => {
    event.dataTransfer.setData("word", word);
  };

  const handleClozeDrop = (index) => (event) => {
    const draggedItem = event.dataTransfer.getData("word");
    const wordsArray = newQuestion.preview.split(" ");
    wordsArray[index] = draggedItem;
    let resultString = wordsArray.join(" ");
    const modalQuestion = newQuestion;
    modalQuestion.preview = resultString;
    setNewQuestion(modalQuestion);
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[QuestionFormIndex] = newQuestion;
      return newAnswers;
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (category) => (event) => {
    event.preventDefault();
    const index = event.dataTransfer.getData("index");
    const draggedItem = JSON.parse(event.dataTransfer.getData("text/plain"));
    draggedItem.cat = category;
    let newQues = newQuestion;
    newQues.items[index].cat = category;
    setNewQuestion(newQues);
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[QuestionFormIndex] = newQuestion;
      return newAnswers;
    });
  };

  const handleCheckboxChange = (questionIndex, optionIndex) => {
    let newQues = newQuestion;
    newQues.questions[questionIndex].options[optionIndex].isTrue =
      !newQues.questions[questionIndex].options[optionIndex].isTrue;
    setNewQuestion(newQues);
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[QuestionFormIndex] = newQuestion;
      return newAnswers;
    });
    return;
  };

  if (newQuestion.type === "comprehension") {
    return (
      <div className=" flex flex-col gap-2   p-4 rounded-md  ">
        <h2 className="text-xl  font-bold tracking-wider ">
          Question.{QuestionFormIndex + 1}
        </h2>
        <h2 className="p-2 border-2 bg-gray-100 rounded-lg">
          {newQuestion.passage}
        </h2>
        {newQuestion.questions.map((question, questionIndex) => (
          <div className="p-2 border-2" key={questionIndex}>
            <h2 className=" text-lg">
              Q.{questionIndex + 1} {question.question}
            </h2>
            <div>
              {question.options.map((opt, optionIndex) => (
                <div className="flex gap-2" key={optionIndex}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleCheckboxChange(questionIndex, optionIndex)
                    }
                  />
                  <h4 className=" text-md">{opt.text}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (newQuestion.type === "Cloze") {
    const wordsArray = newQuestion.preview.split(" ");
    return (
      <div className="flex flex-col justify-center gap-5  p-4 rounded-md ">
        <h2 className="text-xl  font-bold tracking-wider ">
          Question.{QuestionFormIndex + 1}
        </h2>

        <div className="space-x-2 text-lg flex">
          {wordsArray.map((word, index) => {
            if (word === "___") {
              return (
                <div key={index}>
                  <h2
                    className=""
                    onDragOver={handleDragOver}
                    onDrop={handleClozeDrop(index)}
                  >
                    _ _ _
                  </h2>
                </div>
              );
            } else return <div key={index}>{word}</div>;
          })}
          <button
            onClick={() => {
              hanldeResetCloze();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.4}
              stroke="currentColor "
              className=" text-gray-600   w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>
        <div className="flex gap-3 ">
          {newQuestion.words.map((word, index) => {
            return (
              <div
                key={index}
                draggable
                onDragStart={handleClozeDragStart(word)}
                className="min-w-[4rem] text-white font-bold text-center p-1 border-2 border-slate-600 bg-slate-500"
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  if (newQuestion.type === "Category") {
    return (
      <div className="flex flex-col justify-center gap-5 p-4 rounded-md ">
        <h2 className="text-xl  font-bold tracking-wider ">
          Question.{QuestionFormIndex + 1}
        </h2>
        <div className="flex flex-col gap-4 ">
          <div className="flex  ">
            <h2 className="min-w-[4rem] text-xl  text-white font-bold text-center p-2 border-2 border-slate-600 bg-[#353434]">
              Categories : (Drag & Drop items on Category)
            </h2>
          </div>
          <div className=" flex flex-col gap-3">
            {newQuestion.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="flex gap-2 flex-wrap  ">
                <div
                  className="min-w-[6rem] text-xl tracking-wide text-center p-2 font-bold text-white border-2 border-slate-500  bg-slate-600"
                  key={categoryIndex}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(category)}
                >
                  {category}
                </div>
                {newQuestion.items.map((item, index) => {
                  if (item.cat === category) {
                    return (
                      <div
                        key={index}
                        className="min-w-[4rem] text-lg  font-bold  tracking-wider text-gray-700  text-center p-2 border-2 border-slate-600 bg-slate-100"
                      >
                        {item.name}
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 ">
          <h2 className="min-w-[4rem] text-xl  text-white font-bold text-center p-2 border-2 border-gray-300 bg-gray-500">
            Items :
          </h2>
          <div className="flex gap-2 flex-wrap">
            {newQuestion.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                draggable
                onDragStart={handleDragStart(item, itemIndex)}
                className="min-w-[4rem] cursor-grab font-bold text-center text-gray-500 p-2 border-2 border-gray-400 bg-gray-100"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default QuestionForm;
