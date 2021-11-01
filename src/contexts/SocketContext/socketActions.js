const Actions = {
  ServerSendMessage: "server-send-message",
  ServerDeleteMessage: "server-delete-message",
  ServerUpdateMessage: "server-update-message",
  ServerCreateRoom: "server-create-room",
  ServerStartWriting: "server-start-writing",
  ServerStopWriting: "server-stop-writing",

  ClientError: "client-error",
  ClientMessage: "client-message",
  ClientConnection: "client-connection",
  ClientDeleteMessage: "client-delete-message",
  ClientUpdate: "client-update-message",
  ClientJoin: "client-join",
  ClientLeave: "client-leave",
  ClientCreateRoom: "client-create-room",
  ClientStartWriting: "client-start-writing",
  ClientStopWriting: "client-stop-writing",
};

export default Actions;
