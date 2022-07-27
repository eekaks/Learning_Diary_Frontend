import './App.css';
import { useState, useEffect } from 'react';
import topicService from './services/topicService';
import taskService from './services/taskService';
import noteService from './services/noteService';
import { TopBar, TopicBar } from './components/Bars';
import { TopicCard, NewTopicCard, FinishedTopicCard } from './components/TopicCards';
import { TaskCard, NewTaskCard, FinishedTaskCard } from './components/TaskCards';
import PropTypes from 'prop-types';

const CardGrid = ({topics, tasks, handleCardClick, topicToShow, setTopics, setTopicToShow, setTasks}) => {
  if (topicToShow === null)
  {
  return (
    <>
    {topics.filter(topic => topic.inProgress).map(topic =>
      <TopicCard key={topic.id} topic={topic} topics={topics} handleCardClick={handleCardClick} setTopics={setTopics} setTopicToShow={setTopicToShow}/>)}
    {topics.filter(topic => !topic.inProgress).map(topic =>
      <FinishedTopicCard key={topic.id} topic={topic} setTopics={setTopics}/>)}
    </>
  )
  }
  else
  {
    return (
      <>
      {tasks.filter(task => task.topic === topicToShow.id && !task.done).sort((a, b) => { return a.priority - b.priority}).map(task =>
        <TaskCard key={task.id} task={task} tasks={tasks} setTasks={setTasks} topicToShow={topicToShow} />)}
      {tasks.filter(task => task.topic === topicToShow.id && task.done).map(task =>
        <FinishedTaskCard key={task.id} task={task} setTasks={setTasks} />)}
      </>
    )
  }
}

CardGrid.propTypes = {
  topics: PropTypes.array,
  tasks: PropTypes.array,
  setTopics: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  topicToShow: PropTypes.object,
  setTopicToShow: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired
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

  let stats = {
    topics: topics.length,
    completedTopics: topics.filter(topic => !topic.inProgress).length,
    tasks: tasks.length,
    completedTasks: tasks.filter(task => task.done).length
  }

  return (
    <div className='container'>
      <TopBar topicToShow={topicToShow} handleBarClick={handleBarClick} stats={stats}/>
      <TopicBar topicToShow={topicToShow} handleBarClick={handleBarClick}/>
      <NewTopicCard topicToShow={topicToShow} setTopics={setTopics} topics={topics} />
      <NewTaskCard topicToShow={topicToShow} tasks={tasks} setTasks={setTasks} />
      <CardGrid topics={topics} tasks={tasks} handleCardClick={handleCardClick} topicToShow={topicToShow} setTopics={setTopics} setTopicToShow={setTopicToShow} setTasks={setTasks}/>
    </div>
  );
}

export default App;
