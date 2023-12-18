import React, { useEffect, useRef, useState } from "react";

const ClozeQues = ({ setAllQuestions }) => {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");

  const handleSubmit = () => {
    if (text === "" || words.length === 0 || preview === "") {
      return;
    }
    const data = { type: "Cloze", text, preview, words };
    setAllQuestions((prevQuestions) => [...prevQuestions, data]);
    setText("");
    setPreview("");
    setSelectedWord("");
    setWords([]);
  };

  const handleAddWord = () => {
    const newWords = words;
    newWords.push(word);
    setWords(newWords);
    setWord("");
  };
  const handleRemoveWord = (index) => {
    const newWords = [...words];
    newWords.splice(index, 1);
    setWords(newWords);
  };

  const handleMouseUp = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText || selectedWord === "") {
      setSelectedWord(selectedText);
    }
  };

  const handlePreview = () => {
    if (selectedWord === "") {
      return;
    }
    setWords((prevWords) => [...prevWords, selectedWord]);
  };

  useEffect(() => {
    let newText = text;
    words.forEach((word) => {
      newText = newText.replace(word, "___");
    });
    setPreview(newText);
    setSelectedWord("");
  }, [words]);
  return (
    <div className="flex flex-col border-b-2 border-gray-600 p-4 gap-2 ">
      <h2 className="text-2xl font-bold">Cloze Question</h2>
      <h2 className="text-xl font-semibold">
        Preview:{" "}
        {words.length > 0 && (
          <span className=" bg-gray-100 p-1">{preview}</span>
        )}
      </h2>
      <div
        className="flex justify-center items-center gap-2"
        onMouseUp={handleMouseUp}
      >
        <input
          type="text"
          className="border-2 p-2 border-gray-600  flex-grow"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter Text Here. Select word and click on add blank button"
        />

        <button
          className="bg-white hover:bg-slate-600 text-slate-600 hover:text-white text-md font-bold border-2 border-slate-600 hover:border-slate-600 px-3 py-2 "
          onClick={() => handlePreview()}
        >
          Add Blank
        </button>
      </div>
      click words to remove
      <div className="flex flex-wrap gap-2 py-1 ">
        {words.map((word, index) => (
          <span
            key={index}
            onClick={() => handleRemoveWord(index)}
            className="border-2 border-slate-500  text-white font-bold bg-slate-400  flex justify-center items-center px-2 hover:cursor-pointer "
          >
            {word + " "}
          </span>
        ))}
        <div>
          <input
            className="border-2 p-2 border-r-0  border-gray-600  hover:outline-none  "
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
            placeholder="Other Word"
          />
          <button
            onClick={() => handleAddWord()}
            className="bg-white hover:bg-slate-600 text-slate-600 hover:text-white text-md font-bold border-2 border-slate-600 hover:border-slate-600  px-3   py-2"
          >
            Add Extra Word
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className=" bg-slate-600 text-white text-md font-bold border-2 border-slate-600  rounded-sm  px-3  py-2 mt-2 tracking-tighter hover:tracking-tight "
          onClick={() => handleSubmit()}
        >
          Add Cloze Question
        </button>
      </div>
    </div>
  );
};

export default ClozeQues;
