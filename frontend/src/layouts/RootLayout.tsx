import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div>
            <div>
                <div>Nav bar</div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="products">All Products</NavLink>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout;