import { useAppStore } from "@/store/Index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup your profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div>Chat</div>;
};

export default Chat;
