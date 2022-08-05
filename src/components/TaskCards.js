import '../App.css';
import { useState } from 'react';
import taskService from '../services/taskService';
import { Note, ExampleNote } from './Note'
import { handleCheckClick, handleDeleteClick } from './clickHandlers';
import PropTypes from 'prop-types';

const NewTaskCard = ({topicToShow, tasks, setTasks}) => {
  
    const [newTitle, setNewTitle] = useState('Enter new task title')
    const [newDesc, setNewDesc] = useState('Enter description')
    const [newDL, setNewDL] = useState('')
    const [newPrio, setNewPrio] = useState(null)
  
    const handleTitleChange = (event) => {
      setNewTitle(event.target.value)
    }
  
    const handleDescChange = (event) => {
      setNewDesc(event.target.value)
    }
  
    const handleDLChange = (event) => {
      setNewDL(event.target.value)
    }

    const handlePrioClick = (prioNumber) => {
      if (newPrio === prioNumber)
      {
        setNewPrio(null)
      }
      else
      {
        setNewPrio(prioNumber)
      }
    }
  
    const handleSaveClick = e => {
      e.stopPropagation()

      if (newTitle === 'Enter new task title')
      {
        window.alert('Enter a title')
      }
      else if (newDesc === 'Enter description')
      {
        window.alert('Enter a description')
      }
      else if (newDL === '')
      {
        window.alert('Choose a deadline')
      }
      else if (newPrio === null)
      {
        window.alert('Choose a priority')
      }
      else
      {
        const newTask = {
          topic: topicToShow.id,
          title: newTitle,
          description: newDesc,
          deadline: newDL,
          priority: parseInt(newPrio),
          done: false,
          notes: "Enter your notes here"
        }

        taskService.create(newTask).then(returnedTask => {
            setTasks(tasks.concat(returnedTask))
          })
        
        setNewTitle('Enter new task title')
        setNewDesc('Enter description')
        setNewDL('')
        setNewPrio(null)
        }
      }
  
    return (
      <div className='card newCard'>
        <div className='cardTop'>
				<input className='inputTitle' value={newTitle} onChange={handleTitleChange} onBlur={() => { if (newTitle===''){setNewTitle('Enter new task title')}}} onFocus={() => { if (newTitle==='Enter new task title'){setNewTitle('')}}}/>
        </div>
        <div className='cardBottom'>
          <input className='input' value={newDesc} onChange={handleDescChange} onBlur={() => { if (newDesc===''){setNewDesc('Enter description')}}} onFocus={() => { if (newDesc==='Enter description'){setNewDesc('')}}}/>
          <div className='inputLine'>
            <div className='chooseDeadLineText'>Choose deadline: </div>
            <input className='input inputAfterText' type='date' value={newDL} onChange={handleDLChange} />
          </div>
            <div className='prioChooseRow'>Choose priority: </div>
              <div className={newPrio === 3 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(3)}>Low</div>
              <div className={newPrio === 2 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(2)}>Normal</div>
              <div className={newPrio === 1 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(1)}>High</div>
          <i className='fa-solid fa-floppy-disk fa-2xl' onClick={handleSaveClick}></i>
        </div>
      </div>
    )
  }

  NewTaskCard.propTypes = {
    topicToShow: PropTypes.object,
    tasks: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
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

    const handlePrioClick = (prioNumber) => {
      setNewPrio(prioNumber)
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
          done: false,
          notes: task.notes
        }
        
        taskService.update(id, updatedTask).then(returnedTask => {
          taskService.getAll()
          .then(setEditTask(!editTask))
            .then(tasks => {
                setTasks(tasks)
          })
        })
      }

    const chooseCardStyle = (prio) => {
        switch(prio) {
            case 1: {
                return 'cardTop urgentTaskPrio'
            }
            case 2: {
                return 'cardTop normalTaskPrio'
            }
            case 3: {
                return 'cardTop lowTaskPrio'
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
              <i className='fa-solid fa-check fa-xl checkTick' onClick={(e) => {handleCheckClick(e, task, taskService, setTasks)}}></i>
            </div>
            <div className='cardBottom'>
              {cardText}
              <Note task={task} tasks={tasks} setTasks={setTasks}/>
            </div>
            <i className='fa-solid fa-pen-to-square fa-2xl topicEdit' onClick={handleEditClick}></i>
            <i className='fa-solid fa-floppy-disk fa-2xl editSave' ></i>
            <i className='fa-solid fa-trash-can fa-2xl' onClick={(e) => {handleDeleteClick(e, task, tasks, taskService, setTasks)}}></i>
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
                            <div className='textBeforeInput'>Choose deadline: </div>
                            <input className='input inputAfterText' type='date' value={newDL} onChange={handleDLChange} />
                        </div>
                        <div className='prioChooseRow'>Choose priority: </div>
                          <div className={newPrio === 3 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(3)}>Low</div>
                          <div className={newPrio === 2 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(2)}>Normal</div>
                          <div className={newPrio === 1 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(1)}>High</div>
            </div>
            <i className='fa-solid fa-pen-to-square fa-2xl topicEdit' onClick={handleEditClick}></i>
            <i className='fa-solid fa-floppy-disk fa-2xl editSave' onClick={handleSaveClick}></i>
            <i className='fa-solid fa-trash-can fa-2xl' onClick={handleDeleteClick} ></i>
        </div>
        )
    }
  }

  TaskCard.propTypes = {
    topicToShow: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    tasks: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
  }

  const FinishedTaskCard = ({task, setTasks}) => {

    const cardText = `${task.description}\n\nDeadline: ${new Date(task.deadline).toDateString()}`
  
    return (
      <div className='card finishedCardBorder'>
        <div className='cardTop finishedCard'>
          <strong>{task.title}</strong>
          <i className="fa-solid fa-check fa-xl checkTick" onClick={(e) => {handleCheckClick(e, task, taskService, setTasks)}}></i>
        </div>
        <div className='cardBottom'>
          {cardText}
        </div>
      </div>
    )
  }

  FinishedTaskCard.propTypes = {
    task: PropTypes.object.isRequired,
    setTasks: PropTypes.func.isRequired
  }

	const ExampleTaskCard = ({task, exampleTasks, setExampleTasks, topicToShow}) => {

    const [editTask, setEditTask] = useState(false)
    const [newTitle, setNewTitle] = useState(task.title)
    const [newDesc, setNewDesc] = useState(task.description)
    const [newDL, setNewDL] = useState(new Date(task.deadline))
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

    const handlePrioClick = (prioNumber) => {
      setNewPrio(prioNumber)
    }
    
    const handleExampleEditClick = e => {
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
    
    const handleExampleSaveClick = e => {
        e.stopPropagation()
        const id = task.id
        const updatedTask = {
          id: task.id,
          topic: topicToShow.id,
          title: newTitle,
          description: newDesc,
          deadline: new Date(newDL),
          priority: parseInt(newPrio),
          done: false,
          notes: task.notes
        }
        
        setExampleTasks(exampleTasks.map(task => task.id === id ? updatedTask : task))
				setEditTask(!editTask)
      }

    const chooseCardStyle = (prio) => {
        switch(prio) {
            case 1: {
                return 'cardTop urgentTaskPrio'
            }
            case 2: {
                return 'cardTop normalTaskPrio'
            }
            case 3: {
                return 'cardTop lowTaskPrio'
            }
            default: {
                return 'cardTop'
            }
        }
    }

		const handleExampleCheckClick = e => {
			e.stopPropagation()
	
			let updatedTask = task
	
			const id = task.id
			updatedTask.done = !updatedTask.done
	
			setExampleTasks(exampleTasks.map(task => task.id === id ? updatedTask : task))
		}

		const handleExampleTaskDeleteClick = e => {
			e.stopPropagation()
			const result = window.confirm(`Delete ${task.title} ?`)
			if (result) {
				const id = task.id
				setExampleTasks(exampleTasks.filter(task => task.id !== id))
			}
		}

    const cardText = `${task.description}\n\nDeadline: ${new Date(task.deadline).toDateString()}`

    if (!editTask)
    {
    return (
        <div className='card'>
            <div className={chooseCardStyle(task.priority)}>
              <strong>{task.title}</strong>
              <i className='fa-solid fa-check fa-xl checkTick' onClick={(e) => {handleExampleCheckClick(e)}}></i>
            </div>
            <div className='cardBottom'>
              {cardText}
              <ExampleNote task={task} exampleTasks={exampleTasks} setExampleTasks={setExampleTasks}/>
            </div>
            <i className='fa-solid fa-pen-to-square fa-2xl topicEdit' onClick={(e) => handleExampleEditClick(e)}></i>
            <i className='fa-solid fa-floppy-disk fa-2xl editSave' ></i>
            <i className='fa-solid fa-trash-can fa-2xl' onClick={(e) => {handleExampleTaskDeleteClick(e)}}></i>
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
                            <div className='textBeforeInput'>Choose deadline: </div>
                            <input className='input inputAfterText' type='date' value={newDL} onChange={handleDLChange} />
                        </div>
                        <div className='prioChooseRow'>Choose priority: </div>
                          <div className={newPrio === 3 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(3)}>Low</div>
                          <div className={newPrio === 2 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(2)}>Normal</div>
                          <div className={newPrio === 1 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(1)}>High</div>
            </div>
            <i className='fa-solid fa-pen-to-square fa-2xl topicEdit' onClick={handleExampleEditClick}></i>
            <i className='fa-solid fa-floppy-disk fa-2xl editSave' onClick={handleExampleSaveClick}></i>
            <i className='fa-solid fa-trash-can fa-2xl' onClick={handleExampleTaskDeleteClick} ></i>
        </div>
        )
    }
  }

  ExampleTaskCard.propTypes = {
    topicToShow: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    exampleTasks: PropTypes.array.isRequired,
    setExampleTasks: PropTypes.func.isRequired,
  }

	const ExampleFinishedTaskCard = ({task, exampleTasks, setExampleTasks}) => {

		const handleExampleCheckClick = e => {
			e.stopPropagation()
	
			let updatedTask = task
	
			const id = task.id
			updatedTask.done = !updatedTask.done
	
			setExampleTasks(exampleTasks.map(task => task.id === id ? updatedTask : task))
		}

    const cardText = `${task.description}\n\nDeadline: ${new Date(task.deadline).toDateString()}`
  
    return (
      <div className='card finishedCardBorder'>
        <div className='cardTop finishedCard'>
          <strong>{task.title}</strong>
          <i className="fa-solid fa-check fa-xl checkTick" onClick={(e) => {handleExampleCheckClick(e)}}></i>
        </div>
        <div className='cardBottom'>
          {cardText}
        </div>
      </div>
    )
  }

  ExampleFinishedTaskCard.propTypes = {
    task: PropTypes.object.isRequired,
    setExampleTasks: PropTypes.func.isRequired,
		exampleTasks: PropTypes.array.isRequired
  }

	const ExampleNewTaskCard = ({topicToShow, exampleTasks, setExampleTasks}) => {
  
    const [newTitle, setNewTitle] = useState('Enter new task title')
    const [newDesc, setNewDesc] = useState('Enter description')
    const [newDL, setNewDL] = useState('')
    const [newPrio, setNewPrio] = useState(null)
  
    const handleTitleChange = (event) => {
      setNewTitle(event.target.value)
    }
  
    const handleDescChange = (event) => {
      setNewDesc(event.target.value)
    }
  
    const handleDLChange = (event) => {
      setNewDL(event.target.value)
    }

    const handlePrioClick = (prioNumber) => {
      if (newPrio === prioNumber)
      {
        setNewPrio(null)
      }
      else
      {
        setNewPrio(prioNumber)
      }
    }
  
    const handleExampleSaveClick = e => {
      e.stopPropagation()

      if (newTitle === 'Enter new task title')
      {
        window.alert('Enter a title')
      }
      else if (newDesc === 'Enter description')
      {
        window.alert('Enter a description')
      }
      else if (newDL === '')
      {
        window.alert('Choose a deadline')
      }
      else if (newPrio === null)
      {
        window.alert('Choose a priority')
      }
      else
      {
        const newTask = {
          topic: topicToShow.id,
          title: newTitle,
          description: newDesc,
          deadline: newDL,
          priority: parseInt(newPrio),
          done: false,
          notes: "Enter your notes here"
        }

        setExampleTasks(exampleTasks.concat(newTask))
        
        setNewTitle('Enter new task title')
        setNewDesc('Enter description')
        setNewDL('')
        setNewPrio(null)
        }
      }
  
    return (
      <div className='card newCard'>
        <div className='cardTop'>
          <input className='inputTitle' value={newTitle} onChange={handleTitleChange} onBlur={() => { if (newTitle===''){setNewTitle('Enter new task title')}}} onFocus={() => { if (newTitle==='Enter new task title'){setNewTitle('')}}}/>
        </div>
        <div className='cardBottom'>
          <input className='input' value={newDesc} onChange={handleDescChange} onBlur={() => { if (newDesc===''){setNewDesc('Enter description')}}} onFocus={() => { if (newDesc==='Enter description'){setNewDesc('')}}}/>
          <div className='inputLine'>
            <div className='chooseDeadLineText'>Choose deadline: </div>
            <input className='input inputAfterText' type='date' value={newDL} onChange={handleDLChange} />
          </div>
            <div className='prioChooseRow'>Choose priority: </div>
              <div className={newPrio === 3 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(3)}>Low</div>
              <div className={newPrio === 2 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(2)}>Normal</div>
              <div className={newPrio === 1 ? 'prioButton prioButtonPressed' : 'prioButton'} onClick={() => handlePrioClick(1)}>High</div>
          <i className='fa-solid fa-floppy-disk fa-2xl' onClick={handleExampleSaveClick}></i>
        </div>
      </div>
    )
  }

  ExampleNewTaskCard.propTypes = {
    topicToShow: PropTypes.object,
    exampleTasks: PropTypes.array.isRequired,
    setExampleTasks: PropTypes.func.isRequired,
  }

  export { TaskCard, NewTaskCard, FinishedTaskCard, ExampleTaskCard, ExampleFinishedTaskCard, ExampleNewTaskCard };