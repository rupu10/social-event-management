import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayOut from "../Pages/layOuts/RootLayOut";
import Home from "../Pages/Home/Home";
import UpComingEvents from "../Pages/UpComingEvents/UpComingEvents";
import SignUp from "../Pages/Register/SignUp";
import LogIn from "../Pages/Register/LogIn";
import EventDetails from "../Pages/EventDetails/EventDetails";
import PrivateRoute from "./PrivateRoute";

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
            path: '/events/:id',
            element: <PrivateRoute><EventDetails></EventDetails></PrivateRoute>,
            loader: ({params})=> fetch(`http://localhost:7000/events/${params.id}`)
        },
        {
            path: '/joinEvent/:id',
            element: <PrivateRoute></PrivateRoute>
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