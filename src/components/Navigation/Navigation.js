import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

export default function Navigation() {
    return (
        <div className={styles.navContainer}>
            <nav >
                <NavLink
                    exact
                    to="/"
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >Home</NavLink>

                <NavLink                
                    to="/movies"                
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >Movies</NavLink>
            </nav>
        </div>        
    );    
}