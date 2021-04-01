const update = document.querySelectorAll('.complete')
const deleted = document.querySelectorAll('.delete')

Array.from(update).forEach((element) => {
  element.addEventListener('click', updateComplete)
})

Array.from(deleted).forEach((element) => {
  element.addEventListener('click', removeTodo)
})

async function updateComplete(){
  const todoName = this.parentNode.innerText
  console.log(todoName)

  try{
    const response = await fetch('todos', {
      method: 'put', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'todosX': todoName
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}

async function removeTodo(){
  const todoName = this.parentNode.innerText
  
  try{
    const response = await fetch('deleteTodo', {
      method: 'delete',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        'todosX': todoName
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}