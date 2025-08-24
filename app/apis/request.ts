export async function makeAuthenticatedRequest(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  try {
    const token = localStorage.getItem("Token");

    console.log("[v0] Making authenticated request to:", url);
    console.log("[v0] Has token:", !!token);
    console.log("[v0] Request method:", options.method || "GET");

    const headers = new Headers(options.headers || {});

    if (!(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      console.log("[v0] Authorization header set");
    } else {
      console.log("[v0] No token found in localStorage");
    }

    const response = await fetch(url, { ...options, headers });

    console.log("[v0] Response status:", response.status);
    console.log("[v0] Response ok:", response.ok);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData?.message || errorMessage;
        console.log("[v0] Error response data:", errorData);
      } catch {
        console.log("[v0] Could not parse error response as JSON");
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const text = await response.text();
      const result = text ? JSON.parse(text) : null;
      console.log("[v0] Parsed JSON response:", result);
      return result;
    } else {
      console.log("[v0] Non-JSON response, returning success");
      return { success: true };
    }
  } catch (err) {
    console.error("[v0] Request error:", err);
    throw err;
  }
}
