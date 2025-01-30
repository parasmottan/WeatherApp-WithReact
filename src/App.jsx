import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-[100vh] w-full bg-[#4B515D] flex justify-center items-center'>
       
      <Card/>


   </div>
  )
}

export default App
