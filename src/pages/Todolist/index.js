import React from 'react'
import { connect } from 'react-redux'
import { getTodos as getTodosAction } from '../../store/actions'
import Nav from '../../components/Nav'
import Todo from '../../components/Todo'
import AddTodoForm from '../../components/AddTodo'
import styles from './page.module.css'

const endpoint = 'http://localhost:3030'
const errorHandler = (error) => (error.response ? error.response.data : error.message)

function TodolistPage() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    fetch(`${endpoint}/list`)
      .then((response) => {
        if (!response.ok) throw new Error('ошибка добавления')
        return response.json()
      })
      .then((data) => {
        setLoading(false)
        setTodos(data)
      })
      .catch((err) => {
        setLoading(false)
        setFailed(true)
        setError(errorHandler(err))
      })
  }, [])

  return (
    <div>
      <Nav />
      <AddTodoForm />
      <div className={styles.title}>Список дел</div>
      <div className={styles.todos}>
        { loading && <div>Загрузка...</div> }
        { failed && <div>Ошибка: {error}</div> }
        { todos.map((todo) => <Todo key={todo.id} todo={todo} />) }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  todos: state.todo.data,
  loading: state.todo.get.loading,
  success: state.todo.get.success,
  failed: state.todo.get.failed,
  error: state.todo.get.error,
})

const mapDispatchToProps = (dispatch) => ({
  getTodos: () => dispatch(getTodosAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodolistPage)
