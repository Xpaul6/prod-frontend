import { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Habits.module.css'
import HabitCard from './HabitCard'

function Habits({data, callRender, currentDate, onCompletion}) {
  const [plusState, setPlusState] = useState(false)

  function handlePlus() {
    setPlusState(true)
  }

  function handleNew() {
    localStorage.setItem('status', 'new')
  }

  return (
    <>
    <div className={styles.habits}>
      <h2 className={styles.title}>Мои привычки</h2>
      <h3 className={styles.listtitle}>Сегодня</h3>
      <ul className={styles.list}>
        {data && data.habits.map(x => x.period == 'daily' ? <li key={x.id}><HabitCard data={x} currentDate={currentDate} callRender={() => callRender()} onCompletion={() => onCompletion()}/></li> : null)}
      </ul>
      <h3 className={styles.listtitle}>Эта неделя</h3>
      <ul className={styles.list}>
        {data && data.habits.map(x => x.period == 'weekly' ? <li key={x.id}><HabitCard data={x} currentDate={currentDate} callRender={() => callRender()} onCompletion={() => onCompletion()}/></li> : null)}
      </ul>
      <h3 className={styles.listtitle}>Этот месяц</h3>
      <ul className={styles.list}>
      {data && data.habits.map(x => x.period == 'monthly' ? <li key={x.id}><HabitCard data={x} currentDate={currentDate} callRender={() => callRender()} onCompletion={() => onCompletion()}/></li> : null)}
      </ul>
    </div>
    <div className={styles.btnblock}>
      <button className={`${styles.addbtn} ${plusState ? styles.hidden : styles.visible}`} onClick={handlePlus}>+</button>
      <Link to={'/new'} className={`${styles.addbtn} ${plusState ? styles.visible: styles.hidden}`} onClick={handleNew}>
        <div>Новая привычка</div>
      </Link>
      <Link to={'/templates'} className={`${styles.addbtn} ${plusState ? styles.visible: styles.hidden}`}>Выбрать шаблон</Link>
    </div>
    </>   
  )
}

export default Habits
