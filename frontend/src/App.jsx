import NavBar from "@/components/NavBar.jsx"
import Home from '@/components/Home.jsx'
import Login from '@/components/Login.jsx'
import Register from '@/components/Register.jsx'
import Multiline from '@/components/Multiline.jsx'
import Single from '@/components/Single.jsx'
import Community from '@/components/Community.jsx'
import Learn from '@/components/Learn.jsx'

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community" element={<Community />} />
        <Route path="/challenge/:id" element={<Multiline />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/practice/hiragana" element={<Single />} />
        <Route path="/practice/katakana" element={<Single />} />
      </Routes>
    </>
  )
}

export default App
