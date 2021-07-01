import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SocketIOClient from "socket.io-client";
import axiosInstance from "Utility/axios";

interface SocketProps {}

const uid0 = "60c8570621e652519444bc63";
const uid1 = "60c45607557263034f99a23d";
const createSocket = async (id: string) => {
  let res = await axiosInstance.post(
    `https://application.swanoogie.me/api/messages/t/${id}`
  );
  // console.log(res);
};
interface Params {
  uid: string;
}
export const Socket: React.FC<SocketProps> = ({}) => {
  const params: Params = useParams();
  const socket = SocketIOClient("https://application.swanoogie.me");
  socket.on("chat-message", (msg) => {
    // console.log(msg);
  });
  useEffect(() => {
    createSocket(params.uid);
    socket.emit("send-chat-message", "Hello");
  }, []);
  return (
    <div className="Socket">
      <input type="text" />
      {/* <button></button> */}
      <span
        onClick={() => {
          socket.emit("send-chat-message", "GG");
        }}
      >
        send
      </span>
    </div>
  );
};
