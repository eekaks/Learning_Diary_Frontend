import './App.css';
import { useState, useEffect } from 'react';
import topicService from './services/topicService';
import taskService from './services/taskService';
import noteService from './services/noteService';

const CardGrid = ({topics, tasks, handleCardClick, topicToShow, setTopics, setTopicToShow}) => {
  if (topicToShow === null)
  {
  return (
    <>
    {topics.filter(topic => topic.inProgress === true).map(topic =>
      <TopicCard key={topic.id} topic={topic} topics={topics} handleCardClick={handleCardClick} setTopics={setTopics} setTopicToShow={setTopicToShow}/>)}
    {topics.filter(topic => topic.inProgress === false).map(topic =>
      <FinishedTopicCard key={topic.id} topic={topic} topics={topics} handleCardClick={handleCardClick} setTopics={setTopics} setTopicToShow={setTopicToShow}/>)}
    </>
  )
  }
  else
  {
    return (
      tasks.filter(task => task.topic === topicToShow.id).map(task =>
        <TaskCard key={task.id} task={task}/>)
    )
  }
}

const NewTopicCard = ({topicToShow, setTopics, topics}) => {

  const [newTitle, setNewTitle] = useState('Enter new topic title')
  const [newDesc, setNewDesc] = useState('Enter description')
  const [newEstimate, setNewEstimate] = useState('Enter estimated time to master')
  const [newSource, setNewSource] = useState('Enter sources')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleDescChange = (event) => {
    setNewDesc(event.target.value)
  }

  const handleEstimateChange = (event) => {
    setNewEstimate(event.target.value)
  }

  const handleSourceChange = (event) => {
    setNewSource(event.target.value)
  }

  const handleSaveClick = e => {
    e.stopPropagation()
    const newTopic = {
      id: 0,
      title: newTitle,
      description: newDesc,
      estimatedTimeToMaster: parseInt(newEstimate),
      timeSpent: 0,
      source: newSource,
      startLearningDate: new Date(),
      inProgress: true,
      completionDate: null
    }

    topicService.create(newTopic).then(returnedTopic => {
      setTopics(topics.concat(returnedTopic))
    })

    setNewTitle('Enter new topic title')
    setNewDesc('Enter description')
    setNewEstimate('Enter estimated time to master')
    setNewSource('Enter sources')
  }

  if (topicToShow !== null)
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
        <input className='input' value={newEstimate} onChange={handleEstimateChange} />
        <input className='input' value={newSource} onChange={handleSourceChange} />
        <i className='fa-solid fa-floppy-disk fa-2xl' onClick={handleSaveClick}></i>

      </div>
    </div>
  )
}

