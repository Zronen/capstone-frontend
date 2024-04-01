import React, { Component, useRef, useEffect } from 'react';
import { animateScroll } from "react-scroll";
import TodoItem from './TodoItem';
import { fetchTasks, addTask, deleteTask, addMessage, fetchMessage } from '../services/apiService';
import nextArrow from '../images/Polygon 13.png';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: props.initialItems,
            showAddItemInput: false,
            newItemText: '',
        };
    }

    componentDidMount() {
        this.reloadItems()
        /*fetchMessage()
            .then(tasks => {
                const formattedTasks = tasks.map(task => ({
                    ...task,
                    title: task.description
                }));
                this.setState({ todoList: formattedTasks });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });*/
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.todoList.length !== this.state.todoList.length) {
            console.log("TodoList has been updated, new item added or deleted");
        }
    }


    handleInputChange = (e) => {
        this.setState({ newItemText: e.target.value });
    }

    addItem = () => {
        const { newItemText } = this.state;
        addMessage(newItemText)
            .then(newTask => {
                this.setState(prevState => ({
                    todoList: [...prevState.todoList, { ...newTask, title: newTask.description }],
                    newItemText: '',
                    showAddItemInput: true
                }));
                //window.location.reload(false);
                this.reloadItems()
            })
            .catch(error => {
                console.error('There has been a problem with your add operation:', error);
            });
    }

    deleteItem = (id) => {
        deleteTask(id)
            .then(() => {
                const filteredItems = this.state.todoList.filter(item => item.id !== id);
                this.setState({ todoList: filteredItems });
            })
            .catch(error => {
                console.error('There has been a problem with your delete operation:', error);
            });
    }

    reloadItems = () =>{
        fetchMessage()
            .then(tasks => {
                const formattedTasks = tasks.map(task => ({
                    ...task,
                    title: task.description
                }));
                this.setState({ todoList: formattedTasks }, this.scrollToBottom);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    renderItems = () => {
        return this.state.todoList.map(item => (
            <TodoItem
                key={item.id}
                id={item.id}
                title={item.title}
                completed={item.completed}
                onDelete={this.deleteItem}
                sender={item.sender}
                res1 = {item.res1}
                res2 = {item.res2}
                res3 = {item.res3}
                link1 = {item.link1}
                link2 = {item.link2}
                link3 = {item.link3}
            />
        ));
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "options-holder"
        });
    }


    render() {
        const { showAddItemInput, newItemText } = this.state;

        return (

            <main className="container" >
                <div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                </div>

                <div className="row" >
                    <div className="col-md-6 col-sm-10 mx-auto p-0 ">
                        <div className="card vh-100" id="appHolder" >

                            <div className="card position-sticky vh-100 overflow-auto border-0" id="options-holder" >
                            <ul className="list-group list-group-flush border-top-0 border-0 position-sticky" id="appHolder">
                                {this.renderItems() }
                            </ul>
                            </div>

                            <div className="mb-3 position-sticky-bottom-50 row align-items-start row-cols-2 pt-3 ms-3 me-3 rounded-5 shadow rounded mt-3" id="inputRow">
                                <div className="col-9 ">
                                        <input
                                            type="text"
                                            className="form-control mb-3 border-0"
                                            value={newItemText}
                                            onChange={this.handleInputChange}
                                            placeholder="How can we help?"
                                            id="inputBar"

                                        />
                                </div>
                                <div className="col-sm">
                                        <button className="ms-5 mt-2 ps-4 " onClick={this.addItem} id="inputButton">
                                            <img id="arrowImg" src={nextArrow}></img>
                                        </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

// when you use export default you can import with import AnyNameyouWant from './TodoList.js';
export default TodoList;