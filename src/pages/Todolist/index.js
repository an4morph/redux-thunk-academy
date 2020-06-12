import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, shape, string, func, bool } from 'prop-types'
import { getTodos as getTodosAction } from '../../store/actions'
import Nav from '../../components/Nav'
import Todo from '../../components/Todo'
import AddTodoForm from '../../components/AddTodo'
import styles from './page.module.css'

function TodolistPage({ todos, getTodos, loading, success, failed, error }) {
  React.useEffect(() => {
    if (!todos.length) getTodos()
  }, [getTodos, todos.length])
  return (
    <div>
      <Nav />
      <AddTodoForm />
      <div className={styles.title}>Список дел</div>
      <div className={styles.todos}>
        { loading && <div>Загрузка...</div> }
        { failed && <div>Ошибка: {error}</div> }
        { success && todos.map((todo) => <Todo key={todo.id} todo={todo} />) }
      </div>
    </div>
  )
}

TodolistPage.propTypes = {
  todos: arrayOf(shape({
    id: string.isRequired,
  })),
  getTodos: func.isRequired,
  loading: bool.isRequired,
  success: bool.isRequired,
  failed: bool.isRequired,
  error: string,
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
