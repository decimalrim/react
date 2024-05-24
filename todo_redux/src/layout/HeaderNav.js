import { NavLink } from "react-router-dom";

export default function HeaderNav() {
  return (
    <header>
      <nav className="menu-navigation">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/todo">Todo</NavLink>
          </li>
          <li>
            <NavLink to="/forum">Forum</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
