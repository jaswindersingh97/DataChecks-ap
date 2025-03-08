import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import Register from './pages/Register/Register'
import PostsPage from './pages/PostsPage/PostsPage'
import PostPage from './pages/PostPage/PostPage'
import { ToastContainer } from 'react-toastify'
import WithNavBar from './components/WithNavBar/WithNavBar'
function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/SignIn' element={<SignIn/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/posts' element={<WithNavBar/>}>
          <Route index element={<PostsPage/>}/>
          <Route path=':postId' element={<PostPage/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App
