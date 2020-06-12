import React from 'react'
import { connect } from 'react-redux'
import { func, bool, string } from 'prop-types'
import { addTodo as addTodoAction, getTodos as getTodosAction, addTodoReset } from '../../store/actions'
import styles from './add.module.css'

function AddTodoForm({ addTodo, success, getTodos, loading, failed, error, reset }) {
  const [text, setText] = React.useState('')
  const [description, setDesc] = React.useState('')

  React.useEffect(() => {
    if (success) getTodos()
    return () => {
      reset()
    }
  }, [getTodos, reset, success])

  const handleClick = (e) => {
    e.preventDefault()
    addTodo({ text, description })
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

AddTodoForm.propTypes = {
  addTodo: func.isRequired,
  reset: func.isRequired,
  getTodos: func.isRequired,
  success: bool.isRequired,
  loading: bool.isRequired,
  failed: bool.isRequired,
  error: string,
}

const mapStateToProps = (state) => ({
  loading: state.todo.add.loading,
  success: state.todo.add.success,
  failed: state.todo.add.failed,
  error: state.todo.add.error,
})

const mapDispatchToProps = (dispatch) => ({
  addTodo: (data) => dispatch(addTodoAction(data)),
  getTodos: () => dispatch(getTodosAction()),
  reset: () => dispatch(addTodoReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm)
