<template>
    <div class="login-bg">
        <div class="login-container">
            <div class="login-header">
                <img class="logo mr10" src="../../assets/img/logo.svg" alt="" />
                <div class="login-title">海洋牧场监测可视化系统</div>
            </div>
            <el-form :model="param" :rules="rules" ref="register" size="large">
                <!-- 用户名输入框 -->
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 邮箱输入框 -->
                <el-form-item prop="email">
                    <el-input v-model="param.email" placeholder="邮箱">
                        <template #prepend>
                            <el-icon>
                                <Message />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 密码输入框 -->
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter="submitForm(register)"
                    >
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 添加选择角色 -->
                <el-form-item prop="role">
                    <el-select v-model="param.role" placeholder="选择角色">
                        <el-option label="普通用户" value="user"></el-option>
                        <el-option label="养殖户" value="farmer"></el-option>
                        <el-option label="系统管理员" value="admin"></el-option>
                        <el-option label="数据分析师" value="analyst"></el-option>
                    </el-select>
                </el-form-item>

                <el-button class="login-btn" type="primary" size="large" @click="submitForm(register)">注册</el-button>
                <p class="login-text">
                    已有账号，<el-link type="primary" @click="$router.push('/login')">立即登录</el-link>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { Register } from '@/types/user';
import { register as service_register } from '@/api/index';
import { useRequest } from 'vue-hooks-plus'

const router = useRouter();
const param = reactive<Register>({
    username: '',
    password: '',
    email: '',
    role: '',
});

// 添加用户名和密码规则
const rules: FormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur'},
        { pattern: /^[A-Za-z][A-Za-z0-9_]{1,15}$/, message: '用户名必须由由数字或英文字母组成', trigger: 'blur' },
        { min: 6, max: 16, message: '用户名长度在 6 到 16 之间', trigger: 'blur'}
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{1,20}$/, message: '密码必须同时包含一个大写字母、一个小写字母和一个数字', trigger: 'blur' },
        { min: 8, max: 20, message: '密码长度在 8 到 20 之间', trigger: 'blur' }
    ],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
};
const register = ref<FormInstance>();
// 添加注册请求逻辑
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid: boolean) => {
        if (valid) {
            useRequest(() => service_register(param), {
                debounceWait: 1000,
                onSuccess: () => {
                    ElMessage.success('注册成功，请登录');
                    router.push('/login');
                },
                onError: (error: any) => {
                    ElMessage.error(`注册失败: ${error.detail}`);
                }
            });
        } else {
            ElMessage.error('请检查输入是否合法');
        }
    });
};
</script>

<style scoped>
.login-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url(../../assets/img/login-bg.jpg) center/cover no-repeat;
}

.login-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
}

.logo {
    width: 35px;
}

.login-title {
    font-size: 22px;
    color: #333;
    font-weight: bold;
}

.login-container {
    width: 450px;
    border-radius: 5px;
    background: #fff;
    padding: 40px 50px 50px;
    box-sizing: border-box;
}

.login-btn {
    display: block;
    width: 100%;
}

.login-text {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #787878;
}
</style>
