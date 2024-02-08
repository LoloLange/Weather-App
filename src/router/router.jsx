import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Search from "../components/Search/search";
import WeatherApp from "../views/WeatherApp/weatherapp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Search />,
    },
    {
        path: '/weather/:searchInput',
        element: <WeatherApp />,
    }
]);


const MyRoutes = () => <RouterProvider router={router} />

export default MyRoutes