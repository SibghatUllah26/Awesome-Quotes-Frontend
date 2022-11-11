import classes from "./MainNavigation.module.css"
import {NavLink} from "react-router-dom"

function MainNavigation(){
    return(
        <header className={classes.header}>
            <div className={classes.logo}>Awesome Quotes</div>
            <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink to="/quotes" activeClassName={classes.active}>All Quotes</NavLink>
                </li>
                <li>
                    <NavLink to="/addQuote" activeClassName={classes.active}>Add New Quotes</NavLink>
                </li>
            </ul>
            </nav>
        </header>
    )
}

export default MainNavigation