const TopicCard = ({topic, topics, setTopics, handleCardClick}) => {

  const [editTopic, setEditTopic] = useState(false)
  const [newTitle, setNewTitle] = useState(topic.title)
  const [newDesc, setNewDesc] = useState(topic.description)
  const [newEstimate, setNewEstimate] = useState(topic.estimatedTimeToMaster)
  const [newSource, setNewSource] = useState(topic.source)

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleDescChange = (event) => {
    setNewDesc(event.target.value)
  }

  const handleEstimateChange = (event) => {
    setNewEstimate(event.target.value)
  }

  const handleSourceChange = (event) => {
    setNewSource(event.target.value)
  }

  const cardText = `${topic.description}\n\nStarted learning: ${new Date(topic.startLearningDate).toDateString()}\n\nEstimated time to master: ${topic.estimatedTimeToMaster} days\n\nSources: ${topic.source}`

  const handleDeleteClick = e => {
    e.stopPropagation()
    const result = window.confirm(`Delete ${topic.title} ?`)
    if (result === true) {
      topicService.remove(topic.id)
        .then(deletedTopic => {
        setTopics(topics.filter(oldTopic => oldTopic.id !== topic.id))
      })
    }
  }

  const handleEditClick = e => {
    e.stopPropagation()
    if (editTopic)
    {
      setNewTitle(topic.title)
      setNewDesc(topic.description)
      setNewEstimate(topic.estimatedTimeToMaster)
      setNewSource(topic.source)
    }
    setEditTopic(!editTopic)
  }

  const handleSaveClick = e => {
    e.stopPropagation()
    const id = topic.id
    const updatedTopic = {
      id: topic.id,
      title: newTitle,
      description: newDesc,
      estimatedTimeToMaster: parseInt(newEstimate),
      timeSpent: topic.timeSpent,
      source: newSource,
      startLearningDate: topic.startLearningDate,
      inProgress: topic.inProgress,
      completionDate: topic.completionDate
    }
    
    topicService.update(id, updatedTopic).then(returnedTopic => {
      topicService.getAll()
      .then(topics => {
        setTopics(topics).then(setEditTopic(!editTopic)
        )
      })
    })
  }

  const handleCheckClick = e => {
    e.stopPropagation()
    const id = topic.id
    const completedDate = topic.inProgress === false ? null : new Date()
    const timeSpent = topic.inProgress === false ? 0 : Math.floor((new Date().getTime() - new Date(topic.startLearningDate).getTime()) / 86400000)

    const updatedTopic = {
      id: topic.id,
      title: topic.title,
      description: topic.description,
      estimatedTimeToMaster: topic.estimatedTimeToMaster,
      timeSpent: timeSpent,
      source: topic.source,
      startLearningDate: topic.startLearningDate,
      inProgress: !topic.inProgress,
      completionDate: completedDate
    }
    
    topicService.update(id, updatedTopic).then(returnedTopic => {
      topicService.getAll()
      .then(topics => {
        setTopics(topics)
      })
    })
  }

  if (!editTopic)
  {
    return (
      <div className='card' onClick={() => handleCardClick(topic)}>
        <div className='cardTop'>
          <strong>{topic.title}</strong>
          <i className="fa-solid fa-check fa-xl checkTick" onClick={handleCheckClick}></i>
        </div>
        <div className='cardBottom'>
          {cardText}
        </div>
        <i className="fa-solid fa-pen-to-square fa-2xl topicEdit" onClick={handleEditClick}></i>
        <i className='fa-solid fa-floppy-disk fa-2xl editSave' onClick={handleSaveClick}></i>
        <i className='fa-solid fa-trash-can fa-2xl' onClick={handleDeleteClick}></i>
      </div>
    )
  }
  else
  {
    return (
      <div className='card' >
        <div className='cardTop'>
          <input className='inputTitle' value={newTitle} onChange={handleTitleChange} />
        </div>
        <div className='cardBottom'>
          <input className='input' value={newDesc} onChange={handleDescChange} />
            <div className='inputLine'>
              <div>Estimated time to master: </div>
              <input className='input inputAfterText' value={newEstimate} onChange={handleEstimateChange} />
            </div>
            <div className='inputLine'>
              <div>Sources: </div>
              <input className='input inputAfterText' value={newSource} onChange={handleSourceChange} />
            </div>
        </div>
        <i className="fa-solid fa-pen-to-square fa-2xl topicEdit" onClick={handleEditClick}></i>
        <i className='fa-solid fa-floppy-disk fa-2xl editSave' onClick={handleSaveClick}></i>
        <i className='fa-solid fa-trash-can fa-2xl' onClick={handleDeleteClick}></i>
      </div>
    )
  }
}

