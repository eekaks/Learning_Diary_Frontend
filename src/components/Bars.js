import '../App.css';
import diaryLogo from './learningdiarylogo.png';
import PropTypes from 'prop-types';

  const TopBar = ({topicToShow, handleBarClick, stats}) =>  {
        return (
          <div className='topBar' onClick={handleBarClick}>
            <img src={diaryLogo} className='diaryLogo' alt='Learning diary'/>
            <div className='landingHeaderText'>
              <div>You have completed {stats.completedTopics}/{stats.topics} topics.</div>
              <div>You have completed {stats.completedTasks}/{stats.tasks} tasks.</div>
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