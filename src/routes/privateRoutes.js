import ROUTES from "./routes";
import ChatPage from "../pages/ChatPage/ChatPage";

const privateRoutes = [
  { path: ROUTES.CHAT_PAGE, exact: true, component: <ChatPage /> },
];

export default privateRoutes;
