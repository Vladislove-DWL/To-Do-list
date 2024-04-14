let tasks = [
  {
    id: "1138465078061",
    completed: false,
    text: "Поробуйте создать новую задачу",
  },
  {
    id: "1138465078062",
    completed: false,
    text: "Попробуйте удалить эту задачу",
  },
  {
    id: "1138465078063",  
    completed: false,
    text: "Попробуйте поменять тему с помощью «Tab»",
  },
];


function addTask(whereToAdd, task) {
  //создаем все элементы
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  let div3 = document.createElement("div");
  let form = document.createElement("form");
  let input = document.createElement("input");
  let label = document.createElement("label");
  let span = document.createElement("span");
  let button = document.createElement("button");
  //добавляем к элементам классы/атрибуты
  div1.className = "task-item";
  div1.dataset.taskId = task.id;
  div2.className = "task-item__main-container";
  div3.className = "task-item__main-content";
  form.className = "checkbox-form";
  input.className = "checkbox-form__checkbox";
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", task.id);
  label.setAttribute("for", task.id);
  span.className = "task-item__text";
  span.innerText = task.text;
  button.className = "task-item__delete-button default-button delete-button";
  button.textContent = " Удалить ";

  //добавляем элементы в html
  form.append(input, label);
  div3.append(form, span);
  div2.append(div3, button);
  div1.append(div2); 

  whereToAdd.append(div1);
  goToDark();
}

for (let task of tasks) {
  addTask(document.querySelector(".tasks-list"), task)
};

const createTaskForm = document.querySelector('.create-task-block');
createTaskForm.addEventListener('submit', (event) => {
event.preventDefault();

const target = event.target; //обращаемся к самой форме

const createTaskBlockInput = target.taskName; //обращаемся ко всему инпуту 

const inputValue = createTaskBlockInput.value; //обращаемся к значению 

//создаем объект, который добавим в массив tasks
let newTask = {
id: String(Date.now()),
completed: false,
text: inputValue,
}

//создаем функцию, которую будем использовать для проверки
function example2(value) {
for (let task of tasks) {
  if (task.text === value) {
    return true;
  }
}
}

if (inputValue === '') {
if (document.querySelector('.error-message-block')) {
  let spanInHtml = document.querySelector('.error-message-block');
  spanInHtml.remove();
}
let errorMessage = document.createElement('span');
errorMessage.classList.add('error-message-block');
errorMessage.textContent = 'Название задачи не должно быть пустым';
createTaskForm.append(errorMessage);

} else if (example2(inputValue) === true) {
  let errorMessage = document.createElement('span');
  errorMessage.classList.add('error-message-block');
  errorMessage.textContent = 'Задача с таким названием уже существует';
  createTaskForm.append(errorMessage);

} else {
  if (document.querySelector('.error-message-block')) { // проверяем есть ли в html элемент с таким классом
  let spanInHtml = document.querySelector('.error-message-block'); // если есть, то обращаемся к нему
  spanInHtml.remove(); // и удаляем
  }
  tasks.push(newTask);
  addTask(document.querySelector(".tasks-list"), newTask);
}
})

function createModal() {
//создаем элементы
const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');

const header = document.createElement('h3');
const buttonCancel = document.createElement('button');
const buttonDelete = document.createElement('button');
// добавляем классы
div1.className = 'modal-overlay';
div2.className = 'delete-modal';
div3.className = 'delete-modal__buttons';
header.className = 'delete-modal__question';
header.textContent = 'Вы действительно хотите удалить эту задачу';
buttonCancel.className = 'delete-modal__button delete-modal__cancel-button';
buttonCancel.textContent = 'Отмена';
buttonDelete.className = 'delete-modal__button delete-modal__confirm-button';
buttonDelete.textContent = 'Удалить';
//добавляем в html
div3.append(buttonCancel, buttonDelete);
div2.append(header);
div2.append(div3);
div1.append(div2)

const body = document.querySelector('body');
body.append(div1);
}


const listOfTasks = document.querySelector('.tasks-list') //обращаемся к родителю
listOfTasks.addEventListener('click', (event) => {
const {target} = event;
const isDeleteButton = event.target.closest('.task-item__delete-button');
//провека, если нажатие на кнопку 'удалить'
if (isDeleteButton) {
    createModal();
  //находим id задачи
  const taskItemHTML = target.closest('.task-item');
  const taskId = taskItemHTML?.dataset.taskId;

  //если в модальном окне нажимаем на 'отмена'
  const cancelButton = document.querySelector('.delete-modal__button.delete-modal__cancel-button');
  cancelButton.addEventListener('click', () => {
  document.querySelector('.modal-overlay').remove();
  })
  //если в модальном окне нажимаем на 'удалить'
  const deleteButton = document.querySelector('.delete-modal__button.delete-modal__confirm-button');
  deleteButton.addEventListener('click', () => {
  const deletedTask = document.querySelector(`[data-task-id="${taskId}"]`);
  deletedTask.remove();
  document.querySelector('.modal-overlay').remove();

  let filtredtasks = tasks.filter((task) => {
    return task.id !== taskId
  })

  tasks = filtredtasks;
  
  })
  }
})

document.addEventListener('keydown', (event) => {
const {key} = event;
const body = document.querySelector('body');
let currentTheme = body.className;

if (key === 'Tab' && currentTheme === 'white-theme')  {
  body.className = 'dark - theme';
  body.style.background = '#24292E';

  const allTasks = document.querySelectorAll('.task-item');
  allTasks.forEach((task) => {
    task.style.color = '#ffffff';
  })

  const allButtons = document.querySelectorAll('button')
  allButtons.forEach((button) => { 
    button.style.border = '1px solid #ffffff';
  })

} else if (key === 'Tab')  {
body.className = 'white-theme';
body.style.background = 'initial';
const allTasks = document.querySelectorAll('.task-item');

  allTasks.forEach((task) => {
    task.style.color = 'initial';
  })

  const allButtons = document.querySelectorAll('button')
  allButtons.forEach((button) => { 
  button.style.border = 'initial';
  })

}
})

//для добавления задачи, когда включена темная тема
//эту функцию используем при создании задачи
function goToDark() {
if (document.body.className !== 'white-theme') {
const allTasks = document.querySelectorAll('.task-item');
  allTasks.forEach((task) => {
    task.style.color = '#ffffff';
  })

const allButtons = document.querySelectorAll('button')
  allButtons.forEach((button) => { 
    button.style.border = '1px solid #ffffff';
  })
}
}

