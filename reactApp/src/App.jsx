import { useEffect, useState, useRef, useCallback } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const[password, setPassword] = useState('')

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz"
    if(character) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(number) chars += "0123456789"
    let pass = ""
    for(let i=0; i<length; i++){
      const randomIndex = Math.floor(Math.random() * chars.length)
      pass += chars[randomIndex]
    }
    setPassword(pass)
  }
  useEffect(() => {
    generatePassword()
  }, [length, number, character])

  const copyRef = useRef(null)
  const copyToClipboard = useCallback(() => {
    copyRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-300'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 bg-white' placeholder='password' readOnly ref={copyRef} />
          <button onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='mb-4'>
          <label className='text-sm'>Password Length: {length}</label>
          <input type="range" min="6" max="20" value={length} onChange={(e) => setLength(e.target.value)} className='w-full' />
        </div>
        <div className='mb-4 flex flex-col gap-2'>
          <label className='flex items-center gap-2'>
            <input type="checkbox" checked={number} onChange={(e) => setNumber(e.target.checked)} />
            Include Numbers
          </label>
          <label className='flex items-center gap-2'>
            <input type="checkbox" checked={character} onChange={(e) => setCharacter(e.target.checked)} />
            Include Uppercase Letters
          </label>
        </div>
      
       
      </div>
    </>
  )
}

export default App
