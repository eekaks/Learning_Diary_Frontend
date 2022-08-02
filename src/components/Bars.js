import '../App.css';
import diaryLogo from './learningdiarylogo.png';
import PropTypes from 'prop-types';
import { useState } from 'react';
import loginService from '../services/login'
import topicService from '../services/topicService';

const LoginForm = ({setUser}) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

		const handleLogin = async (event) => {
			event.preventDefault()
			console.log('logging in with', username, password)

			try {
				const user = await loginService.login({
					username, password,
				})
				window.localStorage.setItem(
					'loggedDiaryappUser', JSON.stringify(user)
				) 
				topicService.setToken(user.token)
				setUser(user)
				setUsername('')
				setPassword('')
			} catch (exception) {
				console.log('wrong credentials')
			}
		}
	return (
		<div className='loginBox'>
				<form onSubmit={handleLogin}>
				<div className='usernameRow'>
					username
						<input
						type="text"
						value={username}
						name="Username"
						className='usernameBox'
						onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div className='passwordRow'>
					password
						<input
						type="password"
						value={password}
						name="Password"
						className='passwordBox'
						onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit" className='loginButton'>LOGIN</button>
				</form>
			</div>
	)
}

const Stats = ({user, stats, handleLogout}) => {
	return (
		<>
		Logged in as {user.name}
		<div>You have completed {stats.completedTopics}/{stats.topics} topics.</div>
		<div>You have completed {stats.completedTasks}/{stats.tasks} tasks.</div>
		<button className='logoutButton' onClick={handleLogout}>LOGOUT</button>
		</>
	)
}

  const TopBar = ({user, setUser, handleBarClick, stats}) =>  {

		const handleLogout = (event, setUser, user) => {
			event.preventDefault()
			console.log('logging out with', user.username)
			window.localStorage.clear()
			topicService.setToken(null)
			setUser(null)
		}
		
        return (
          <div className='topBar' onClick={handleBarClick}>
            <img src={diaryLogo} className='diaryLogo' alt='Learning diary'/>
            <div className='landingHeaderText'>
						{!user
							? <LoginForm setUser={setUser} />
							: <Stats user={user} stats={stats} setUser={setUser} handleLogout={(event) => handleLogout(event, setUser, user)}/>
						}
            </div>
          </div>
        )
  }

  TopBar.propTypes = {
    handleBarClick: PropTypes.func.isRequired,
    stats: PropTypes.object.isRequired
  }

  const TopicBar = ({topicToShow, handleBarClick}) => {
  
    const cardText = `${topicToShow.description}\nStarted learning: ${new Date(topicToShow.startLearningDate).toDateString()}\nEstimated time to master: ${topicToShow.estimatedTimeToMaster} days.\nSources: ${topicToShow.source}`
  
    return (
      <div className='topicBar' onClick={handleBarClick}>
        <div className='headerFooterFont'><i className='fa-solid fa-book bookButton' ></i> {topicToShow.title}</div>
        <div className='headerText'>{cardText}</div>
      </div>
    )
  }

  TopicBar.propTypes = {
    topicToShow: PropTypes.object.isRequired,
    handleBarClick: PropTypes.func.isRequired,
  }

export { TopBar, TopicBar };