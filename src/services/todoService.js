import Apiclient from "./api";

const API_URL = `${import.meta.env.VITE_API_URL}/`;

class TodoService {
    async createTodo(todo) {
        return await Apiclient
            .post(API_URL + 'todos', todo);
    }
    async updateTodo(todo, id) {
        return await Apiclient
            .put(API_URL + `todos/${id}`, todo);
    }
    async archiveTodo(id) {
        return await Apiclient
            .put(API_URL + `todos/${id}/archive`, {});
    }
    async unarchiveTodo(id) {
        return await Apiclient
            .put(API_URL + `todos/${id}/unarchive`, {});
    }
    async deleteTodo(id) {
        return await Apiclient
            .delete(API_URL + `todos/${id}`);
    }
    async listTodos() {
        return await Apiclient
            .get(API_URL + `todos`);
    }
    async listArchivedTodos() {
        return await Apiclient
            .get(API_URL + `todos/archived/list`);
    }
    async findById(id) {
        return await Apiclient
            .get(API_URL + `todos/${id}`);
    }
}

export default new TodoService();