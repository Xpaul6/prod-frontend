import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import styles from './NewHabit.module.css'

function NewHabit({ callRender, currentDate }) {
  let status = localStorage.getItem('status')
  let template = localStorage.getItem('template')
  if (template !== '') { 
    template = JSON.parse(template)
  }
  const [description, setDescription] = useState(template.title ? template.title : '')
  const [category, setCategory] = useState(template.category ? template.category : '')
  const [period, setPeriod] = useState(template.period ? template.period : '')
  const [value, setValue] = useState(template.targetValue ? template.targetValue : '')

  function addHabit() {
    status = localStorage.getItem('status')
    let date = currentDate
    let newHabit = {
      'id': Number(Date.now()),
      'title': description,
      'category': category,
      'addDate': date.toISOString(),
      'period': period,
      'targetValue': value
    }
    let currentData = JSON.parse(localStorage.getItem('data'))

    if (status == 'new') {
      currentData.habits = currentData.habits.concat([newHabit])
      localStorage.setItem('data', JSON.stringify(currentData))
      localStorage.setItem('template', '')
      callRender()
    } else if (status == 'edit') {
      template = JSON.parse(localStorage.getItem('template'))
      for (let i in currentData.habits) {
        if (currentData.habits[i].id == template.id) {
          newHabit.id = template.id
          newHabit.addDate = template.addDate
          currentData.habits[i] = newHabit
          break
        }
      }
      localStorage.setItem('data', JSON.stringify(currentData))
      localStorage.setItem('template', '')
      callRender()
    }
  }

  return (
    <>
    <div className={styles.newhabit}>
      <h2 className={styles.title}>{status == 'new' ? `New Habit` : `Edit Habit`}</h2>
      <form className={styles.form}>
        <label>Описание*</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Описание привычки'/>
        <label>Категория*</label>
        <input type="text" onChange={(e) => setCategory(e.target.value)} value={category} placeholder='Категория'/>
        <label>Период*</label>
        <div className={styles.periodbox}>
          <div>
            <input type="radio" name="period" value='daily' onChange={e => setPeriod(e.target.value)} checked={period == 'daily'}/>
            <label htmlFor='daily'>Ежедневно</label>
          </div>
          <div>
            <input type="radio" name="period" value='weekly' onChange={e => setPeriod(e.target.value)} checked={period == 'weekly'}/>
            <label htmlFor='weekly'>Еженедельно</label>
          </div>
          <div>
            <input type="radio" name="period" value='monthly' onChange={e => setPeriod(e.target.value)} checked={period == 'monthly'}/>
            <label htmlFor='monthly'>Ежемесячно</label>
          </div>
        </div>
        <label>Количество (опционально)</label>
        <input type="text" onChange={(e) => setValue(e.target.value)} value={value} placeholder='Количество'/>
      </form>
      {description && category && period ? 
        <Link onClick={addHabit} to={'/'} className={styles.submitbtn}>{`${status == 'new' ? 'Add' : 'Edit'} habit`}</Link> 
        : null}
    </div>
    </>
  )
}

export default NewHabit