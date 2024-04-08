import React from 'react';

// pages
import AddTest from './pages/AddTest';

// toadtify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// bootstrap icons
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