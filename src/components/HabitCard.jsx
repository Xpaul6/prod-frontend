import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import styles from './HabitCard.module.css'
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'
import completeIcon from '../assets/basic-tick.png'

function HabitCard({data, callRender, currentDate, onCompletion}) {
  const [isCompleted, setIsCompleted] = useState(data.isCompleted ? true : false)
  const [showDeleteOptions, setShowDeleteoptions] = useState(false) // может быть верну 2 способа удаления

  let deadline
  let deadlineDate
  let addDate = new Date(data.addDate)
  // все последующие "страшные" вычисления - перевод из миллисекунд в дни, ловкость рук и никакой магии
  switch (data.period) {
    case 'daily':
      deadlineDate = new Date(addDate.setDate(addDate.getDate() + (Math.ceil((currentDate - addDate)/1000/60/60/24))))
      deadline = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).format(deadlineDate)
      break
    case 'weekly':
      deadlineDate = new Date(addDate.setDate(addDate.getDate() + ((Math.ceil((currentDate - addDate)/1000/60/60/24/7)))*7))
      deadline = new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'short'
      }).format(deadlineDate)
      break
    case 'monthly':
      deadlineDate = new Date(addDate.setDate(addDate.getDate() + ((Math.ceil((currentDate - addDate)/1000/60/60/24/30)))*30))
      deadline = new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'short'
      }).format(deadlineDate)
      break
  }
  if (!isCompleted) {
    localStorage.setItem(`dl${data.id}`, String(deadlineDate))
  }

  function handleEdit() {
    localStorage.setItem('status', 'edit')
    localStorage.setItem('template', JSON.stringify(data))
  }

  // function handleDelete() {
  //   setShowDeleteoptions(prev => !prev)
  // }

  // function handleSimpleDelete() {
  //   let currentData = JSON.parse(localStorage.getItem('data'))
  //   for (let i in currentData.habits) {
  //     if (currentData.habits[i].id == data.id) {
  //       currentData.habits.splice(i, 1)
  //       break
  //     }
  //   }
  //   localStorage.setItem('data', JSON.stringify(currentData))
  // }

  function handleHardDelete() { 
    let currentData = JSON.parse(localStorage.getItem('data'))
    for (let i in currentData.habits) {
      if (currentData.habits[i].id == data.id) {
        currentData.habits.splice(i, 1)
        break
      }
    }
    currentData.actions = currentData.actions.filter(el => el.id != data.id)
    localStorage.setItem('data', JSON.stringify(currentData))
    callRender()
  }

  function handleComplete() {
    setIsCompleted(prev => !prev)
    let currentData = JSON.parse(localStorage.getItem('data'))
    currentData.actions.push({'id': data.id, 'date': (new Date()).toISOString()})
    currentData.habits.find(habit => habit.id == data.id).isCompleted = 1
    localStorage.setItem('data', JSON.stringify(currentData))
    callRender()
    onCompletion()
  }

  useEffect(() => {
    if (currentDate > new Date(localStorage.getItem(`dl${data.id}`))) {
      let currentData = JSON.parse(localStorage.getItem('data'))
      currentData.habits.find(habit => habit.id == data.id).isCompleted = 0
      setIsCompleted(false)
      localStorage.setItem('data', JSON.stringify(currentData))
      callRender()
    }
  }, [currentDate])

  return (
    <div className={`${styles.card} ${isCompleted ? styles.completed : null}`}>
      <div className={styles.infobox}>
        <div className={styles.description}>{data.title}{data.targetValue ? `: ${data.targetValue}` : null}</div>
        <div className={styles.info}>
          <div className={styles.category}>{data.category}</div>
          <div className={styles.deadline}>{deadline}</div>
        </div>
      </div>
      {showDeleteOptions &&
        <div className={styles.deleteblock}>
          <button onClick={handleSimpleDelete}>Delete</button>
          <button onClick={handleHardDelete}>Delete history</button>
        </div>
      } 
      {!showDeleteOptions &&
        <div className={styles.inputbox}>
          {!isCompleted && 
          <>
            <Link className={styles.btn} onClick={handleEdit} to='/new'>
              <img src={editIcon} alt="" />
            </Link>
            <button className={styles.btn} onClick={handleHardDelete}>
              <img src={deleteIcon} alt="" />
            </button>
            <button className={styles.btn} onClick={handleComplete}>
              <img src={completeIcon} alt="" />
            </button>
          </> 
          }
          {isCompleted && 
          <div>Готово</div>
          }
      </div>
      }
    </div>
  )
}

export default HabitCard