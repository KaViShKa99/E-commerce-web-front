import HomeView from "./views/Home";
import MyProfileView from "./views/account/MyProfile";
import CartView from "./views/cart/Cart";
import ProductDetailView from "./views/product/Detail";

export const routes = [

    {
        name: "Profile",
        element: <MyProfileView />,
        path: "/account/profile",
    },

    {
        name: "CartView",
        element: <CartView />,
        path: "/cart"
    },

    {
        name: "ProjectDetails",
        element: <ProductDetailView />,
        path: "/product/detail/:id",
    },
];
