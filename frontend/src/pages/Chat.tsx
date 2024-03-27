import { useRecoilState, useSetRecoilState } from "recoil"
import Chats from "../components/Chats"
import TextInput from "../components/TextInput"
import { HandleInput, InputDisable } from "../store/atoms/atom"
import { useEffect, useState } from "react"
import axios from "axios"

interface Message {
  text: string;
  isBot: boolean;
}

// Define the Messages type as an array of Message objects
export type Messages = Message[];

let context: Array<number>

const Chat = () => {
  const [input,setInput] = useRecoilState(HandleInput)
  const setInputDisabled = useSetRecoilState(InputDisable)
  const [messages, setMessages] = useState<Messages>([])
  const [loading, setLoading] = useState(false)

 

  useEffect(()=> {
   
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth' // You can use 'auto' for an instant scroll
      })
    
  },[messages])
  
  async function handleSubmit(){
    try {
     
      setInputDisabled(true)
    setMessages((prevMessages)=>  [
      ...prevMessages,
      {
      text: input,
      isBot: false
    }
  ])
  setLoading(true)
  const response = await axios.post("http://localhost:3000/chat", {
    input,
    context
  })
  context = response.data.context
  const botMessage = response.data.message

  let typedBotMessage = "";
  for(let i=0; i<botMessage.length; i++){
    setTimeout(()=> {
      typedBotMessage += botMessage[i];
      if(i===0){
        setMessages((prevMessages)=> [
          ...prevMessages,
          {
            text: typedBotMessage,
            isBot: true
          }
        ]);
      }
      else{
        setMessages((prevMessages)=> [
          ...prevMessages.slice(0,-1),
          {
            text: typedBotMessage,
            isBot: true
          }
        ])
      }
    },20*(i+1));
  }
  setInput('')
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
      setInputDisabled(false)
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-zinc-800">
      <div className="flex justify-center bg-gray-600 p-4 text-white text-2xl">
        100xEngineer
      </div>
        <div>
            <Chats messages={messages} loading={loading}/>
        </div>
       
       <div>
        <TextInput onClick={handleSubmit}/>
       </div>
    </div>
  )
}

export default Chat
