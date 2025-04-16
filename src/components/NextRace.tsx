import { Resource } from "solid-js"

interface NextRaceProps {
    nextRace: Resource<any>;
}


const NextRace = ({ nextRace }: NextRaceProps) => {


    return (
        <div class="border p-4 my-4">
            <h1 class="text-2xl font-bold">{nextRace()["Country"]}</h1>
            <ul>
                {Object.entries(nextRace()).map(([key, value]) => {
                    // Skip the "Country" field to avoid displaying it in the list
                    if (key === "Country") return null;

                    // Render other fields (e.g., sessions)
                    // "Fancy" formatting for the "sessions" field
                    return (
                        <li data-key={key}>
                            <br /><strong>{key}:</strong>
                            {typeof value === "object" && value !== null ? (
                                Object.entries(value).map(([subKey, subValue]) => (
                                    <div data-key={subKey}>
                                        {typeof subValue === "string" && !isNaN(Date.parse(subValue)) ? (
                                            <>
                                                <strong>Date:</strong> <span>{new Date(subValue).toLocaleString('fi-FI', { hour12: false })}</span>
                                            </>
                                        ) : subKey === "time_until_event" ? (
                                            <>
                                                <strong>Time Until Event:</strong> <span>
                                                    {subValue
                                                        .replace(/(\d+) days (\d+):(\d+):(\d+).*/, (_: any, days: any, hours: any, minutes: any) =>
                                                            `${days} days ${hours} hours ${minutes} minutes`
                                                        )}
                                                </span>
                                            </>
                                        ) : subKey === "status" ? (
                                            <>
                                                <strong>Status:</strong> <span>{subValue}</span>
                                            </>
                                        ) : (
                                            <>
                                                <strong>{subKey}:</strong> {String(subValue)}
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <span> {String(value)}</span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
export default NextRace