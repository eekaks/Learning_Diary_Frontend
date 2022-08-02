const handleDeleteClick = (e, item, items, itemService, setItems) => {
    e.stopPropagation()
    const result = window.confirm(`Delete ${item.title} ?`)
    if (result === true) {
      itemService.remove(item.id)
        .then(deletedItem => {
        setItems(items.filter(oldItem => oldItem.id !== item.id))
      })
    }
  }

	const handleTopicDeleteClick = async (e, item, items, itemService, setItems, setTasks, tasks) => {
    e.stopPropagation()
    const result = window.confirm(`Delete ${item.title} ?`)
    if (result === true) {
      await itemService.remove(item.id)
			await setItems(items.filter(oldItem => oldItem.id !== item.id))
			await setTasks(tasks.filter(oldTask => oldTask.topic !== item.id))
    }
  }

const handleCheckClick = (e, item, itemService, setItems) => {
    e.stopPropagation()
    const id = item.id

    let updatedItem = item

    if (updatedItem.hasOwnProperty('done'))
    {
        updatedItem.done = !updatedItem.done
    }
    if (updatedItem.hasOwnProperty('inProgress'))
    {
        const completedDate = item.inProgress === false ? null : new Date()
        const timeSpent = item.inProgress === false ? 0 : Math.floor((new Date().getTime() - new Date(item.startLearningDate).getTime()) / 86400000)
        updatedItem.inProgress = !updatedItem.inProgress
        updatedItem.completionDate = completedDate
        updatedItem.timeSpent = timeSpent
    }
    
    itemService.update(id, updatedItem).then(returnedItem => {
      itemService.getAll()
      .then(items => {
        setItems(items)
      })
    })
  }

export { handleCheckClick, handleDeleteClick, handleTopicDeleteClick }