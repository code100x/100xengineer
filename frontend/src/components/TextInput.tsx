import { useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useRecoilState, useRecoilValue } from "recoil"
import { HandleInput, InputDisable } from "../store/atoms/atom"

const TextInput = ({onClick}:{onClick:()=> void}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [input, setInput] = useRecoilState(HandleInput)
    const inputDisabled = useRecoilValue(InputDisable)
    useEffect(()=> {
        textAreaRef.current?.focus()
    },[])

    const handleKeyPress = (event:React.KeyboardEvent<HTMLTextAreaElement>) => {
      if(event.key==='Enter'  && !event.shiftKey){
        onClick()
      }
    }
  return (
    <div className="bg-gray-700 fixed bottom-0 left-0 w-full md:flex justify-center p-4 mt-3">
      <div>
        <TextareaAutosize 
            onChange={(e)=> setInput(e.target.value)}
            ref={textAreaRef}
            value={input}
            onKeyDown={handleKeyPress}
            disabled={inputDisabled}
            placeholder="Enter something to ask" 
            className={`w-80 md:w-[600px] ${inputDisabled?"opacity-50 cursor-not-allowed":"opacity-100"} lg:w-[930px] bg-gray-500 text-white focus:outline-none min-h-[38px] max-h-[300px] lg:max-h-[400px] px-4 py-2 border rounded-md border-slate-400 resize-y \n`}
        />
        <button 
            disabled={inputDisabled} 
            onClick={onClick} 
            className={`ml-3 bg-blue-500 p-2 mt-[1px] rounded-md w-24 hover:bg-blue-600 absolute text-white ${inputDisabled?"opacity-50 cursor-not-allowed":"opacity-100"}`}>
              Submit
        </button>
      </div>
    </div>
  )
}

export default TextInput
