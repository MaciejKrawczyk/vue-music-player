<template>
    <!-- Registration Form -->
    <div
        class="text-white text-center font-bold p-4 rounded mb-4"
        v-if="reg_show_alert"
        :class="reg_alert_variant"
    >
        {{ reg_alert_msg }}
    </div>

    <vee-form
        @submit="register"
        :validation-schema="schema"
        :initial-values="userData">
        <!-- Name -->
        <div class="mb-3">
            <label class="inline-block mb-2">Name</label>
            <vee-field
                name="name"
                type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
                :rule="{
                                    required: true
                                  }"
            />
            <ErrorMessage class="text-red-600" name="name" />
        </div>
        <!-- Email -->
        <div class="mb-3">
            <label class="inline-block mb-2">Email</label>
            <vee-field
                name="email"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
            />
            <ErrorMessage class="text-red-600" name="email" />
        </div>
        <!-- Age -->
        <div class="mb-3">
            <label class="inline-block mb-2">Age</label>
            <vee-field name="age"
                       type="number"
                       class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            />
            <ErrorMessage name="age" class="text-red-600" />
        </div>
        <!-- Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Password</label>
            <vee-field
                name="password"
                :bails="false"
                v-slot="{ field, errors }"
            >
                <input
                    v-bind="field"
                    type="password"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Password"
                >
                <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
            </vee-field>
            <!--                            <ErrorMessage name="password" class="text-red-600" />-->
        </div>
        <!-- Confirm Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Confirm Password</label>
            <vee-field
                name="confirm_password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
            />
            <ErrorMessage name="confirm_password" class="text-red-600" />
        </div>
        <!-- Country -->
        <div class="mb-3">
            <label class="inline-block mb-2">Country</label>
            <vee-field
                name="country"
                as="select"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            >
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antarctica">Antarctica</option>
            </vee-field>
            <ErrorMessage name="country" class="text-red-600" />
        </div>
        <!-- TOS -->
        <div class="mb-3 pl-6">
            <vee-field
                value="1"
                name="tos"
                type="checkbox"
                class="w-4 h-4 float-left -ml-6 mt-1 rounded"
            />
            <label class="inline-block">Accept terms of service</label>
            <ErrorMessage name="tos" class="text-red-600" />
        </div>
        <button
            type="submit"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            :disabled="reg_in_submission"
        >
            Submit
        </button>
    </vee-form>
</template>

<script>
import useUserStore from "@/stores/user"
import { mapActions } from 'pinia'

export default {
    name: 'RegistrationForm',
    data() {
        return {
            schema: {
                name: 'required|min:3|max:100|alpha_spaces',
                email: 'required|min:3|max:100',
                age: 'required|min_value:18|max_value:150',
                password: 'required|min:9|max:100|excluded:password',
                confirm_password: 'confirmed:@password',
                country: 'required|country_excluded:Antarctica',
                tos: 'tos'
            },
            userData: {
                country: 'USA'
            },
            reg_in_submission: false,
            reg_show_alert: false,
            reg_alert_variant: 'bg-blue-500',
            reg_alert_msg: 'Please wait! Your account is being created...'
        }
    },
    methods: {
        ...mapActions(useUserStore, {
            createUser: "register"
        }),
        async register(values) {
            console.log(values)

            this.reg_show_alert = true
            this.reg_in_submission = true
            this.reg_alert_variant = 'bg-blue-500'
            this.reg_alert_msg = 'Please wait! Your account is being created...'

            try {

                await this.createUser(values)

            } catch (e) {
                this.reg_in_submission = false
                this.reg_alert_variant = 'bg-red-500'
                this.reg_alert_msg = 'error occurred, try again later...'
                return
            }

            this.reg_alert_variant = 'bg-green-500'
            this.reg_alert_msg = 'Success!'

            window.location.reload()

        }
    }
}
</script>