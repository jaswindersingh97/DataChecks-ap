import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import Register from './pages/Register/Register'
import PostsPage from './pages/PostsPage/PostsPage'
import PostPage from './pages/PostPage/PostPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/SignIn' element={<SignIn/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/Posts' element={<PostsPage/>}/>
        <Route path='/Posts/:postId' element={<PostPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
