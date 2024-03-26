import styles from './Store.module.css'
import chocoIcon from '../assets/choco-balls.png'
import selectIcon from '../assets/basic-tick.png'

import { useEffect, useState } from 'react'

let themesList = [
  {
    'id': 0,
    'colorBg': '#e8eef1',
    'colorPrimary': '#057dcd',
    'colorLightened': '#43b0f1',
    'colorDarkened': '#1e3d58',
    'colorText': '#00022f',
    'price': 0,
    'isBought': 1
  },
  {
    'id': 1,
    'colorBg': '#e8eef1',
    'colorPrimary': '#31e834',
    'colorLightened': '#61f56c',
    'colorDarkened': '#18b811',
    'colorText': '#00022f',
    'price': 200,
    'isBought': 0
  },
  {
    'id': 2,
    'colorBg': '#e8eef1',
    'colorPrimary': '#db1f3b',
    'colorLightened': '#fb898c',
    'colorDarkened': '#ae0a2c',
    'colorText': '#00022f',
    'price': 500,
    'isBought': 0
  }
]

function Store() {
  const [currentThemesList, setCurrentThemesList] = useState(themesList)

  function buyTheme(e) {
    let balance = Number(localStorage.getItem('balance'))
    let themes = JSON.parse(localStorage.getItem('themes'))
    if (balance >= themes.find(theme => theme.id == e.target.id).price) {
      balance = balance - themes.find(theme => theme.id == e.target.id).price
      themes.find(theme => theme.id == e.target.id).isBought = 1
    }
    localStorage.setItem('balance', balance)
    localStorage.setItem('themes', JSON.stringify(themes))
    setCurrentThemesList(JSON.parse(localStorage.getItem('themes')))
  }

  function setTheme(e) {
    let root = document.querySelector(':root')
    let theme = currentThemesList.find(theme => theme.id == e.target.id)
    root.style.setProperty('--color-bg', theme.colorBg)
    root.style.setProperty('--color-primary', theme.colorPrimary)
    root.style.setProperty('--color-lightened', theme.colorLightened)
    root.style.setProperty('--color-darkened', theme.colorDarkened)
    root.style.setProperty('--color-text', theme.colorText)
  }

  useEffect(() => {
    if (localStorage.getItem('themes') == '[]') {
      localStorage.setItem('themes', JSON.stringify(JSON.parse(localStorage.getItem('themes')).concat(themesList)))
    }
    setCurrentThemesList(JSON.parse(localStorage.getItem('themes')))
  },[])
  return (
    <div className={styles.store}>
      <h2 className={styles.title}>Магазин</h2>
      {currentThemesList.map(el => 
        <div key={el.id} className={styles.item}>
          <div className={styles.showbox}>
            <div style={{'backgroundColor':`${el.colorLightened}`}}></div>
            <div style={{'backgroundColor':`${el.colorPrimary}`}}></div>
            <div style={{'backgroundColor':`${el.colorDarkened}`}}></div>
          </div>
          {el.isBought ?
            <button id={el.id} onClick={setTheme}><img id={el.id} src={selectIcon} alt=''/></button>
            :
            <button id={el.id} onClick={buyTheme}>{el.price}<img id={el.id} src={chocoIcon} alt='cr'/></button>
          }
        </div>
      )}
    </div>
  )
}

export default Store