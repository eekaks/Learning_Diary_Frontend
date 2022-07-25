import './App.css';

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

export { TopBar, TopicBar };