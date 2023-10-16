import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
    return (
        <div>
            {/* <div>
                <div>Nav bar</div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="products">All Products</NavLink>
                <NavLink to="login">Log In/Sign Up</NavLink>
            </div> */}
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default RootLayout;