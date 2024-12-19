import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ListStudent from "../views/students/ListStudent.vue";
import ListModule from "../views/modules/ListModule.vue";
import ListPayement from "../views/payements/ListPayement.vue";
import ListRegister from "../views/register/ListRegister.vue";


const routes =[
    {
        path: "/",
        name: "Home",
        component: Home,
        

    },
    {
        path: "/list-student",
        name: "list-student",
        component: ListStudent,
        

    },
    {
        path: "/list-module",
        name: "list-module",
        component: ListModule,
        

    },
    {
        path: "/list-payement",
        name: "list-payement",
        component: ListPayement,
        

    },
    {
        path: "/list-register",
        name: "list-register",
        component: ListRegister,
        

    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;