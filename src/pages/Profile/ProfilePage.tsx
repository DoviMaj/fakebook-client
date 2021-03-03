import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

const ProfilePage = () => {
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
