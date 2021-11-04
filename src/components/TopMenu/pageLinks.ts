import Home from "../../assets/icons/svg/Grid";
import Chat from "../../assets/icons/svg/Chat";
import Contact from "../../assets/icons/svg/person";
import Notifications from "../../assets/icons/svg/Bell";
import Calendar from "../../assets/icons/svg/Calendar";
import Settings from "../../assets/icons/svg/Settings";
import ROUTES from "../../routes/routes";

export interface IPageLink {
  name: ROUTES;
  icon: ({ isActive }: { isActive: any }) => JSX.Element;
  link: ROUTES;
}

const pageLinks: IPageLink[] = [
  { name: ROUTES.HOME_PAGE, icon: Home, link: ROUTES.HOME_PAGE },
  { name: ROUTES.CHAT_PAGE, icon: Chat, link: ROUTES.CHAT_PAGE },
  { name: ROUTES.CONTACT_PAGE, icon: Contact, link: ROUTES.CONTACT_PAGE },
  {
    name: ROUTES.NOTIFICATIONS_PAGE,
    icon: Notifications,
    link: ROUTES.NOTIFICATIONS_PAGE,
  },
  { name: ROUTES.CALENDAR_PAGE, icon: Calendar, link: ROUTES.CALENDAR_PAGE },
  { name: ROUTES.SETTINGS_PAGE, icon: Settings, link: ROUTES.SETTINGS_PAGE },
];

export default pageLinks;
