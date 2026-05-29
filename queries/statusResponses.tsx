import { NextResponse } from "next/server";

export function unauthorizedResponse() {
    return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
    );
}

export function failedToFetch(msg?: string, status?: number) {
    return NextResponse.json({
        message: msg ?? "Failed to fetch user profile",
        status: status ?? 500
    }, { status: status ?? 500 });
}

export function succeeded() {
    return NextResponse.json(
        { message: "succeeded to patch" },
        { status: 200 }
    );
}