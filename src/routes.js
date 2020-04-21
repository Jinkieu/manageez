
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard";
import UserProfile from "./views/UserProfile/UserProfile";
import TableList from "./views/TableList/TableList";
import SignIn from "./components/Login/Login";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin"
    },
    {
        path: "/user",
        name: "Notification Alerts",
        icon: NotificationImportantIcon,
        component: UserProfile,
        layout: "/admin"
    },
    {
        path: "/table",
        name: "Human Resources",
        icon: Person,
        component: TableList,
        layout: "/admin"
    },
    {
        path: "/login",
        name : "Profile",
        icon: Person,
        component: SignIn,
        layout: "/admin"

    }
];

export default dashboardRoutes;
