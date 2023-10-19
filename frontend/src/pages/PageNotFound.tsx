import { NavLink } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material"

const PageNotFound = () => {
    return (
        <div className="notfound__container">
            <div className="notfound__container__notfound">
                <div className="notfound__container__notfound__title">
                    <h1>404</h1>
                </div>
                <h2>The page you are looking for can not be found</h2>
                <div className="notfound__container__notfound__reroute">
                    <KeyboardBackspace fontSize="large" />
                    <NavLink to="/">Back to Home</NavLink>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;