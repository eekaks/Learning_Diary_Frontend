import '../App.css';
import { useState } from 'react';
import taskService from '../services/taskService';

const NewTaskCard = ({topicToShow, tasks, setTasks}) => {
  
    const [newTitle, setNewTitle] = useState('Enter new task title')
    const [newDesc, setNewDesc] = useState('Enter description')
    const [newDL, setNewDL] = useState('')
    const [newPrio, setNewPrio] = useState('Enter priority')
  
    const handleTitleChange = (event) => {
      setNewTitle(event.target.value)
    }
  
    const handleDescChange = (event) => {
      setNewDesc(event.target.value)
    }
  
    const handleDLChange = (event) => {
      setNewDL(event.target.value)
    }
  
    const handlePrioChange = (event) => {
      setNewPrio(event.target.value)
    }
  
    const handleSaveClick = e => {
      e.stopPropagation()
      const newTask = {
        id: 0,
        topic: topicToShow.id,
        title: newTitle,
        description: newDesc,
        deadline: newDL,
        priority: parseInt(newPrio),
        done: false
      }
  
      taskService.create(newTask).then(returnedTask => {
        setTasks(tasks.concat(returnedTask))
      })
  
      setNewTitle('Enter new task title')
      setNewDesc('Enter description')
      setNewDL('')
      setNewPrio('Enter priority')
    }
  
    if (topicToShow === null)
    {  
      return null
    }
  
    return (
      <div className='card'>
        <div className='cardTop'>
          <input className='inputTitle' value={newTitle} onChange={handleTitleChange} />
        </div>
        <div className='cardBottom'>
          <input className='input' value={newDesc} onChange={handleDescChange} />
          <div className='inputLine'>
            <div>Choose deadline: </div>
            <input className='input inputAfterText' type='date' value={newDL} onChange={handleDLChange} />
          </div>
          <input className='input' value={newPrio} onChange={handlePrioChange} />
          <i className='fa-solid fa-floppy-disk fa-2xl' onClick={handleSaveClick}></i>
        </div>
      </div>
    )
  }
  
  const TaskCard = ({task, tasks, setTasks, topicToShow}) => {

    const [editTask, setEditTask] = useState(false)
    const [newTitle, setNewTitle] = useState(task.title)
    const [newDesc, setNewDesc] = useState(task.description)
    const [newDL, setNewDL] = useState(Date(task.deadline))
    const [newPrio, setNewPrio] = useState(task.priority)

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    
    const handleDescChange = (event) => {
        setNewDesc(event.target.value)
    }

    const handleDLChange = (event) => {
        setNewDL(event.target.value)
    }

    const handlePrioChange = (event) => {
        setNewPrio(event.target.value)
    }
  
    const handleDeleteClick = e => {
        e.stopPropagation()
        const result = window.confirm(`Delete ${task.title} ?`)
        if (result === true) {
          taskService.remove(task.id)
            .then(deletedTask => {
            setTasks(tasks.filter(oldTask => oldTask.id !== task.id))
          })
        }
      }
    
    const handleEditClick = e => {
        e.stopPropagation()
        if (editTask)
        {
          setNewTitle(task.title)
          setNewDesc(task.description)
          setNewDL(task.deadline)
          setNewPrio(task.priority)
        }
        setEditTask(!editTask)
      }
    
    const handleSaveClick = e => {
        e.stopPropagation()
        const id = task.id
        const updatedTask = {
          id: task.id,
          topic: topicToShow.id,
          title: newTitle,
          description: newDesc,
          deadline: new Date(newDL),
          priority: parseInt(newPrio),
          done: false
        }
        
        taskService.update(id, updatedTask).then(returnedTask => {
          taskService.getAll()
          .then(setEditTask(!editTask))
            .then(tasks => {
                setTasks(tasks)
          })
        })
      }
    
    const handleCheckClick = e => {
        e.stopPropagation()
        const id = task.id
    
        const updatedTask = {
          id: task.id,
          topic: task.topic,
          title: task.title,
          description: task.description,
          deadline: task.deadline,
          priority: task.priority,
          done: !task.done
        }
        
        taskService.update(id, updatedTask).then(returnedTask => {
          taskService.getAll()
          .then(tasks => {
            setTasks(tasks)
          })
        })
      }

    const chooseCardStyle = (prio) => {
        switch(prio) {
            case 1: {
                return 'cardTop urgentPrio'
            }
            case 2: {
                return 'cardTop normalPrio'
            }
            case 3: {
                return 'cardTop lowPrio'
            }
            default: {
                return 'cardTop'
            }
        }
    }

    const cardText = `${task.description}\n\nDeadline: ${new Date(task.deadline).toDateString()}`

    if (!editTask)
    {
    return (
        <div className='card'>
            <div className={chooseCardStyle(task.priority)}>
            <strong>{task.title}</strong>
            <i className='fa-solid fa-check fa-xl checkTick' onClick={handleCheckClick}></i>
            </div>
            <div className='cardBottom'>
            {cardText}
            </div>
            <i className='fa-solid fa-pen-to-square fa-2xl topicEdit' onClick={handleEditClick}></i>
            <i className='fa-solid fa-floppy-disk fa-2xl editSave' ></i>
            <i className='fa-solid fa-trash-can fa-2xl' onClick={handleDeleteClick} ></i>
        </div>
        )
    }
    else {
    return (
        <div className='card'>
            <div className='cardTop'>
                <input className='inputTitle' value={newTitle} onChange={handleTitleChange} />
            </div>
                <div className='cardBottom'>
                    <input className='input' value={newDesc} onChange={handleDescChange} />
                        <div className='inputLine'>
                            <div>Choose deadline: </div>
                            <input className='input inputAfterText' type='date' value={newDL} onChange={handleDLChange} />
                        </div>
                <div className='inputLine'>
                    <div>Enter priority: </div>
                    <input className='input inputAfterText' value={newPrio} onChange={handlePrioChange} />
                </div>
            </div>
            <i className='fa-solid fa-pen-to-square fa-2xl topicEdit' onClick={handleEditClick}></i>
            <i className='fa-solid fa-floppy-disk fa-2xl editSave' onClick={handleSaveClick}></i>
            <i className='fa-solid fa-trash-can fa-2xl' onClick={handleDeleteClick} ></i>
        </div>
        )
    }
  }

  const FinishedTaskCard = ({task, setTasks}) => {

    const cardText = `${task.description}\n\nDeadline: ${new Date(task.deadline).toDateString()}`
  
    const handleCheckClick = e => {
      e.stopPropagation()
      const id = task.id
      
      const updatedTask = {
        id: task.id,
        topic: task.topic,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        done: !task.done        
      }
      
      taskService.update(id, updatedTask).then(returnedTask => {
        taskService.getAll()
        .then(tasks => {
          setTasks(tasks)
        })
      })
    }
  
    return (
      <div className='card finishedCardBorder'>
        <div className='cardTop finishedCard'>
          <strong>{task.title}</strong>
          <i className="fa-solid fa-check fa-xl checkTick" onClick={handleCheckClick}></i>
        </div>
        <div className='cardBottom'>
          {cardText}
        </div>
      </div>
    )
  }

  export { TaskCard, NewTaskCard, FinishedTaskCard };