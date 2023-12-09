import { defineStore } from 'pinia'
import TodoService from "@/services/todoService";
export const useTodoStore = defineStore('todo', {
    state: () => ({ todos: [], archivedTodos: [] }),
    getters: {
        getAllTodos: (state) => { return state.todos },
        getAllArchivedTodos: (state) => { return state.archivedTodos },
    },
    actions: {
        async saveTodo(data) {
            try {
                const response = await TodoService.createTodo(data);
                this.allTodos();
                this.allArchivedTodos();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async findById(id) {
            try {
                const response = await TodoService.findById(id);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async editTodo(data, id) {
            try {
                const response = await TodoService.updateTodo(data, id);
                this.allTodos();
                this.allArchivedTodos();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async archive(id) {
            try {
                const response = await TodoService.archiveTodo(id);
                this.allTodos();
                this.allArchivedTodos();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async unarchive(id) {
            try {
                const response = await TodoService.unarchiveTodo(id);
                this.allTodos();
                this.allArchivedTodos();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async deleteTodo(id) {
            try {
                const response = await TodoService.deleteTodo(id);
                this.allTodos();
                this.allArchivedTodos();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async allTodos() {
            try {
                const response = await TodoService.listTodos();
                this.todos = response.data.data;
            } catch (error) {
                throw error;
            }
        },
        async allArchivedTodos() {
            try {
                const response = await TodoService.listArchivedTodos();
                this.archivedTodos = response.data.data;
            } catch (error) {
                throw error;
            }
        },
    }
})