import React, { useRef, useState,useEffect } from 'react'
import { Todo } from '../model';
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd';

type Props ={
    todo:Todo;
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    index:number;
}

const SingleTodo:React.FC<Props> = ({todo,todos,setTodos,index}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editText, setEditText] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleDone = (id:number) => {
    setTodos(
        todos
        .map(todo=>todo.id===id?{...todo,isDone:!todo.isDone}:todo))
  }
  const handleDelete = (id:number) => {
    setTodos(

        todos.filter(todo=>(
            todo.id!==id
        ))
    )
  }
  const handleEdit = (e:React.FormEvent,id:number) => {
    e.preventDefault()
    setTodos(
        todos
        .map(todo=>todo.id===id?{...todo,todo:editText}:todo))
    setEditMode(false)
  }
  useEffect(()=>{
    inputRef.current?.focus()
  },[editMode])

  let content:any
  if (editMode) {
    content = (
      <input
        ref={inputRef}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        type="text"
        className='single_todo_text'
      />
    );
  } else if (todo.isDone) {
    content = (
      <s className='single_todo_text'>{todo.todo}</s>
    );
  } else {
    content = (
      <span className='single_todo_text'>{todo.todo}</span>
    );
  }
  
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided,snapshot)=>(
          <form className={`single_todo ${snapshot.isDragging?'drag':''}`} onSubmit={(e)=>handleEdit(e,todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >
              {
                  content     
              }
              
              <div className='icons'>
                  <span className="icon" onClick={()=>{
                      if (!editMode && !todo.isDone) {
                          setEditMode(!editMode)
                      }
                  }}>
                      <AiFillEdit/>
                  </span>
                  <span className="icon" onClick={()=>handleDelete(todo.id)}><AiFillDelete/></span>
                  <span className="icon" onClick={()=>handleDone(todo.id)}><MdDone/></span>
              </div>
          </form>
        )
      }

    </Draggable>
   
  )
}

export default SingleTodo