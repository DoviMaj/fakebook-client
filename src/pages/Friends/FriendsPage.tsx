import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const FriendsPage = () => {
  useEffect(() => {
    document.title = "Fakebook | Friends";
  }, []);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default FriendsPage;
