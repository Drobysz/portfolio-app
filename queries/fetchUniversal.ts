type Endpoint = "projects";

export const fetchUniversal = async (endpoint: Endpoint) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);
    const searchParams = new URLSearchParams({ item: endpoint });

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get?${searchParams.toString()}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
            signal: controller.signal
        });

        const data = await res.json().catch(() => null);
        if (!res.ok) {
            throw new Error(data?.message ?? "Failed to fetch");
        }

        return data.data;
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Request timed out");
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};
