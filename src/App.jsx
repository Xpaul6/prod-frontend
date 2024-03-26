import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

import styles from './App.module.css'
import Navbar from './components/Navbar'
import Habits from './components/Habits'
import Profile from './components/Profile'
import Store from './components/Store'
import Devpanel from './components/Devpanel'
import NewHabit from './components/NewHabit'
import TemplatesList from './components/TemplatesList'


function App() {
  const [currentData, setCurrentData] = useState({'habits': [], 'actions': []})
  const [currentDate, setCurrentDate] = useState(new Date())
  const [categoryList, setCategoryList] = useState(new Set())
  const [currentStats, setCurrentStats] = useState([])

  function localStorageInit() {
    if (!localStorage.getItem('data')) {
      let data = {
        'habits': [],
        'actions': []
      }
      localStorage.setItem('data', JSON.stringify(data))
    }
    if (!localStorage.getItem('status')) {
      localStorage.setItem('status', 'new')
    }
    if (!localStorage.getItem('template')) {
      localStorage.setItem('template', '')
    }
    if (!localStorage.getItem('stats')) {
      localStorage.setItem('stats', JSON.stringify([]))
    }
    if (!localStorage.getItem('balance')) {
      localStorage.setItem('balance', 0)
    }
    if (!localStorage.getItem('levelPoints')) {
      localStorage.setItem('levelPoints', 0)
    }
    if (!localStorage.getItem('themes')) {
      localStorage.setItem('themes', JSON.stringify([]))
    }
  }

  function render() {
    let data = JSON.parse(localStorage.getItem('data'))
    for (let i in data.habits) {
      if (!data.habits[i].isCompleted) {
        data.habits[i].isCompleted = 0
      }
    }
    localStorage.setItem('data', JSON.stringify(data))
    setCurrentData(JSON.parse(localStorage.getItem('data')))
  }

  function updateCategoryList() {
    let data = JSON.parse(localStorage.getItem('data'))
    let categories = new Set()
    for (let i of data.habits) {
      categories.add(i.category !== '' && i.category)
    }
    setCategoryList(categories)
  }

  function calculateStats() {
    let stats = []
    for (let c of categoryList) {
      let all = 0
      let done = 0
      for (let j in currentData.actions) {
        if (currentData.habits.find(habit => habit.id == currentData.actions[j].id).category == c) {
          done++
        }
      }
      for (let j in currentData.habits) {
        if (currentData.habits[j].category == c) {
          let timeDelta = currentDate - new Date(currentData.habits[j].addDate)
          switch (currentData.habits[j].period) {
            case 'daily': 
              all = all + Math.floor(timeDelta/1000/60/60/24)
              break
            case 'weekly':
              all = all + Math.floor(timeDelta/1000/60/60/24/7)
              break
            case 'monthly':
              all = all + Math.floor(timeDelta/1000/60/60/24/30)
              break
          }
        }
      }
      stats.push({'category': c, 'done': done, 'all': all})
    }
    localStorage.setItem('stats', JSON.stringify(stats))
    setCurrentStats(stats)
  }

  function updateBalanceAndLevel() {
    let data = JSON.parse(localStorage.getItem('data'))
    let currentBalance = localStorage.getItem('balance')
    let currentLevelPoints = localStorage.getItem('levelPoints')
    if (currentBalance == 0) {
      currentBalance = data.actions.length * 20
    }
    currentLevelPoints = data.actions.length * 20
    localStorage.setItem('balance', currentBalance)
    localStorage.setItem('levelPoints', currentLevelPoints)
  }

  function addToBalance() {
    let currentBalance = localStorage.getItem('balance')
    let currentLevelPoints = localStorage.getItem('levelPoints')
    currentBalance = Number(currentBalance) + 20
    currentLevelPoints = Number(currentLevelPoints) + 20
    localStorage.setItem('balance', currentBalance)
    localStorage.setItem('levelPoints', currentLevelPoints)
  }

  function loadFileData(fileData) {
    let data = JSON.parse(localStorage.getItem('data'))
    data.habits = data.habits.concat(fileData.habits)
    data.actions = data.actions.concat(fileData.actions)
    localStorage.setItem('data', JSON.stringify(data))
    render()
  }

  function overrideDate(newDate) {
    setCurrentDate(newDate)
  }

  useEffect(localStorageInit, [])
  useEffect(render, [])
  useEffect(updateCategoryList, [currentData])
  useEffect(calculateStats, [categoryList])
  useEffect(updateBalanceAndLevel, [currentData])
  return (
    <>
    <h1 className={styles.title}>Трекер привычек</h1>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <Routes>
            <Route path='/' element={<Habits data={currentData} callRender={render} currentDate={currentDate} onCompletion={addToBalance} />}></Route>
            <Route path='/profile' element={<Profile stats={currentStats} />}></Route>
            <Route path='/store' element={<Store />}></Route>
            <Route path='/dev' element={<Devpanel onFileLoad={loadFileData} currentDate={currentDate} overrideDate={overrideDate} callRender={render} />}></Route>
            <Route path='/new' element={<NewHabit callRender={render} currentDate={currentDate} />}></Route>
            <Route path='/templates' element={<TemplatesList />}></Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
