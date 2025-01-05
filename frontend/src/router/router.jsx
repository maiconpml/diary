import {
    createBrowserRouter,
} from "react-router-dom"

import { GuestHome, Home, Login, PrivateRoute, PublicRoute, Register } from "../components"

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <PublicRoute />,
            children: [
                {
                    path: "/",
                    element: <GuestHome/>,
                }
            ]
        },
        {
            path: "/",
            element: <PrivateRoute/>,
            children: [
                {
                    path: "/home",
                    element: <Home/>,
                },
                {
                    
                }
            ]
        },
    ]
)