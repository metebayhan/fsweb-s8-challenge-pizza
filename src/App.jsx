import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './MainPage'
import OrderPage from './OrderPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/siparis" element={<OrderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
