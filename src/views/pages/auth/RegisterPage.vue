<script setup>
import { useAuthStore } from "@/stores/authStore.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

let validationErrors = reactive({});
const registerForm = reactive({
    name: "",
    email: "",
    password: "",
    c_password: "",
});

const userSignUp = async () => {
    try {
        validationErrors = {};
        const response = await authStore.register(registerForm);
        if (response.status == 201) {
            router.replace({ name: 'home' })
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status == 422) {
                validationErrors = error.response.data.errors;
            }
        }
        console.log(error, "catch Error");
    }
}
</script>
<template>
    <div>
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form @submit.prevent="userSignUp" class="space-y-6" action="#" method="POST">
                    <div>
                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" required="" v-model="registerForm.name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <p v-if="validationErrors.name" class="mt-2 text-sm text-red-600">
                            {{ validationErrors.name[0] }}</p>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" required=""
                                v-model="registerForm.email"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <p v-if="validationErrors.email" class="mt-2 text-sm text-red-600">
                            {{ validationErrors.email[0] }}</p>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password" required=""
                                v-model="registerForm.password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <p v-if="validationErrors.password" class="mt-2 text-sm text-red-600">
                            {{ validationErrors.password[0] }}</p>
                    </div>
                    <div>
                        <label for="c_password" class="block text-sm font-medium leading-6 text-gray-900">Confirm
                            Password</label>
                        <div class="mt-2">
                            <input id="c_password" name="c_password" type="password" required=""
                                v-model="registerForm.c_password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <p v-if="validationErrors.c_password" class="mt-2 text-sm text-red-600">
                            {{ validationErrors.c_password[0] }}</p>
                    </div>


                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            up</button>
                    </div>
                </form>
            </div>

            <p class="mt-10 text-center text-sm text-gray-500">
                already registered?
                {{ ' ' }}
                <a href="/auth/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login here</a>
            </p>
        </div>
    </div>
</template>