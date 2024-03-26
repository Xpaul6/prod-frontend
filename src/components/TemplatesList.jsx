import React from 'react'
import { Link } from 'react-router-dom'

import selectIcon from '../assets/basic-tick.png'
import styles from './TemplatesList.module.css'

const templates = [
  {
    'listid': 0,
    'title': 'Пройти шагов',
    'targetValue': 1000,
    'category': 'Здоровье',
    'period': 'daily'
  },
  {
    'listid': 1,
    'title': 'Ложиться спать до 23:00',
    'category': 'Здоровье',
    'period': 'daily'
  },
  {
    'listid': 2,
    'title': 'Читать страниц',
    'targetValue': 50,
    'category': 'Саморазвитие',
    'period': 'daily'
  },
  {
    'listid': 3,
    'title': 'Прогуляться',
    'category': 'Здоровье',
    'period': 'daily'
  },
]

const dict = {
  'daily': 'Ежедневно',
  'weekly': 'Еженедельно',
  'monthly': 'Ежемесячно'
}

function TemplatesList() {
  function handleTemplateSelect(e) {
    localStorage.setItem('status', 'new')
    localStorage.setItem('template', JSON.stringify(templates[e.target.id]))
  }

  return (
    <div className={styles.templateslist}>
      <h2 className={styles.title}>Выберите шаблон</h2>
      <ul className={styles.list}>
        {templates.map((el) => 
          <li key={el.listid} className={styles.item}>
            <div>
              <div className={styles.section}>{`Описание: ${el.title}`}</div>
              {el.targetValue && <div className={styles.section}>{`Target value: ${el.targetValue}`}</div>}
              <div className={styles.section}>{`Категория: ${el.category}`}</div>
              <div className={styles.section}>{`Период: ${dict[el.period]}`}</div>
            </div>
            <Link to={'/new'}onClick={handleTemplateSelect} className={styles.btn}>
              <img id={el.listid} className={styles.icon} src={selectIcon} alt="Select"/>
            </Link>
          </li>
        )}
      </ul>
      <Link to={'/'} className={styles.backbtn}>Назад</Link>
    </div>
  )
}

export default TemplatesList