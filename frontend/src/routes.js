import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import HabitsPage from './pages/HabitsPage'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/habits' component={HabitsPage}/>
      </Switch>
    </BrowserRouter>
  )
}