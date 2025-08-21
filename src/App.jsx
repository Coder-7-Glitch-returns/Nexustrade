import React from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <ErrorPage />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
