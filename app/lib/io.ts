"use client";

import { io } from "socket.io-client";

const PORT_NUMBER = process.env.NEXT_PUBLIC_PORT_NUMBER;
const PORT = process.env.NEXT_PUBLIC_PORT_NUMBER;

export const client = io(`wss://monkeysforge.com`, {
  autoConnect: false,
});
