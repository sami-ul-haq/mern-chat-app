import { useAppStore } from "@/store/Index";

const Profile = () => {
  const { userInfo } = useAppStore();
  console.log(userInfo);

  return (
    <div>
      Profile
      <h1>Email: {userInfo.email}</h1>
    </div>
  );
};

export default Profile;
