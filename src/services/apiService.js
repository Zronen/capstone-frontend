import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000';



// 'export function' allows for other files to import it
// other files follow this syntax to import:
// import { fetchTasks, addTask, deleteTask } from 'path/to/services';
export function fetchTasks() {
    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tasks => tasks.map(task => ({
            ...task,
            title: task.description
        })))
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Add a new task
export function addTask(newItemText) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description: newItemText,
            completed: false
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(newTask => ({
            ...newTask,
            title: newTask.description
        }))
        .catch(error => {
            console.error('There has been a problem with your add operation:', error);
        });
}

// Delete a task
export function deleteTask(id) {
    return fetch(`${API_URL}${id}/`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.ok;
        })
        .catch(error => {
            console.error('There has been a problem with your delete operation:', error);
        });
}

export function fetchMessage() {
    return fetch(`${API_URL}/apiSendData/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tasks => tasks.map(task => ({
            ...task,
            title: task.description,
            sender: task.sender,
            res1: task.res1,
            res2: task.res2,
            res3: task.res3,
            link1: task.link1,
            link2: task.link2,
            link3: task.link3
        })))
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

export function addMessage(newItemText) {
    return fetch(`${API_URL}/apiAskQuestion/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify({
            description: newItemText,
            //completed: false
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(newTask => ({
            ...newTask,
            title: newTask.description,
            sender: newTask.sender,
            res1: newTask.res1,
            res2: newTask.res2,
            res3: newTask.res3,
            link1: newTask.link1,
            link2: newTask.link2,
            link3: newTask.link3
        }))
        .catch(error => {
            console.error('There has been a problem with your add operation:', error);
        });
}