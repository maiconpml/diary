import {
    createBrowserRouter,
} from "react-router-dom"

import { Home, Login, PrivateRoute, PublicRoute, Register } from "../components"

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <PrivateRoute/>,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
            ]
        },
        {
            path: "/",
            element: <PublicRoute />,
            children: [
                {
                    path: "/login",
                    element: <Login/>,
                },
                {
                    path: "/register",
                    element: <Register/>,
                },   
            ]
        }
    ]
)