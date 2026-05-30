import { Project } from "@/interfaces";
import { fetchUniversal } from "./fetchUniversal";

export const fetchProjects = async ()=> {
    return await fetchUniversal("projects");
};

export const fetchProjectsFromApi = async (): Promise<Project[]> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

    if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
        const res = await fetch(`${apiUrl}/api/projects`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
            signal: controller.signal,
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            throw new Error(data?.message ?? res.statusText ?? "Failed to fetch projects");
        }

        if (Array.isArray(data)) {
            return data;
        }

        if (Array.isArray(data?.data)) {
            return data.data;
        }

        throw new Error("Unexpected projects API response");
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Projects API request timed out");
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};
