function Devpanel({onFileLoad, currentDate, overrideDate, callRender}) {
  function fileUpload(e) {
    const reader = new FileReader()
    let data
    reader.addEventListener('load', (evnt) => {
      const result = evnt.target.result
      data = JSON.parse(result)
      onFileLoad(data)
    })
    reader.readAsText(e.target.files[0])
  }

  function dateChange(e) {
    overrideDate(new Date(e.target.value))
    callRender()
  }

  return (
    <div>
      <h1>Dev menu</h1>
      <label>Загрузить данные из фаила - </label>
      <input type="file" onChange={fileUpload}/> <br />
      <label>Текущая дата: {currentDate.toISOString()}</label> <br />
      <label>Установить текущую дату - </label>
      <input type="date" onChange={dateChange}/> <br />
      <label >Чтобы сбросить приложение - </label>
      <button onClick={() => localStorage.clear()}>нажать тут</button>
      <label > и F5</label>
    </div>
  )
}

export default Devpanel