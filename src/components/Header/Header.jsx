import { NavLink } from "react-router";
import './header.css';
const Header = () => {
    return (
        <header>
            <h1>HR App</h1>
            <nav>
                <ul>
                    <li >
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/add">Add new employee</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;