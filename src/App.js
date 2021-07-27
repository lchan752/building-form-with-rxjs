import './App.scss'
import React from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Switch 
} from 'react-router-dom'
import CreateForm from './pages/CreateForm'
import EditForm from 'pages/EditForm'
import ViewPost from 'pages/ViewPost'

export default function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path='/' exact component={CreateForm}></Route>
          <Route path='/create' component={CreateForm}></Route>
          <Route path='/edit/:post_id' component={EditForm}></Route>
          <Route path='/:post_id' component={ViewPost}></Route>
        </Switch>
      </main>
    </Router>
  )
}