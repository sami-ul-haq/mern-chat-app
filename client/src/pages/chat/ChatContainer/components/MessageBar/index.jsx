import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";

const MessageBar = () => {
  const emojiRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  useEffect(() => {
    function handleClickOutsie(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsie);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsie);
    };
  }, [emojiRef]);

  const handleSendMessage = async () => {};

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Mesaage"
          value={message}
          onChange={() => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-500 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-500 transition-all"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
        </div>
        <div className="absolute bottom-16 right-0" ref={emojiRef}>
          <EmojiPicker
            theme="dark"
            open={emojiPickerOpen}
            autoFocusSearch={false}
            onEmojiClick={handleAddEmoji}
          />
        </div>
      </div>
      <button
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 
    hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-none focus:text-white duration-500 transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
