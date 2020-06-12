import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Todolist from './pages/Todolist'
import NotFoundPage from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Todolist} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
