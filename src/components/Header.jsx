import {NavLink} from "react-router-dom";

export const Header = ({setAuth}) => {
    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <NavLink className={"navbar-brand"} to={"/"}>Evenqu</NavLink>

            <div className="navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className={"nav-link"} to={"/cars"}>Все автомобили</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={"nav-link"} to={"/carshowroom"}>Автосалоны</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={"nav-link"} to={"/about"}>О авторе</NavLink>
                    </li>
                </ul>
                <div style={{marginLeft: "auto"}}>
                    <NavLink className={"nav-link text-dark"} to={"/"}onClick={() => {
                        localStorage.setItem("login", "")
                        setAuth(false)
                    }}>Выход</NavLink>
                </div>
            </div>
        </div>
    </nav>)
}