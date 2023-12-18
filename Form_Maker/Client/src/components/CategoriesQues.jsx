import React, { useState } from "react";

const CategoriesQues = ({ setAllQuestions }) => {
  const [categories, setCategories] = useState([]);
  const [newCategoryItem, setNewCategoryItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  const handleSubmit = () => {
    if (categories.length === 0 || items.length === 0) {
      return;
    }
    const data = { type: "Category", categories, items };
    setAllQuestions((prevQuestions) => [...prevQuestions, data]);
    setCategories([]);
    setItems([]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleRemove = (categoryToRemove) => {
    const newCategory = categories.filter(
      (category) => category !== categoryToRemove
    );
    let newItems = [...items];
    newItems = newItems.filter((item, index) => {
      return item.cat !== categoryToRemove;
    });
    setItems(newItems);
    setCategories(newCategory);
  };

  const handleAdd = () => {
    if (categories.includes(newCategoryItem) || newCategoryItem.length === 0) {
      return;
    }
    setCategories([...categories, newCategoryItem]);
    setNewCategoryItem("");
  };

  const handleAddName = () => {
    if (name.trim() === "" || selectedCategory.trim() === "") {
      return;
    }
    setItems([...items, { name, cat: selectedCategory }]);
    setName("");
    setSelectedCategory("");
  };

  return (
    <div className=" p-4 border-b-2  border-gray-600 ">
      <div>
        <h2 className="text-2xl font-bold">Categories</h2>

        <div className="  p-4 flex flex-col  gap-2">
          {categories.length > 0 &&
            categories.map((category, index) => (
              <div className="flex" key={index}>
                <div className="flex gap-2 justify-center items-center text-white     bg-slate-500  border-2  border-slate-400  overflow-hidden">
                  <div className="text-md px-2 text-center font-mono whitespace-nowrap overflow-hidden ">
                    {category}
                  </div>
                  <button
                    className="bg-[#f6f6f6]"
                    onClick={() => handleRemove(category)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 p-1 text-black "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

          <div className="flex gap-3">
            <input
              className="border-2 border-gray-600 w-1/3 h-9 text-center"
              value={newCategoryItem}
              onChange={(e) => setNewCategoryItem(e.target.value)}
              placeholder="New Category"
            />
            <button onClick={handleAdd}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9  bg-slate-600 border-2 border-white text-white "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="border-y-2 p-4 flex flex-col gap-1 mt-4">
        <h2 className="text-xl font-bold p-1">Items:</h2>
        <div className=" flex flex-col gap-2 p-x-2 ">
          {items.map((item, index) => (
            <div className="flex     " key={index}>
              <div className="flex gap-3 overflow-hidden py-1 text-md tracking-wide bg-[#787883] bg-opacity-70 px-2">
                <h2 className=" flex overflow-hidden">
                  <span className="px-2  font-bold  text-white">Name:</span>
                  <span className=" max-w-[16rem] whitespace-nowrap  bg-white px-1">
                    {item.name}
                  </span>
                </h2>
                <h2 className=" flex overflow-hidden ">
                  <span className="px-2 font-bold text-white">Category:</span>
                  <span className=" max-w-[16rem] whitespace-nowrap  bg-white px-1">
                    {item.cat}
                  </span>
                </h2>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="bg-gray-50 hover:bg-gray-200 text-slate-600 px-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-5">
          <input
            className="border-2  border-gray-600 text-center w-1/3 p-2 mt-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="border-2 w-1/3 p-2 mt-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="bg-white hover:bg-slate-600 text-slate-600 hover:text-white text-md font-bold border-2 border-slate-600 hover:border-slate-600  px-3  py-2 mt-2"
            onClick={handleAddName}
          >
            Add New Item
          </button>
        </div>
      </div>
      <div className="flex justify-center ">
        <button
          className=" bg-slate-600 text-white text-md font-bold border-2 border-slate-600  rounded-sm  px-3  py-2 mt-2 tracking-tighter hover:tracking-tight "
          onClick={() => handleSubmit()}
        >
          Add Category Question
        </button>
      </div>
    </div>
  );
};

export default CategoriesQues;
