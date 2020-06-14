import React from 'react'
import { shape, string, func, bool } from 'prop-types'
import { connect } from 'react-redux'
import { deleteTodo, getTodos as getTodosAction, deleteTodoReset} from '../../store/actions'
import styles from './todo.module.css'

function Todo({ todo, deleteTodos, getTodos, success, reset }) {
  console.log(todo.id)
  React.useEffect(() => {
    if (success) getTodos()
    return () => {
      reset()
    }
  }, [getTodos, reset, success])

  const deleteItem = (e) => {
    e.preventDefault()
    deleteTodos(todo.id)
  }

  return (
    <div className={styles['todo-item']}>
      <div>{todo.text}</div>
      <div className={styles.desc}>{todo.description || 'Описание отсутствует'}</div>
      <button type="button" onClick={deleteItem}>Удалить</button>
    </div>
  )
}

Todo.propTypes = {
  todo: shape({
    id: string.isRequired,
    text: string.isRequired,
    description: string,
  }),
  deleteTodos: func,
  getTodos: func,
  success: bool,
  error: string,
}

const mapStateToProps = (state) => ({
  loading: state.todo.delete.loading,
  success: state.todo.delete.success,
  failed: state.todo.delete.failed,
  error: state.todo.delete.error,
})

const mapDispatchToProps = (dispatch) => ({
  deleteTodos: (data) => dispatch(deleteTodo(data)),
  getTodos: () => dispatch(getTodosAction()),
  reset: () => dispatch(deleteTodoReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
