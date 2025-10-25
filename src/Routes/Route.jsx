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
import MyJoinedEvents from "../Pages/MyJoinedEvent/MyJoinedEvents";
import CreateEvent from "../Pages/CeateEvent/CreateEvent";
import ManageMyEvents from "../Pages/ManageMyEvent/ManageMyEvents";
import UpdateMyEvent from "../Pages/ManageMyEvent/UpdateMyEvent/UpdateMyEvent";
import Error from "../Component/Error";
import Reviews from "../Pages/Reviews/Reviews";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    errorElement: <Error></Error>,
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
            path:"/reviews",
            Component: Reviews
        },
        {
            path: '/events/:id',
            element: <EventDetails></EventDetails>,
            loader: ({params})=> fetch(`https://social-management-server.vercel.app/events/${params.id}`)
        },
        {
            path: '/myJoinedEvents',
            element: <PrivateRoute><MyJoinedEvents></MyJoinedEvents></PrivateRoute>
        },
        {
            path:'/createEvents',
            element: <PrivateRoute><CreateEvent></CreateEvent></PrivateRoute>
        },
        {
            path: '/manageMyEvents',
            element: <PrivateRoute><ManageMyEvents></ManageMyEvents></PrivateRoute>
        },
        {
            path: '/updateMyEvent/:id',
            loader: ({params}) => fetch(`https://social-management-server.vercel.app/events/${params.id}`),
            element: <PrivateRoute><UpdateMyEvent></UpdateMyEvent></PrivateRoute>
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