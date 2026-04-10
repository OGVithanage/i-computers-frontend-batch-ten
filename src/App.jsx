import { Routes, Route } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import TrendingProducts from './components/trendingProducts'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='w-full h-screen flex justify-center items-center relative bg-primary text-secondary'>
      <Toaster />
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
