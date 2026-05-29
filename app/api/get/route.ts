import { failedToFetch, unauthorizedResponse } from "@/queries";
import { NextResponse } from "next/server";

async function fetchReserves(endpoint: string) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	try {
        return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            cache: "no-store",
            signal: controller.signal,
        });
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const item = searchParams.get("item") ?? "";

    const endpointLib = {
        projects: "projects",
    }

    let endpoint =
        item in endpointLib
            ? endpointLib[item as keyof typeof endpointLib]
            : ""; 

    let res: Response;

    try {
        res = await fetchReserves(endpoint);
    } catch (error) {
        console.error(error)
        return failedToFetch() 
    }

    if (!res.ok) {
        return failedToFetch(res.statusText, res.status);
    }

    const data = await res.json().catch(() => null);
    return NextResponse.json(data);
}
