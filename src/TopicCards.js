import '../App.css';
import { useState, useEffect } from 'react';
import topicService from '../services/topicService';
import taskService from '../services/taskService';
import noteService from '../services/noteService';

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
      const updatedTopic = {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        estimatedTimeToMaster: topic.estimatedTimeToMaster,
        timeSpent: topic.timeSpent,
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
  
    const cardText = `${topic.description}\n\nStarted learning: ${new Date(topic.startLearningDate).toDateString()}\n\nEstimated time to master: ${topic.estimatedTimeToMaster} days\n\nSources: ${topic.source}`
  
    const handleCheckClick = e => {
      e.stopPropagation()
      const id = topic.id
      const completedDate = topic.inProgress === false ? null : new Date()
      const updatedTopic = {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        estimatedTimeToMaster: topic.estimatedTimeToMaster,
        timeSpent: topic.timeSpent,
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

export {TopicCard, NewTopicCard, FinishedTopicCard};