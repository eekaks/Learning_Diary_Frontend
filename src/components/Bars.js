import '../App.css';
import diaryLogo from './learningdiarylogo.png';
import PropTypes from 'prop-types';
import { useState } from 'react';
import loginService from '../services/login'
import topicService from '../services/topicService';
import userService from '../services/userService';

const SignupForm = ({setUser, setSignup, signup}) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const handleSignup = async (event) => {
		event.preventDefault()
		try {
			await userService.create( { username, name, password })
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
			setSignup(false)
		} catch (exception) {
			window.alert('sign up failed, possible duplicate username')
			setUsername('')
			setPassword('')
		}
	}

	return (
		<div className='signupBox'>
			<form onSubmit={handleSignup}>
			<div className='fullnameRow'>
				full name
					<input
					type="text"
					value={name}
					name="Full name"
					className='fullnameBox'
					onChange={({ target }) => setName(target.value)}
					/>
				</div>
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
				<button type='submit' className='loginButton'>SIGN UP</button>
				<button className='loginButton' onClick={() => setSignup(!signup)}>CANCEL</button>
			</form>
		</div>
	)

}

const LoginForm = ({setUser, setSignup, signup}) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

		const handleLogin = async (event) => {
			event.preventDefault()
			console.log('logging in ', username)

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
				window.alert('username and or password wrong')
				setUsername('')
				setPassword('')
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
					<button className='loginButton' onClick={() => setSignup(!signup)}>SIGN UP</button>
				</form>
			</div>
	) 
}

const Stats = ({user, topics, tasks, handleLogout}) => {

	const userTopics = topics.filter(topic => topic.sortingid === user.userid)
	const userTopicIDs = userTopics.map(topic => topic.id)
	const userTasks = tasks.filter(task => userTopicIDs.includes(task.topic))

	let stats = {
    topics: userTopics.length,
    completedTopics: userTopics.filter(topic => !topic.inProgress).length,
    tasks: userTasks.length,
    completedTasks: userTasks.filter(task => task.done).length
  }
	return (
		<>
		Logged in as {user.name}
		<div>You have completed {stats.completedTopics}/{stats.topics} topics.</div>
		<div>You have completed {stats.completedTasks}/{stats.tasks} tasks.</div>
		<button className='logoutButton' onClick={handleLogout}>LOGOUT</button>
		</>
	)
}

const TopBar = ({user, setUser, handleBarClick, topics, tasks}) =>  {

	const [signup, setSignup] = useState(false)

	const handleLogout = (event, setUser, user) => {
		event.preventDefault()
		console.log('logging out ', user.username)
		window.localStorage.clear()
		topicService.setToken(null)
		setUser(null)
	}
	
			return (
				<div className='topBar' onClick={handleBarClick}>
					<img src={diaryLogo} className='diaryLogo' alt='Learning diary'/>
					<div className='landingHeaderText'>
					{!user
						? <>{!signup ? <LoginForm setUser={setUser} setSignup={setSignup} signup={signup}/> : <SignupForm setUser={setUser} setSignup={setSignup} signup={signup}/>}</>
						: <Stats user={user} topics={topics} tasks={tasks} handleLogout={(event) => handleLogout(event, setUser, user)}/>
					}
					</div>
					<div className='warningText'>Don't save any sensitive information, only the passwords are encrypted.</div>
				</div>
			)
}

TopBar.propTypes = {
	handleBarClick: PropTypes.func.isRequired,
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