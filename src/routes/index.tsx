import { A } from "@solidjs/router";
import { createResource, JSX } from "solid-js";
import Counter from "~/components/Counter";
import NextRace from "~/components/NextRace";

async function fetchData() {
  const baseURL = "http://localhost:3000";
  // const response = await fetch(`${baseURL}/events/next`);
  const response = await fetch(`${baseURL}/api/schedule/nextRace`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}


export default function Home() {
  const [nextRace] = createResource(fetchData);
  console.log("nextRace", nextRace());
  return (
    <main class="text-center mx-auto text-gray-700 p-4">

      {/* TODO */}
      {/* Complete grid layout, next race somewhere on the side with standings (constructors + driver) */}
      {/* More compact next race, Session names on the side vertically with shortened names - Quali, P1, P2 etc etc */}
      {nextRace.loading && <p>Loading...</p>}
      {nextRace.error && <p>Error: {nextRace.error.message}</p>}
      {nextRace() && (
        <NextRace nextRace={nextRace}></NextRace>
      )}
    </main>
  );
}