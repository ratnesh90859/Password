import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-slate-500 min-h-screen" style={{ background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #63e 100%)" }}>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
