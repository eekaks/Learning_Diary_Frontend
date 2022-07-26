import '../App.css';
import PropTypes from 'prop-types';

  const TopBar = ({topicToShow, handleBarClick, stats}) =>  {
      if (topicToShow === null)
      {
        return (
          <div className='topBar' onClick={handleBarClick}>
            <div className='headerFooterFont'><i className='fa-solid fa-book bookButton'></i> Learning Diary</div>
            <div className='headerText'>
              <div>You have completed {stats.completedTopics}/{stats.topics} topics.</div>
              <div>You have completed {stats.completedTasks}/{stats.tasks} tasks.</div>
            </div>
          </div>
        )
      }
      return null
  }

  TopBar.propTypes = {
    topicToShow: PropTypes.object,
    handleBarClick: PropTypes.func.isRequired,
    stats: PropTypes.object.isRequired
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

  TopicBar.propTypes = {
    topicToShow: PropTypes.object,
    handleBarClick: PropTypes.func.isRequired,
  }

export { TopBar, TopicBar };