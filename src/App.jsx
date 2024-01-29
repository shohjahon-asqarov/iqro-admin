import React from 'react'
import AddTest from './pages/AddTest'

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap-icons/font/bootstrap-icons.css'


const App = () => {
  return (
    <div className='flex items-center min-h-screen'>
      <AddTest />

      <ToastContainer />
    </div>
  )
}

export default App