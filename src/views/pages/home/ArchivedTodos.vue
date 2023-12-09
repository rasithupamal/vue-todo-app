<script setup>
import { useTodoStore } from "@/stores/todoStore.js";
import { storeToRefs } from "pinia";

const todoStore = useTodoStore();

const { getAllArchivedTodos } = storeToRefs(todoStore);


const unarchiveTodo = async (id) => {
    try {
        const response = await todoStore.unarchive(id);
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <div>
        <ul role="list" class="divide-y divide-white/5">
            <template v-if="getAllArchivedTodos.length > 0">
                <li v-for="todo in getAllArchivedTodos" :key="todo.id" class="relative flex items-center space-x-4 py-4">
                    <div class="min-w-0 flex-auto">
                        <div class="flex items-center gap-x-3">

                            <h2 class="min-w-0 text-sm font-semibold leading-6 text-black">
                                <a class="flex gap-x-2">
                                    {{ todo.title }}
                                </a>
                            </h2>
                        </div>
                        <div class="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                            <p>{{ todo.description }}</p>
                        </div>
                    </div>
                    <button type="button" @click="unarchiveTodo(todo.id)"
                        class="inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Unarchive</button>
                </li>
            </template>
            <li v-else>No Archived Todos</li>
        </ul>
    </div>
</template>