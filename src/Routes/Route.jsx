import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayOut from "../Pages/layOuts/RootLayOut";
import Home from "../Pages/Home/Home";
import UpComingEvents from "../Pages/UpComingEvents/UpComingEvents";
import SignUp from "../Pages/Register/SignUp";
import LogIn from "../Pages/Register/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: "/upComingEvents",
            Component: UpComingEvents
        },
        {
            path:"/signUp",
            Component: SignUp
        },
        {
            path:"/logIn",
            Component: LogIn
        }
    ]
  },
]);

export default router;