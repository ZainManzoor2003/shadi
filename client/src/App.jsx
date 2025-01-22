import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './componenets/home/Home'
import Registration from './componenets/registration/Registration'
import Login from './componenets/login/Login'
import Users from './componenets/user/Users'
import UserDetails from './componenets/userDetails/UserDetails'
import ContextApiStates from './ContextApi/ContextApiStates'

function App() {


  return (
    <>
      <Routes>
        <Route exact path='/' element={<ContextApiStates><Home /></ContextApiStates>}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/registration' element={<ContextApiStates><Registration /></ContextApiStates>}></Route>
        <Route exact path='/:id/users' element={<ContextApiStates><Users /></ContextApiStates>}></Route>
        <Route exact path='/:id/userDetails' element={<ContextApiStates><UserDetails /></ContextApiStates>}></Route>
      </Routes>
    </>
  )
}

export default App
