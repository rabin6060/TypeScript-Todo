import React, { useRef } from 'react'
import './style.css'

interface Props{
    todo:string,
    setTodo:React.Dispatch<React.SetStateAction<string>>,
    handleAdd : (e:React.FormEvent)=>void
}

const Input = ({todo,setTodo,handleAdd}:Props) => {
   const inputRef = useRef<HTMLInputElement>(null)
  return (
        <form className='input' onSubmit={(e)=>{
            handleAdd(e)
            inputRef.current?.blur()
            }}>
            <input type="text" placeholder='enter a task' className='input_box' 
                ref={inputRef}
                value={todo}
                onChange={(e)=>setTodo(e.target.value)} />
            <button className='submit_button' type='submit'>Go</button>
        </form>
        
  )
}

export default Input