import { useAppStore } from "@/store/Index";
import { useState } from "react";

const Profile = () => {
  const { userInfo } = useAppStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setselectedColor] = useState("");

  console.log(userInfo);

  return (
    <div>
      Profile
      <h1>Email: {userInfo.email}</h1>
    </div>
  );
};

export default Profile;
