import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const getCurrentUserId = async () => {
  const req = await fetch("http://localhost:5000/api/me", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const user = await req.json();
  return user._id;
};

socket.on("connect", async () => {
  const currentUserId = await getCurrentUserId();
  socket.emit("logged-in", currentUserId);
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnected");
});
