import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../assets1/pasteSlice';
import toast from 'react-hot-toast';
import { Calendar,Trash2,Copy,Share,FilePenLine,Eye} from 'lucide-react';

export const Pastes = () => {
const[srchterm,setsrchterm]=useState('');

const dispatch = useDispatch();
  const pastes = useSelector((state)=>
    state.paste.pastes
  );
  console.log(pastes)

  const filtereddata = pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(srchterm.toLowerCase())
  )
  console.log(filtereddata);
 
  
    const handleShareClick = (pasteId) => {
      // Define the URL based on the paste ID
      const shareUrl = `${window.location.origin}/pastes/${pasteId}`;
  
      // Copy the URL to the clipboard
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          toast.success("Link copied to clipboard!",{
            position:"top-right"
          });
        })
        .catch((error) => {
          console.error("Failed to copy link:", error);
        });
    };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      
    });
  }
  function handledelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div className='w-full'>
   <div>
    <input 
    className='pt-2 pl-3.5 pr-2 pb-2 w-[1100px] rounded-lg bg-[#334155] text-[#a4acb5] font-normal text-left placeholder:text-[#a3a9b0]'
    type="search" value={srchterm}
    onChange={(e)=>setsrchterm(e.target.value)} 
    placeholder='Search Paste Here..'/>
   </div>
   <div className='mt-4 flex flex-col justify-center border '>
    {
    
      filtereddata.length>0 ?
      filtereddata.map(
        (paste)=>{ 
          return(
            <div className='flex max-h-[150px] p-3 border m-3 justify-between bg-[#2D3748] border-[#4A5568]'>
              <div className='flex flex-col justify-between '>
             <div className='flex  justify-center text-5xl max-w-[260px]   text-center overflow-hidden text-ellipsis'> {paste.title}</div>
             <div className='flex  justify-center text-lg  max-w-[200px]  text-center overflow-hidden text-ellipsis mt-2 max-h[20px]'>{paste.content}</div>
             </div>
             <div className='flex flex-col justify-end'>
             <div className='justify-evenly flex mt-2 gap-2'>
              <button  className='p-2 font-semibold bg-black-200 text-black rounded border hover:text-sky-200 transition-all duration-300'>
              <a href={`/?pasteId=${paste?._id}`}>
              <FilePenLine size={18} /></a> 
              </button>
              <button className='p-2 font-semibold bg-black-200 text-black rounded border hover:text-green-200 transition-all duration-300'>
                <a href={`/pastes/${paste?._id}`}>
                <Eye size={18}  /> </a> </button>
              <button onClick={()=>handledelete(paste?._id)}  className='p-2 font-semibold bg-black-200 text-black rounded border hover:text-red-200 transition-all duration-300'><Trash2 size={18}/></button>
              <button onClick={()=>{navigator.clipboard.writeText(paste.content)
                toast.success("Paste Copied To ClipBoard",{
                  position: "top-right",
                })

              }}  className='p-2 font-semibold bg-black-200 text-black rounded border hover:text-blue-200 transition-all duration-300'><Copy size={18}/></button>
             <button onClick={handleShareClick(paste?._id)}  className='p-2 font-semibold bg-black-200 text-black rounded border hover:text-yellow-200 transition-all duration-300'><Share size={18} /></button>
           
             </div> 
             <div className='flex  justify-end pt-2 text-sm'> <br/> <div className=' flex justify-evenly gap-1 p-1  max-w-fit bg-black-200'><Calendar size={20} />{formatDate(paste.createdAt)}</div></div> </div>
            </div>
          )
        }
      )
       : (<div className='text-center text-5xl font-bold py-20 font-serif'>No Paste Here !</div>
    )}
    
   </div>
   </div>
  )
}
