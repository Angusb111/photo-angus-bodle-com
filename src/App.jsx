import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Album from './pages/Album'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Album/:albumId" element={<Album />} /> 
      </Routes>
    </Router>
  )
  
}

export default App