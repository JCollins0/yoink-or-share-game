export const chatRroomNamespace = "/chat";

const PROTOCOL = {
  SEND_CHAT: "chat:send"
}


export function registerChat (io, namespace, socket) {

  const sendChat = (payload) => {
    console.log(payload)
    namespace.emit(PROTOCOL.SEND_CHAT, payload)
  }

  socket.on("chat:send", sendChat);
}