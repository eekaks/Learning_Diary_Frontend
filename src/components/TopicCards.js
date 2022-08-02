import '../App.css';
import { useState } from 'react';
import topicService from '../services/topicService';
import { handleCheckClick, handleDeleteClick, handleTopicDeleteClick } from './clickHandlers';
import PropTypes from 'prop-types';

const NewTopicCard = ({setTopics, topics}) => {

  const [newTitle, setNewTitle] = useState('Enter new topic title')
  const [newDesc, setNewDesc] = useState('Enter description')
  const [newEstimate, setNewEstimate] = useState('Enter days to master')
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

    const parsed = parseFloat(newEstimate)

    if (newTitle === 'Enter new topic title')
    {
      window.alert('Enter a title')
    }
    else if (newDesc === 'Enter description')
    {
      window.alert('Enter a description')
    }
    else if (newEstimate === 'Enter estimated time to master')
    {
      window.alert('Enter days to master')
    }
    else if (!Number.isInteger(parsed))
    {
      window.alert('Enter an integer number as estimate')
    }
    else if (newSource === 'Enter sources')
    {
      window.alert('Enter sources or leave empty')
    }
    else 
    {
      const newTopic = {
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
      setNewEstimate('Enter days to master')
      setNewSource('Enter sources')
    }
  }

  return (
    <div className='card newCard'>
      <div className='cardTop'>
        <input className='inputTitle' value={newTitle} onChange={handleTitleChange} onClick={() => { if (newTitle==='Enter new topic title'){setNewTitle('')}}}/>
      </div>
      <div className='cardBottom'>
        <input className='input' value={newDesc} onChange={handleDescChange} onClick={() => { if (newDesc==='Enter description'){setNewDesc('')}}}/>
        <input className='input' value={newEstimate} onChange={handleEstimateChange} onClick={() => { if (newEstimate==='Enter days to master'){setNewEstimate('')}}}/>
        <input className='input' value={newSource} onChange={handleSourceChange} onClick={() => { if (newSource==='Enter sources'){setNewSource('')}}}/>
        <i className='fa-solid fa-floppy-disk fa-2xl' onClick={handleSaveClick}></i>

      </div>
    </div>
  )
}

NewTopicCard.propTypes = {
  topics: PropTypes.array.isRequired,
  setTopics: PropTypes.func.isRequired,
}

const TopicCard = ({topic, topics, setTopics, handleCardClick, tasks, setTasks}) => {

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

  const cardText = `${topic.description}\n\nStarted learning: ${new Date(topic.startLearningDate).toDateString()}\n\nDays to master: ${topic.estimatedTimeToMaster} days\n\nSources: ${topic.source}`

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
      .then(setEditTopic(!editTopic))
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
          <i className="fa-solid fa-check fa-xl checkTick" onClick={(e) => {handleCheckClick(e, topic, topicService, setTopics)}}></i>
        </div>
        <div className='cardBottom'>
          {cardText}
        </div>
        <i className="fa-solid fa-pen-to-square fa-2xl topicEdit" onClick={handleEditClick}></i>
        <i className='fa-solid fa-floppy-disk fa-2xl editSave' onClick={handleSaveClick}></i>
        <i className='fa-solid fa-trash-can fa-2xl' onClick={(e) => {handleTopicDeleteClick(e, topic, topics, topicService, setTopics, setTasks, tasks)}}></i>
      </div>
    )
  }
  else
  {
    return (
      <div className='card' >
        <div className='cardTop'>
          <input className='inputTitle' value={newTitle} onChange={handleTitleChange} onClick={() => setNewTitle('')}/>
        </div>
        <div className='cardBottom'>
          <input className='input' value={newDesc} onChange={handleDescChange} onClick={() => setNewDesc('')}/>
            <div className='inputLine'>
              <div className='textBeforeInput'>Days to master: </div>
              <input className='input inputAfterText' value={newEstimate} onChange={handleEstimateChange} onClick={() => setNewEstimate('')}/>
            </div>
            <div className='inputLine'>
              <div className='textBeforeInput'>Sources: </div>
              <input className='input inputAfterText' value={newSource} onChange={handleSourceChange} onClick={() => setNewSource('')}/>
            </div>
        </div>
        <i className="fa-solid fa-pen-to-square fa-2xl topicEdit" onClick={handleEditClick}></i>
        <i className='fa-solid fa-floppy-disk fa-2xl editSave' onClick={handleSaveClick}></i>
        <i className='fa-solid fa-trash-can fa-2xl' onClick={(e) => {handleDeleteClick(e, topic, topics, topicService, setTopics)}}></i>
      </div>
    )
  }
}

TopicCard.propTypes = {
  topic: PropTypes.object.isRequired,
  topics: PropTypes.array.isRequired,
  setTopics: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired
}

const FinishedTopicCard = ({topic, setTopics}) => {

  const cardText = `${topic.description}\n\nStarted learning: ${new Date(topic.startLearningDate).toDateString()}\n\nTime spent: ${topic.timeSpent} days\n\nSources: ${topic.source}`

  return (
    <div className='card finishedCardBorder'>
      <div className='cardTop finishedCard'>
        <strong>{topic.title}</strong>
        <i className="fa-solid fa-check fa-xl checkTick" onClick={(e) => {handleCheckClick(e, topic, topicService, setTopics)}}></i>
      </div>
      <div className='cardBottom'>
        {cardText}
      </div>
    </div>
  )
}

FinishedTopicCard.propTypes = {
  topic: PropTypes.object.isRequired,
  setTopics: PropTypes.func.isRequired
}

export { TopicCard, NewTopicCard, FinishedTopicCard };