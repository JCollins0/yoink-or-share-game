import { chatRroomNamespace, registerChat } from "./chat-room/chat-room.js";


export const createChatNamespace = (io) => {
    const chatNamespace = io.of(chatRroomNamespace)

    chatNamespace.on("connection", (socket) => {

        registerChat(io, chatNamespace, socket);

        console.log(`connect ${socket.id}`);

        socket.on("disconnect", (reason) => {
            console.log(`disconnect ${socket.id} due to ${reason}`);
        });
    })

}
