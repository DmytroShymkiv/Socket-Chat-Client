import React from "react";

import AuthProvider from "./contexts/AuthContext";
import ChatsProvider from "./contexts/ChatsContext";
import Router from "./routes/Router";

function App() {
  return (
    <AuthProvider>
      <ChatsProvider>
        <Router />
      </ChatsProvider>
    </AuthProvider>
  );
}

export default App;
