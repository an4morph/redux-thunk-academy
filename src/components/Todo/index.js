import React from 'react'
import { shape, string } from 'prop-types'
import styles from './todo.module.css'

function Todo({ todo }) {
  return (
    <div className={styles['todo-item']}>
      <div>{todo.text}</div>
      <div className={styles.desc}>{todo.description || 'Описание отсутствует'}</div>
    </div>
  )
}

Todo.propTypes = {
  todo: shape({
    id: string.isRequired,
    text: string.isRequired,
    description: string,
  }),
}

export default Todo
