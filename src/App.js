import './App.css';
import { useState, useEffect } from 'react';
import topicService from './services/topicService';
import taskService from './services/taskService';
import noteService from './services/noteService';

const CardGrid = ({topics, tasks, handleCardClick, topicToShow}) => {
  if (topicToShow === null)
  {
  return (
    topics.map(topic =>
      <TopicCard key={topic.id} topic={topic} handleCardClick={handleCardClick}/>)
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

const TopicCard = ({topic, handleCardClick}) => {

  const cardText = `${topic.description}\n\nStarted learning: ${topic.startLearningDate}\n\nEstimated time to master: ${topic.estimatedTimeToMaster} days.\n\nSources: ${topic.source}.`
  return (
    <div className='card' onClick={() => handleCardClick(topic)}>
      <div className='cardTop'>
        <strong>{topic.title}</strong>
      </div>
      <div className='cardBottom'>
        {cardText}
      </div>
    </div>
  )
}

const TaskCard = ({task}) => {

  const cardText = `${task.description}\n\nDeadline: ${task.deadline}\n\nPriority: ${task.priority} days.\n\nDone: ${task.done}.`
  return (
    <div className='card'>
      <div className='cardTop'>
        <strong>{task.title}</strong>
      </div>
      <div className='cardBottom'>
        {cardText}
      </div>
    </div>
  )
}

const TopBar = ({topicToShow}) =>  {
  if (topicToShow === null)
  {
    return (
      <div className='topBar headerFooterFont'><i className="fa-solid fa-book bookButton"></i> Learning Diary</div>
    )
  }
  return null
}

const TopicBar = ({topicToShow, handleBookClick}) => {
  if (topicToShow === null)
  {
    return null
  }

  const cardText = `${topicToShow.description}\nStarted learning: ${topicToShow.startLearningDate}\nEstimated time to master: ${topicToShow.estimatedTimeToMaster} days.\nSources: ${topicToShow.source}.`

  return (
    <div className='topBar'>
      <div className='headerFooterFont'>
      <i className="fa-solid fa-book bookButton" onClick={handleBookClick}></i> {topicToShow.title}
      </div>
      <div>{cardText}</div>
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

  const handleCardClick = (topic) => {topicToShow === null || topicToShow !== topic ? setTopicToShow(topic) : setTopicToShow(null)}

  const handleBookClick = () => {setTopicToShow(null)}

  return (
    <div className='container'>
      <TopBar topicToShow={topicToShow} />
      <TopicBar topicToShow={topicToShow} handleBookClick={handleBookClick}/>
      <CardGrid topics={topics} tasks={tasks} handleCardClick={handleCardClick} topicToShow={topicToShow} />
    </div>
  );
}

export default App;
