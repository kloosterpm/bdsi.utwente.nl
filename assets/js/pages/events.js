const upcoming = document.querySelector("#upcoming");
const completed = document.querySelector("#completed");
const events = document.querySelectorAll(".event");

dayjs.extend(dayjs_plugin_advancedFormat);
const now = new dayjs();
let anyUpcoming = false;

for (const event of [...events].sort(compareEvents)) {
    handleEvent(event);
}

if (!anyUpcoming) {
    upcoming.style.display = "none";
}

// check if event has start and end date data attributes, and if so, check if the event is in the past or future, then append the element to the upcoming or completed div depending.
/**
 *
 * @param {HTMLDivElement} event
 */
function handleEvent(event) {
    const start = event.dataset["start"];
    const end = event.dataset["end"];
    const time = event.dataset["time"];
    const draft = event.dataset["path"].includes("/draft/");

    if (draft) {
        event.remove();
        return;
    }

    event.querySelector(".date").textContent = formatDate(start, end, time);

    if (isFuture(end) || isFuture(start)) {
        upcoming.appendChild(event);
        anyUpcoming = true;
    } else if (start || end) {
        completed.appendChild(event);
    }
}

function compareEvents(a, b) {
    const startA = a.dataset["start"];
    const startB = b.dataset["start"];

    if (startA && startB) {
        return dayjs(startA).isBefore(dayjs(startB)) ? 1 : -1;
    }
    if (startA || startB) {
        return startA ? -1 : 1;
    }
    return a.dataset["title"].localeCompare(b.dataset["title"]);
}

function isFuture(date) {
    return date && dayjs(date).isAfter(now, "day");
}

/**
 * Format date to be displayed in the event card
 *
 * @param {string?} start
 * @param {string?} end
 * @param {string?} time
 */
function formatDate(start, end, time) {
    if (!start) {
        return "";
    }

    if (start) {
        start = dayjs(start);
    }
    if (end) {
        end = dayjs(end);
    }

    let date = "";
    if (start && end) {
        if (start.isSame(end, "month")) {
            date = `${start.format("MMMM D")} — ${end.format("D")}`;
        } else {
            date = `${start.format("MMMM D")} — ${end.format("MMMM D")}`;
        }
    } else {
        date = start.format("MMMM D");
    }
    if (!start.isSame(now, "year")) {
        if (end) {
            date += `, ${end.format("YYYY")}`;
        } else {
            date += `, ${start.format("YYYY")}`;
        }
    }
    if (time) {
        date += `, ${time}`;
    }
    return date;
}
