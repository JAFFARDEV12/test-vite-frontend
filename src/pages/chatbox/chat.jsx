// import React, { useState, useRef } from "react";
// import { FiSend, FiArrowLeft, FiUpload } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [attachedFile, setAttachedFile] = useState(null);
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   const handleSendMessage = () => {
//     if (newMessage.trim() || attachedFile) {
//       const newMsg = {
//         sender: "You",
//         text: newMessage.trim(),
//         time: "Just now",
//         file: attachedFile,
//       };
//       setMessages([...messages, newMsg]);
//       setNewMessage("");
//       setAttachedFile(null);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAttachedFile({
//         name: file.name,
//         type: file.type,
//       });
//     }
//   };

//   const handleRemoveFile = () => {
//     setAttachedFile(null);
//   };

//   const goBack = () => {
//     navigate("/ai-agent");
//   };

//   return (
//     <div className="flex flex-col h-full bg-[#F5F5F5] text-black">
//       <div className="h-[64px] bg-white border-b border-gray-300 flex items-center px-6 gap-4">
//         <FiArrowLeft
//           className="text-xl cursor-pointer text-gray-700"
//           onClick={goBack}
//         />
//         <h2 className="text-lg font-semibold text-black">Chat</h2>
//       </div>

//       <div className="flex-1 p-6 overflow-auto">
//         {messages.map((msg, idx) => (
//           <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
//             <p className="text-sm font-semibold text-[#4d4d4d]">{msg.sender}</p>
//             {msg.file ? (
//               <div className="flex items-center gap-4 px-4 rounded-xl relative w-fit pr-10">
//                 <div className="bg-gray-700 p-2 rounded-lg">📄</div>
//                 <div>
//                   <p className="font-bold">{msg.file.name}</p>
//                   <p className="text-sm text-gray-600">Document</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-black mt-1">{msg.text}</p>
//             )}
//             <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
//           </div>
//         ))}
//       </div>

//       {/* {attachedFile && (
//         <div className="flex items-center gap-4 px-4 rounded-xl m-4 relative w-fit pr-10">
//           <div className="bg-gray-700 p-2 rounded-lg">📄</div>
//           <div>
//             <p className="font-bold">{attachedFile.name}</p>
//             <p className="text-sm text-gray-600">Document</p>
//           </div>
//           <button
//             className="absolute top-1 right-2 text-sm"
//             onClick={handleRemoveFile}
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       <div className="h-[64px] bg-white border-t border-gray-300 flex items-center px-6 gap-4">
//         <input
//           type="text"
//           placeholder="Enter a prompt here..."
//           className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-600"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileUpload}
//           className="hidden"
//         />
//         <button
//           className="text-gray-700 text-xl"
//           onClick={() => fileInputRef.current.click()}
//         >
//           <FiUpload />
//         </button>
//         <button
//           className="text-[#6b6c70] text-xl p-2"
//           onClick={handleSendMessage}
//         >
//           <FiSend />
//         </button>
//       </div> */}

//       <div className="bg-white border-t border-gray-300 px-6 py-3 flex flex-wrap items-center gap-4">
//         {attachedFile && (
//           <div className="flex items-center gap-3 bg-gray-200 px-3 py-2 rounded-xl pr-8 relative w-full md:max-w-xs">
//             <div className="bg-gray-500 p-1 rounded-md">📄</div>
//             <div className="truncate">
//               <p className="text-sm font-semibold truncate">
//                 {attachedFile.name}
//               </p>
//               <p className="text-xs text-gray-600">Document</p>
//             </div>
//             <button
//               className="absolute top-2 right-2 text-sm"
//               onClick={handleRemoveFile}
//             >
//               ✕
//             </button>
//           </div>
//         )}

//         <div className="flex items-center w-full">
//           <input
//             type="text"
//             placeholder="Enter a prompt here..."
//             className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-600 py-2"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileUpload}
//             className="hidden"
//           />
//           <button
//             className="text-gray-700 text-xl ml-2"
//             onClick={() => fileInputRef.current.click()}
//           >
//             <FiUpload />
//           </button>
//           <button
//             className="text-[#6b6c70] text-xl ml-2"
//             onClick={handleSendMessage}
//           >
//             <FiSend />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatScreen;

import React, { useState, useRef } from "react";
import { FiSend, FiArrowLeft, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (newMessage.trim() || attachedFiles.length > 0) {
      const newMsg = {
        sender: "You",
        text: newMessage.trim(),
        time: "Just now",
        files: attachedFiles,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
      setAttachedFiles([]);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      name: file.name,
      type: file.type,
    }));
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const goBack = () => {
    navigate("/ai-agent");
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] text-black">
      {/* Header */}
      <div className="h-[64px] bg-white border-b border-gray-300 flex items-center px-6 gap-4">
        <FiArrowLeft
          className="text-xl cursor-pointer text-gray-700"
          onClick={goBack}
        />
        <h2 className="text-lg font-semibold text-black">Chat</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 overflow-auto space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-[#4d4d4d]">{msg.sender}</p>

            {msg.text && <p className="text-black mt-1">{msg.text}</p>}

            {msg.files?.length > 0 &&
              msg.files.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-4 py-1 mt-2 bg-gray-100 rounded-lg w-fit"
                >
                  <div className="bg-gray-700 p-2 rounded-lg">📄</div>
                  <div>
                    <p className="font-bold text-sm">{file.name}</p>
                    <p className="text-xs text-gray-600">Document</p>
                  </div>
                </div>
              ))}

            <p className="text-xs text-gray-400 mt-2">{msg.time}</p>
          </div>
        ))}
      </div>

      {/* Attachments Preview */}
      {attachedFiles.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-6 pt-3 flex items-center gap-2">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-200 px-3 py-2 rounded-xl pr-8 relative w-full md:max-w-xs mb-2"
            >
              <div className="bg-gray-500 p-1 rounded-md">📄</div>
              <div className="truncate">
                <p className="text-sm font-semibold truncate">{file.name}</p>
                <p className="text-xs text-gray-600">Document</p>
              </div>
              <button
                className="absolute top-2 right-2 text-sm"
                onClick={() => handleRemoveFile(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Chat Input Area */}
      <div className="h-[64px] bg-white border-t border-gray-300 flex items-center px-6 gap-4">
        <input
          type="text"
          placeholder="Enter a prompt here..."
          className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-600 py-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          multiple
        />

        <button
          className="text-gray-700 text-xl ml-2"
          onClick={() => fileInputRef.current.click()}
        >
          <FiUpload />
        </button>
        <button
          className="text-[#6b6c70] text-xl ml-2"
          onClick={handleSendMessage}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
