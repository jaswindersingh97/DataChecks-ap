import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import Register from './pages/Register/Register'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/SignIn' element={<SignIn/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
