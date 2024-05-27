import Catalog from "../pages/Catalog";
import AuthPage from "../pages/AuthPage";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import WishList from "../pages/WishList";


export const privateRoutes = [
    {path: '/catalog', element: <Catalog/>},
    {path: '/home', element: <Home/>},
    {path: '/wishlist', element: <WishList/>},
    {path: '/cart', element: <Cart/>},
    // {path: '/bookInfo', element: <BookInfo/>},
    {path: '/profile', element: <Profile/>}
]

export const publicRoutes = [
    {path: '/auth', element: <AuthPage/>},
]