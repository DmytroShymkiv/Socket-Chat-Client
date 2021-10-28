import React from "react";

import AuthProvider from "./contexts/AuthContext";
import ChatsProvider from "./contexts/ChatsContext";
import SocketProvider from "./contexts/SocketContext/SocketContext";
import UIProvider from "./contexts/UIContext";
import Router from "./routes/Router";

function App() {
  return (
    <AuthProvider>
      <ChatsProvider>
        <SocketProvider>
          <UIProvider>
            <Router />
          </UIProvider>
        </SocketProvider>
      </ChatsProvider>
    </AuthProvider>
  );
}

export default App;
