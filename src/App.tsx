import { FC } from "react";
import AuthProvider from "./contexts/AuthContext";
import ChatsProvider from "./contexts/ChatsContext";
import SocketProvider from "./contexts/SocketContext/SocketContext";
import UIProvider from "./contexts/UIContext";
import Router from "./routes/Router";
import BuildProviderTree from "./utils/buildProvidersTree";

const providers: FC[] = [AuthProvider, ChatsProvider, SocketProvider, UIProvider];
const Providers = BuildProviderTree(providers);

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;
