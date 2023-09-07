import path from "path";
import RootLayout from "../layouts/RootLayout";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import LogIn from "../pages/LogIn";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<RootLayout />}
            errorElement={<PageNotFound />}
        >
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="login" element={<LogIn />} />
        </Route>
    )
);

export default Router;
