import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import SignUp from "./pages/pageAuth/SignUp"
import Sign from './pages/pageAuth/Sign'
import Product from './pages/admin/Product'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/article/add' element={<Product/>} />
        <Route path='/user/signup' element={<SignUp/>} />
        <Route path="/user/sign" element={<Sign/>} />
      </Routes>
    </Router>
  )
}

export default App
