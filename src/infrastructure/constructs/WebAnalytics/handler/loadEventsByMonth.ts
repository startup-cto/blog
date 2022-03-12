import { ensureEvent, Event } from "../Event";
import { DBEvent } from "./DBEvent";
import { config } from "./config";

export async function loadEventsByMonth(
  year: number,
  month: number
): Promise<Event[]> {
  const scatters = Array.from(Array(config.maxScatter).keys());
  const results = await Promise.all(
    scatters.map(async (scatter) =>
      DBEvent.query(config.partitionKey)
        .eq(scatter)
        .where(config.sortKey)
        .beginsWith(`${year}-${month.toString().padStart(2, "0")}`)
        .all()
        .exec()
    )
  );
  const events = results.flat();
  return events.map((event) => ensureEvent(event));
}
