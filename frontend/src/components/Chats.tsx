import { Messages } from "../pages/Chat"
import ReactMarkdown from 'react-markdown';
import ChatSkeleton from "./ChatSkeleton";

const Chats = ({messages, loading}:{messages:Messages, loading:boolean}) => {

  return (
    <div className="flex flex-col justify-center items-center mt-10 flex-start">
        <div className="max-w-screen-xl">
       {
        messages.map((message, index)=> (
            <div key={index} className={`text-white p-4 ${message.isBot?"bg-stone-700 rounded-md mt-4":""}`}>
            <div className="font-bold mb-2">
                {message.isBot?"100xEngineer":"You"}
            </div>
            <span className="leading-5">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </span>
        </div>
        ))
       }
       {loading && <div> <ChatSkeleton/> <br></br><ChatSkeleton/></div>}
       </div>
    </div>
  )
}

export default Chats
