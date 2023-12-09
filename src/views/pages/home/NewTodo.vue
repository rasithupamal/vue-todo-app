<script setup>

import { useTodoStore } from "@/stores/todoStore.js";
import { reactive } from "vue";

const todoStore = useTodoStore();
let todoForm = reactive({
    title: "",
    description: ""
});
const saveTodo = async () => {
    try {
        const response = await todoStore.saveTodo(todoForm);
        if (response.status == 201) {
            todoForm.title = "";
            todoForm.description = "";
            emit("created", true);
        }
    } catch (error) {
        console.log(error);
    }
}
const emit = defineEmits(['created']);
</script>

<template>
    <div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="text-2xl">Add new Todo</h2>
            <form class="space-y-6" @submit.prevent="saveTodo">
                <div>
                    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                    <div class="mt-2">
                        <input id="title" name="title" type="text" required="" v-model="todoForm.title"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Description</label>

                    </div>
                    <div class="mt-2">
                        <textarea id="description" name="description" rows="3" cols="4" v-model="todoForm.description"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
                </div>
            </form>
        </div>
    </div>
</template>