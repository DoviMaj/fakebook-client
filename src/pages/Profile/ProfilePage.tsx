import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

const ProfilePage: React.FC = () => {
  useEffect(() => {
    document.title = "Fakebook | Profile";
  }, []);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default ProfilePage;
