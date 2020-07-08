import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import HabitsPage from './pages/HabitsPage'
import FilteredHabits from '../src/Components/FilteredHabits'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route exact path='/dashboard' component={Dashboard}/>
        <Route exact path='/dashboard/positive' component={(props) => <FilteredHabits {...props}  filter={`positive`} />} />
        <Route exact path='/dashboard/negative' component={(props) => <FilteredHabits {...props}  filter={`negative`} />} />
        <Route path='/habits' component={HabitsPage}/>
      </Switch>
    </BrowserRouter>
  )
}