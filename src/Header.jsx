import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header>
                <input type="checkbox" id="header-toggle" />
                <div className="logo">React Challenge</div>
                <ul className="links">
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/universities">
                            Universities
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/postal-lookup">
                            Postal lookup
                        </NavLink>
                    </li>
                </ul>
                <label htmlFor="header-toggle" className="icon-burger">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </label>
            </header>
        </>
    );

}

export default Header;