
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../assets1/pasteSlice";
import { useSearchParams } from "react-router-dom";

export const ViewPaste = () => {

  const {id}= useParams();
  const allpastes = useSelector((state)=>state.paste.pastes);

  const paste = allpastes.filter((p)=>p._id==id)[0];

  return (
    <div className="w-full flex flex-col items-center mt-8">
    <div className="flex flex-row items-center gap-4 mb-6">
      
      <input disabled 
        className="w-[700px] p-2 pr-9 rounded-lg bg-gray-800 text-cyan-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md cursor-no-drop"
        type="text" id="titlen"
        placeholder="Enter Title Here..."
       // onChange={(e) => settitle(e.target.value)}
        value={paste.title}
      />

      {/* <button
        onClick={createPaste}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {pasteId ? "Update My Paste":"Create New Paste"}
      </button> */}
    </div>

    <div className="w-full flex justify-center">
      <textarea disabled 

      id="text-area"
        value={paste.content}
       // onChange={(e) => setvalue(e.target.value)}
        className="cursor-not-allowed w-[700px] h-[550px] p-4 bg-gray-800 text-cyan-50 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        placeholder="Your text here..."
      />
    </div>
  </div>  )
}
