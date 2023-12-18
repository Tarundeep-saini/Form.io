import React from "react";

const DialogModal = ({ dialogRef, dialogMessage, handleModalClose }) => {
  return (
    <dialog ref={dialogRef}>
      <div className="flex flex-col  p-4 gap-4  min-w-[20rem] bg-white border-2 border-gray-500 ">
        <h1 className=" text-gray-600  text-2xl text-center  tracking-wider ">
          {dialogMessage}
        </h1>
        <div className="flex justify-center">
          <button
            className=" hover:bg-blue-600 p-1 text-lg font-semibold text-blue-500 hover:text-white border-2 border-blue-300 hover:border-blue-700 "
            onClick={() => handleModalClose()}
          >
            Done
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DialogModal;
