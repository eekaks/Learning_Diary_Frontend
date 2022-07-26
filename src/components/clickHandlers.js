
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
        updatedItem.inProgress = !updatedItem.inProgress
    }
    
    itemService.update(id, updatedItem).then(returnedItem => {
      itemService.getAll()
      .then(items => {
        setItems(items)
      })
    })
  }

export { handleCheckClick }