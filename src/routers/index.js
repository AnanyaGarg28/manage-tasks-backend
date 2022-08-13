import { testRoute } from "./testRoute";
import { signupRoute } from "./SignupRoute";
import { loginRoute } from "./loginRoute";
import { addProject } from "./addProject";
import { deleteProject } from "./deleteProject";
import { loadProjects } from "./loadProjects";

export const routes = [
    testRoute,
    signupRoute,
    loginRoute,
    loadProjects,
    addProject,
    deleteProject,
];