// Correct the import or remove it if not needed
import { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  const baseURL = process.env.API_URL || "http://0.0.0.0:5000";
  try {
    const response = await fetch(`${baseURL}/events/next`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
