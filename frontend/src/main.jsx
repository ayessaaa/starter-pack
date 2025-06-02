import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import  StarterPack  from './StarterPack.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:id" element={<StarterPack />} />
    </Routes>
    
  </BrowserRouter>,
)
