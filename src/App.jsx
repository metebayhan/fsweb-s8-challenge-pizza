import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './MainPage'
import OrderPage from './OrderPage'
import SuccessPage from './SuccessPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/siparis" element={<OrderPage />} />
          <Route path="/success" element={<SuccessPage isError={false} />} />
          <Route path="/error" element={<SuccessPage isError={true} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
