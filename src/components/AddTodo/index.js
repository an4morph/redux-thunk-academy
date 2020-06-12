import React from 'react'
import styles from './add.module.css'

const endpoint = 'http://localhost:3030'
const errorHandler = (error) => (error.response ? error.response.data : error.message)

function AddTodoForm() {
  const [text, setText] = React.useState('')
  const [description, setDesc] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const [error, setError] = React.useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    fetch(`${endpoint}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, description }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('ошибка добавления')
        setLoading(false)
        return response.json()
      })
      .catch((err) => {
        setLoading(false)
        setFailed(true)
        setError(errorHandler(err))
      })
  }

  return (
    <form className={styles.form}>
      <input
        type="text"
        placeholder="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
      />
      {failed && <div>Ошибка: {error}</div>}
      {
        loading
          ? <div>Загрузка...</div>
          : (
            <button
              type="button"
              onClick={handleClick}
            >Добавить
            </button>
          )
      }
    </form>
  )
}

export default AddTodoForm
