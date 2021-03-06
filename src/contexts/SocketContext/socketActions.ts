enum Actions {
  ServerSendMessage = "server-send-message",
  ServerDeleteMessage = "server-delete-message",
  ServerUpdateMessage = "server-update-message",
  ServerCreateRoom = "server-create-room",
  ServerStartWriting = "server-start-writing",
  ServerStopWriting = "server-stop-writing",
  ServerReadMessage = "server-read-message",
  ServerJoinRoom = "server-join-room",
  ServerDeleteRoom = "server-delete-room",

  ClientError = "client-error",
  ClientMessage = "client-message",
  ClientConnection = "client-connection",
  ClientDeleteMessage = "client-delete-message",
  ClientUpdate = "client-update-message",
  ClientJoin = "client-join",
  ClientLeave = "client-leave",
  ClientCreateRoom = "client-create-room",
  ClientStartWriting = "client-start-writing",
  ClientStopWriting = "client-stop-writing",
  ClientReadMessage = "client-read-message",
  ClientDeleteRoom = "client-delete-room",
}

export default Actions;
