import {Todo} from "../models/todo.js"

class todoController{
    constructor() {
        this.TODOS = []
    }

    createTodo(req, res){
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)

        res.json({
            message: "Created new todo object",
            newTask: newTodo,
        })
    }

    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }

    updateTodo(req, res){
        const todoId = req.params.id
        const updatedTask = req.body.task
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)
        if(todoIndex < 0){
            throw new Error("Couldn't find todo!")
            res.json({
                message: "Couln't find todo with such index!"
            })
        }else{
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
        res.json({
            message: "Updated todo!",
            updateTask: this.TODOS[todoIndex]
        })}
    }

    deleteTodo(req, res){
        const todoId = req.params.id
        let deletedTaskId = this.TODOS.findIndex((todo) => todo.id === todoId)
        if(deletedTaskId < 0){
            throw new Error("Couldn't find todo!")
            res.json({
                message: "Couln't find todo with such index!"
            })
        }
        else {
        res.json({
            message: "Todo successfully deleted!",
            deleted_task: this.TODOS[deletedTaskId]
        })
        this.TODOS.splice(deletedTaskId, 1)
        }
    }
}
export const TodoController = new todoController()