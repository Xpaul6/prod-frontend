import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'
import habistIcon from '../assets/list.png'
import profileIcon from '../assets/user_w.png'
import devIcon from '../assets/binary.png'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/" className={styles.item}>
          <img src={habistIcon} alt="" className={styles.img}/>
          <div>Привычки</div>
        </Link>
      </div>
      <div>
        <Link to="/profile" className={styles.item}>
          <img src={profileIcon} alt="" className={styles.img}/>
          <div>Профиль</div>
        </Link>
      </div>
      <div>
        <Link to='/dev' className={styles.item}>
          <img src={devIcon} alt="" className={styles.img} />
          <div>Dev Menu</div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar