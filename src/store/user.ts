import { defineStore } from 'pinia';
import { pinia } from './index';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

pinia.use(piniaPluginPersistedstate)

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            username: '',
            password: '',
            access_token: '',
            role: '',
            logged_in: false,
            profile: null
        }
    },
    actions: {
        login(username: string, password: string, role: string) {
            this.username = username
            this.password = password
            this.role = role
            this.logged_in = true
        },
        logout() {
            this.logged_in = false
            this.username = ''
            this.password = ''
            this.access_token = ''
            this.role = ''
            this.$persist()
        },
        setAccessToken(token: string) {
            this.access_token = 'Bearer ' + token
        },
        setRole(role: string) {
            this.role = role
        },
        setProfile(profile: any) {
            this.profile = profile
        }
    },
    persist: true
})