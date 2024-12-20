import {Todo} from "../models/todo.js"
import { fileManager } from "../files.js" 

class todoController{
    constructor() {
        this.initTodos()
    }
    async initTodos(){
        const todosData = await fileManager.readFile("./data/todos.json")
        console.log("Read Todos Data: ", todosData);
        if(todosData !== null){
            this.TODOS = todosData
        } else {
            this.TODOS = []
        }
    }

    async createTodo(req, res){
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)
        await fileManager.writeFile("./data/todos.json", this.TODOS)
        
        res.json({
            message: "Created new todo object",
            newTask: newTodo,
        })
    }

    getTodos(req, res){
        console.log("Sending Todos: ", this.TODOS);
        res.json({tasks: this.TODOS})
    }

    async updateTodo(req, res){
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
        await fileManager.writeFile("./data/todos.json", this.TODOS)
        res.json({
            message: "Updated todo!",
            updateTask: this.TODOS[todoIndex]
        })}
    }

    async deleteTodo(req, res){
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
        await fileManager.writeFile("./data/todos.json", this.TODOS)
        }
    }
}
export const TodoController = new todoController()