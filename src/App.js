import './App.css';
import { useState, useEffect } from 'react';
import topicService from './services/topicService';
import taskService from './services/taskService';
import { TopBar, TopicBar } from './components/Bars';
import { TopicCard, NewTopicCard, FinishedTopicCard } from './components/TopicCards';
import { TaskCard, NewTaskCard, FinishedTaskCard } from './components/TaskCards';
import PropTypes from 'prop-types';

const CardGrid = ({user, topics, tasks, handleCardClick, topicToShow, setTopics, setTopicToShow, setTasks}) => {

	const checkTopicOwner = (topic, user) => {
		return topic.sortingid === user.userid
	}

	
  if (topicToShow === null)
  {
  return (
    <>
    {topics.filter(topic => topic.inProgress && checkTopicOwner(topic, user)).map(topic =>
      <TopicCard key={topic.id} topic={topic} topics={topics} handleCardClick={handleCardClick} setTopics={setTopics} setTopicToShow={setTopicToShow} tasks={tasks} setTasks={setTasks}/>)}
    {topics.filter(topic => !topic.inProgress && checkTopicOwner(topic, user)).map(topic =>
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
  handleCardClick: PropTypes.func.isRequired,
}

const App = () => {

  const [topicToShow, setTopicToShow] = useState(null)
  const [topics, setTopics] = useState([])
  const [tasks, setTasks] = useState([])
	const [user, setUser] = useState(null)

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
    const loggedUserJSON = window.localStorage.getItem('loggedDiaryappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      topicService.setToken(user.token)
    }
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
      {!topicToShow
        ? 
        <>
          <TopBar handleBarClick={handleBarClick} topics={topics} tasks={tasks} user={user} setUser={setUser}/>
          {user ? <NewTopicCard setTopics={setTopics} topics={topics}/> : null}
        </>
        : 
        <>
          <TopicBar topicToShow={topicToShow} handleBarClick={handleBarClick}/>
          <NewTaskCard topicToShow={topicToShow} tasks={tasks} setTasks={setTasks}/>
        </>
      }
      {user ? <CardGrid user={user} topics={topics} tasks={tasks} handleCardClick={handleCardClick} topicToShow={topicToShow} setTopics={setTopics} setTopicToShow={setTopicToShow} setTasks={setTasks}/> : null}
    </div>
  );
}

export default App;
