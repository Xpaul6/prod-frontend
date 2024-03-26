import styles from './Profile.module.css'
import pfp from '../assets/user.png'
import chocoIcon from '../assets/choco-balls.png'

import { Link } from 'react-router-dom'
import { Circle } from 'rc-progress' 
import { useEffect, useState } from 'react'

function Profile({ stats }) {
  const [levelPoints, setLevelPoints] = useState(Number(localStorage.getItem('levelPoints')))
  const [level, setLevel] = useState()
  const [levelProgress, setLevelProgress] = useState()
  const [balance, setBalance] = useState(Number(localStorage.getItem('balance')))

  function calcLevel() {
    setLevel(Math.ceil(levelPoints / 100) + 1)
    setLevelProgress(levelPoints % 100 == 0 ? 
      levelPoints - (Math.ceil(levelPoints / 100) * 100) 
      : levelPoints - ((Math.ceil(levelPoints / 100) - 1) * 100))
  }

  useEffect(calcLevel, [])

  return (
    <div className={styles.profile}>
      <img src={pfp} alt="Profile picture" className={styles.pfp} />
      <div className={styles.card}>
        <h3 className={styles.cardtitle}>Уровень {level}</h3>
        <div className={styles.progressbar}>
          <div className={styles.progressbarfiller} style={{'width':`${levelProgress}%`}}></div>
          <span>{levelProgress}%</span>
        </div>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardtitle}>Статистика</h3>
        <div className={styles.statlist}>
          {stats.map(c => <Graph key={c.category} category={c.category} percentage={Math.round(c.done/c.all*100)}/>)}
        </div>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardtitle}>Магазин</h3>
        <div className={styles.storemenu}>
          <div className={styles.balance}>
            Баланс: 
            <span>{balance}</span>
            <img src={chocoIcon} alt='cr'/>
          </div>
          <Link to='/store' className={styles.storebtn}>Купить</Link>
        </div>
      </div>
    </div>
  )
}

function Graph({ category, percentage }) {
  if ((percentage < 0) || (percentage > 100) || isNaN(percentage)) {
    percentage = 0
  }
  return (
    <>
      <div className={styles.statitem}>
        <h4>{category}</h4>
        <div className={styles.circle}>
          <Circle percent={percentage} strokeWidth={5} trailWidth={1} strokeColor='#ffffff'/>
          <span>{percentage}%</span>
        </div>
      </div>
    </>
  )
}

export default Profile