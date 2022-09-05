const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteTodo);
});

Array.from(todoItem).forEach((el) => {
  el.addEventListener('click', markComplete);
});

Array.from(todoComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});



async function deleteTodo() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch('todos/deleteTodo', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch('todos/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch('todos/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

// API
// const movieSearch = document.querySelector('.movieSubmit');
// const name = document.querySelector('.movieName');

// movieSearch.addEventListener('click', getMovies);

// function getMovies() {
//   let movName = document.querySelector('.movieName').value;

//   fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=06a092c024c1758ff5f69e8664a2042e&language=en-US&query=${movName}&page=1&include_adult=false`
//   )
//     .then((res) => res.json())

//     .then((data) => {
//       obj = JSON.parse(JSON.stringify(data));
//       console.log(obj);
//     })

//     .catch((err) => {
//       console.log(`error ${err}`);
//     });
// }
