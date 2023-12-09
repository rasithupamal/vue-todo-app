<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import { useAuthStore } from "@/stores/authStore.js";
import { useTodoStore } from "@/stores/todoStore.js";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import ActiveTodos from "@/views/pages/home/ActiveTodos.vue";
import ArchivedTodos from "@/views/pages/home/ArchivedTodos.vue";
import NewTodo from "@/views/pages/home/NewTodo.vue";
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const todoStore = useTodoStore();
const router = useRouter();

const { getAuthUser } = storeToRefs(authStore);

const todoStatus = ref("active");
const showTodoCreateForm = ref(false);
const showTodoUpdateForm = ref(false);
const loadAuthUser = async () => {
    await authStore.authUser();
}
const loadTodos = async () => {
    await todoStore.allTodos();
}
const loadArchivedTodos = async () => {
    await todoStore.allArchivedTodos();
}

const viewTodos = (status) => {
    todoStatus.value = status;
}

const toggleCreateTodoForm = () => {
    showTodoCreateForm.value = !showTodoCreateForm.value;
}

const hideTodoCreatedForm = (value) => {
    showTodoCreateForm.value = !value;
}
let updateTodoId = ref(null);
let todoUpdateForm = reactive({
    title: "",
    description: ""
});
const showEditTodoForm = (id) => {
    showTodoUpdateForm.value = true;
    updateTodoId.value = id;
    setUpdateTodoForm(id);

}

const setUpdateTodoForm = async (id) => {
    const response = await todoStore.findById(id);
    todoUpdateForm.title = response.data.title;
    todoUpdateForm.description = response.data.description;
}

const updateTodo = async () => {
    try {
        const response = await todoStore.editTodo(todoUpdateForm, updateTodoId.value);
        if (response.status == 200) {
            updateTodoId = null;
            todoUpdateForm.title = "";
            todoUpdateForm.description = "";
            showTodoUpdateForm.value = false;
        }
    } catch (error) {
        console.log(error);
    }
}

const signOut = async () => {
    try {
        const res = await authStore.userLogout();
        if (res.status == 200) {
            router.replace({
                name: 'auth.login'
            })
        }

    } catch (error) {
        console.log(error, "logout er");
    }

}


onMounted(() => {
    loadAuthUser();
    loadTodos();
    loadArchivedTodos();
});
</script>
<template>
    <div>
        <!-- Home Page
        {{ getAllTodos }}
        {{ getAllArchivedTodos }} -->
        <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 justify-between">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex flex-shrink-0 items-center">
                            <h3 class="text-2xl">Todo App</h3>
                        </div>
                        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->

                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative ml-3">
                            <div>
                                <MenuButton
                                    class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span class="absolute -inset-1.5" />
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="" />
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-200"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-slot="{ active }">
                                    <button @click="signOut"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign
                                        out</button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="sm:hidden">
                <div class="space-y-1 pb-4 pt-2">
                </div>
            </DisclosurePanel>
        </Disclosure>
        <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div>
                <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h3 class="text-base font-semibold leading-6 text-gray-900">My Todos</h3>
                        <button type="button" @click="viewTodos('active')"
                            :class="{ 'bg-green-400': todoStatus == 'active' }"
                            class="inline-flex mr-6 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Active
                            todos</button>
                        <button type="button" @click="viewTodos('archived')"
                            :class="{ 'bg-green-400': todoStatus == 'archived' }"
                            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Archived
                            Todos</button>
                    </div>
                    <div class="mt-3 sm:ml-4 sm:mt-0">
                        <button type="button" @click="toggleCreateTodoForm"
                            class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create
                            new todo</button>
                    </div>
                </div>

            </div>
            <div class="grid grid-cols-2">

                <div class="grid-col-1">
                    <template v-if="todoStatus == 'active'">
                        <ActiveTodos @edit="showEditTodoForm"></ActiveTodos>
                    </template>
                    <template v-if="todoStatus == 'archived'">
                        <ArchivedTodos></ArchivedTodos>
                    </template>
                </div>
                <div class="grid-col-1">
                    <div>
                        <template v-if="showTodoCreateForm">
                            <NewTodo @created="hideTodoCreatedForm"> </NewTodo>
                        </template>
                        <template v-if="showTodoUpdateForm">
                            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 class="text-2xl">Add new Todo</h2>
                                <form class="space-y-6" @submit.prevent="updateTodo">
                                    <div>
                                        <label for="title"
                                            class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                        <div class="mt-2">
                                            <input id="title" name="title" type="text" required=""
                                                v-model="todoUpdateForm.title"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div>
                                        <div class="flex items-center justify-between">
                                            <label for="password"
                                                class="block text-sm font-medium leading-6 text-gray-900">Description</label>

                                        </div>
                                        <div class="mt-2">
                                            <textarea id="description" name="description" rows="3" cols="4"
                                                v-model="todoUpdateForm.description"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit"
                                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
                                    </div>
                                </form>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>