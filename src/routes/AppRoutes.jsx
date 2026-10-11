import { Route, Routes } from "react-router";

import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Categories from "@/pages/Categories";
import Cart from "@/pages/Cart";
import Wishlist from "@/pages/Wishlist";
import Checkout from "@/pages/Checkout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Orders from "@/pages/Orders";
import OrderSummary from "@/pages/OrderSummary";
import OrderConfirmation from "@/pages/OrderConfirmation";
import NotFound from "@/pages/NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />

                <Route path="/products" element={<Products />} />

                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/categories"
                    element={<Categories />}
                />

                <Route path="/cart" element={<Cart />} />

                <Route
                    path="/wishlist"
                    element={<Wishlist />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/order-summary"
                    element={<OrderSummary />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />

                <Route
                    path="/order-confirmation"
                    element={<OrderConfirmation />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;