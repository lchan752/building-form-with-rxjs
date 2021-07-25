import './App.scss'
import React from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Switch 
} from 'react-router-dom'
import CreateForm from './pages/CreateForm'

export default function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path='/' exact component={CreateForm}></Route>
          <Route path='/create' component={CreateForm}></Route>
        </Switch>
      </main>
    </Router>
  )
}