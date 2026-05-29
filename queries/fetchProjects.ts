import { fetchUniversal } from "./fetchUniversal";

export const fetchProjects = async ()=> {
    console.log(await fetchUniversal("projects"))
    return await fetchUniversal("projects");
}