const FinishedTopicCard = ({topic, setTopics}) => {

  const cardText = `${topic.description}\n\nStarted learning: ${new Date(topic.startLearningDate).toDateString()}\n\nTime spent: ${topic.timeSpent} days\n\nSources: ${topic.source}`

  const handleCheckClick = e => {
    e.stopPropagation()
    const id = topic.id
    const completedDate = topic.inProgress === false ? null : new Date()
    const timeSpent = topic.inProgress === false ? 0 : Math.floor((new Date().getTime() - new Date(topic.startLearningDate).getTime()) / 86400000)

    const updatedTopic = {
      id: topic.id,
      title: topic.title,
      description: topic.description,
      estimatedTimeToMaster: topic.estimatedTimeToMaster,
      timeSpent: timeSpent,
      source: topic.source,
      startLearningDate: topic.startLearningDate,
      inProgress: !topic.inProgress,
      completionDate: completedDate
    }
    
    topicService.update(id, updatedTopic).then(returnedTopic => {
      topicService.getAll()
      .then(topics => {
        setTopics(topics)
      })
    })
  }

  return (
    <div className='card finishedCardBorder'>
      <div className='cardTop finishedCard'>
        <strong>{topic.title}</strong>
        <i className="fa-solid fa-check fa-xl checkTick" onClick={handleCheckClick}></i>
      </div>
      <div className='cardBottom'>
        {cardText}
      </div>
    </div>
  )
}


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



const TaskCard = ({task}) => {

  const cardText = `${task.description}\n\nDeadline: ${new Date(task.deadline).toDateString()}\n\nPriority: ${task.priority}\n\nDone: ${task.done}`
  return (
    <div className='card'>
      <div className='cardTop'>
        <strong>{task.title}</strong>
      </div>
      <div className='cardBottom'>
        {cardText}
      </div>
      <button type='button' className='noteButton hvr-border-fade'>See notes.</button>
    </div>
  )
}

const TopBar = ({topicToShow, handleBarClick}) =>  {
  if (topicToShow === null)
  {
    return (
      <div className='topBar' onClick={handleBarClick}>
        <div className='headerFooterFont'><i className='fa-solid fa-book bookButton'></i> Learning Diary</div>
      </div>
    )
  }
  return null
}

const TopicBar = ({topicToShow, handleBarClick}) => {
  if (topicToShow === null)
  {
    return null
  }

  const cardText = `${topicToShow.description}\nStarted learning: ${new Date(topicToShow.startLearningDate).toDateString()}\nEstimated time to master: ${topicToShow.estimatedTimeToMaster} days.\nSources: ${topicToShow.source}.`

  return (
    <div className='topBar' onClick={handleBarClick}>
      <div className='headerFooterFont'><i className='fa-solid fa-book bookButton' ></i> {topicToShow.title}</div>
      <div className='headerText'>{cardText}</div>
    </div>
  )
}

const App = () => {

  const [topicToShow, setTopicToShow] = useState(null)
  const [topics, setTopics] = useState([])
  const [tasks, setTasks] = useState([])
  const [notes, setNotes] = useState([])

  useEffect(() => {
    topicService.getAll()
      .then(topics => {
        setTopics(topics)
      })
  }, [])

  useEffect(() => {
    taskService.getAll()
      .then(tasks => {
        setTasks(tasks)
      })
  }, [])

  useEffect(() => {
    noteService.getAll()
      .then(notes => {
        setNotes(notes)
      })
  }, [])

  const handleCardClick = (topic) => {
    if (topicToShow === null || topicToShow !== topic) {
      setTopicToShow(topic)
    } 
    else {
      setTopicToShow(null)
    }
   }

  const handleBarClick = () => {setTopicToShow(null)}

  return (
    <div className='container'>
      <TopBar topicToShow={topicToShow} handleBarClick={handleBarClick}/>
      <TopicBar topicToShow={topicToShow} handleBarClick={handleBarClick}/>
      <NewTopicCard topicToShow={topicToShow} setTopics={setTopics} topics={topics} />
      <NewTaskCard topicToShow={topicToShow} tasks={tasks} setTasks={setTasks} />
      <CardGrid topics={topics} tasks={tasks} handleCardClick={handleCardClick} topicToShow={topicToShow} setTopics={setTopics} setTopicToShow={setTopicToShow}/>
    </div>
  );
}

export default App;
