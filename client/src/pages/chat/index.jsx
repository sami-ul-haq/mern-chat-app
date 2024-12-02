import { useAppStore } from "@/store/Index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./ContactsContainer";
import EmptyChat from "./EmptyChat";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup your profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer />
      <EmptyChat />
      <ChatContainer />
    </div>
  );
};

export default Chat;
