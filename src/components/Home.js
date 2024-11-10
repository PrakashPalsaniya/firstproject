import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../assets1/pasteSlice";
import { useSearchParams } from "react-router-dom";
import {Copy} from 'lucide-react';

export const Home = () => {
  const [title, settitle] = useState('');
  const [value, setvalue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  
  const pasteId = searchParams.get("pasteId"); // Get pasteId from the search params
  const pastes = useSelector((state) => state.paste.pastes);
  const allpaste = useSelector((state)=>state.paste.pastes);
  const dispatch = useDispatch();

  useEffect(() => {

    if(pasteId){
      const paste= allpaste.find((p)=>p._id=== pasteId);
      if(paste){
      settitle(paste.title);
      setvalue(paste.content);}
    }
   
  
   
  }, [pasteId])
  

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // If pasteId is present, update the paste
      dispatch(updatePastes(paste));
    } else if (!pasteId && title !== "") {
      dispatch(addToPastes(paste));
    }
    else if(title===""||''){
      toast.error("please enter a title!")
    }

    settitle("");
    setvalue("");

    // Remove the pasteId from the URL after creating/updating a paste
    setSearchParams({});
  };

 

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <div className="flex flex-row items-center gap-4 mb-6 w-full">
        <input
          className="w-[910px] p-2 rounded-lg bg-[#334155] text-[#F1F5F9] placeholder:text-[#afb5bd] focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          type="text"
          placeholder="Enter Title Here..."
          onChange={(e) => settitle(e.target.value)}
          value={title}
        />

        <button
          onClick={createPaste}
          className="px-8 py-2 rounded-lg bg-[#3B82F6] text-white hover:bg-blue-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {pasteId ? "Update My Paste":"Create New Paste"}
        </button>
      </div>
<div className='relative pt-8 rounded-lg bg-slate-500' >
 <div className=' min-w-full flex justify-end pr-4 max-h-2 m-0 absolute top-0 right-2 pt-2 pb-1'><button onClick={()=>{ if(value!==""||''){
  navigator.clipboard.writeText(value) 
  toast.success("Copied To ClipBoard",{
    position:"top-right",
  })
 }
 else{
  toast.error("Please Enter Some Text")
 }
}
 }><Copy size={20} color='white'/></button></div> 
      <div className="w-full flex justify-center">
        <textarea
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          className="w-[1120px] h-[530px] p-4 bg-[#1F2937] text-[#E2E8F0] placeholder:text-[#a6abb3] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          placeholder="Your Text Here..."
        />
      </div></div>
    </div>
  );
};
