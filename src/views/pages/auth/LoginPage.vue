<script setup>

import { useAuthStore } from "@/stores/authStore.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";


const authStore = useAuthStore();
const router = useRouter();

let validationErrors = reactive({});
const loginForm = reactive({
    email: "",
    password: "",
    remember_me: false
});

const userSignIn = async () => {
    try {
        validationErrors = {};
        const response = await authStore.login(loginForm);
        if (response.status == 200) {
            router.replace({ name: 'home' })
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status == 422) {
                validationErrors = error.response.data.errors;
            }
        }
    }
}
</script>
<template>
    <div>
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form @submit.prevent="userSignIn" class="space-y-6" action="#" method="POST">

                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" required=""
                                v-model="loginForm.email"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <p v-if="validationErrors.email" class="mt-2 text-sm text-red-600">
                            {{ validationErrors.email[0] }}</p>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password" required=""
                                v-model="loginForm.password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <p v-if="validationErrors.password" class="mt-2 text-sm text-red-600">
                            {{ validationErrors.password[0] }}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                v-model="loginForm.remember_me" />
                            <label for="remember_me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            in</button>
                    </div>
                </form>
            </div>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a account?
                {{ ' ' }}
                <a href="/auth/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register
                    here</a>
            </p>
        </div>
    </div>
</template>