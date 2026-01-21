import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import FocusMode from './components/FocusMode'
import Clock from './components/Clock'
import FocusStats from './components/FocusStats'
import NotFound from './components/NotFound'
import About from './components/About'

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: 
          <div>
            <NavBar/>
            <Home/>
          </div>
      },

      {
        path: '/clock',
        element: 
          <div>
            <NavBar/>
            <Clock/>
          </div>,
      },

      {
        path: '/focusmode',
        element: 
          <div>
            <NavBar/>
            <FocusMode/>
          </div>,
      },

      {
        path: '/focusmode/stats',
        element: 
          <div>
            <NavBar/>
            <FocusStats/>
          </div>,
      },

      {
        path: '/about',
        element: 
          <div>
            <About/>
          </div>,
      },

      {
        path: '*',
        element: <NotFound/>
      },
    ]
  )

  return (
    <RouterProvider router = {router} />
  )
}

export default App
