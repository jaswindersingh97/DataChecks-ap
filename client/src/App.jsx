import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import Register from './pages/Register/Register'
import PostsPage from './pages/PostsPage/PostsPage'
import PostPage from './pages/PostPage/PostPage'
import { ToastContainer } from 'react-toastify'
import WithNavBar from './components/WithNavBar/WithNavBar'
import LandingPage from './pages/LandingPage/LandingPage'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/SignIn' element={<ProtectedRoutes element={<SignIn/>} isPublic={true}/>} />
        <Route path='/register' element={<ProtectedRoutes element={<Register/>} isPublic={true}/>}/>
        <Route path='/posts' element={<WithNavBar/>}>
          <Route index element={<ProtectedRoutes element={<PostsPage/>} isPublic={false}/>}/>
          <Route path=':postId' element={<ProtectedRoutes element={<PostPage/>} isPublic={false}/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App
