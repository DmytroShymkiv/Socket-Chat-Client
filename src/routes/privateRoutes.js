import ROUTES from "./routes";
import ChatPage from "../pages/ChatPage/ChatPage";
import Empty from "../pages/EmptyPage/Empty";

const privateRoutes = [
  { path: ROUTES.CHAT_PAGE, exact: true, component: <ChatPage /> },
  { path: ROUTES.HOME_PAGE, exact: true, component: <Empty /> },
  { path: ROUTES.CONTACT_PAGE, exact: true, component: <Empty /> },
  { path: ROUTES.NOTIFICATIONS_PAGE, exact: true, component: <Empty /> },
  { path: ROUTES.CALENDAR_PAGE, exact: true, component: <Empty /> },
  { path: ROUTES.SETTINGS_PAGE, exact: true, component: <Empty /> },
];

export default privateRoutes;
