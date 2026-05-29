import { fetchUniversal } from "./fetchUniversal";

export const fetchProjects = async ()=> {
    return await fetchUniversal("projects");
}