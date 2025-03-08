document.addEventListener("DOMContentLoaded", function () {
    let sortAscending = true; // Default to ascending order
    const sortButton = document.getElementById("sort-date-btn");
    const container = document.querySelector(".meta-details-container");
    const template = document.querySelector(".meta-details-item.template");

    fetch("metaDataSample.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load JSON file");
            return response.json();
        })
        .then(jsonData => {
            let results = jsonData.data.search.results;

            // Sort initially in ascending order
            results.sort((a, b) => parseDateTime(a.UpdatedDateTime.value) - parseDateTime(b.UpdatedDateTime.value));
            renderData(results);

            // Add event listener for sorting
            sortButton.addEventListener("click", () => {
                sortAscending = !sortAscending;
                results.sort((a, b) => {
                    const dateA = parseDateTime(a.UpdatedDateTime.value);
                    const dateB = parseDateTime(b.UpdatedDateTime.value);
                    return sortAscending ? dateA - dateB : dateB - dateA;
                });

                sortButton.textContent = sortAscending ? "Sort ⬆" : "Sort ⬇";
                renderData(results);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));

    function renderData(sortedResults) {
        container.innerHTML = ""; // Clear existing data while keeping the heading row

        sortedResults.forEach(result => {
            const newItem = template.cloneNode(true);
            newItem.classList.remove("template");

            newItem.querySelector(".page-name").textContent = result.PageName;
            newItem.querySelector(".item-path").textContent = result.ItemPath;
            newItem.querySelector(".keywords").textContent = result.PageKeywords.value || "N/A";
            newItem.querySelector(".description").textContent = result.PageDescription.value || "N/A";
            newItem.querySelector(".updated-time").textContent = formatDateTime(result.UpdatedDateTime.value);

            container.appendChild(newItem);
        });
    }

    // Date formatting
    function parseDateTime(dateTimeString) {
        if (!dateTimeString) return new Date(0);

        const year = parseInt(dateTimeString.substring(0, 4));
        const month = parseInt(dateTimeString.substring(4, 6)) - 1;
        const day = parseInt(dateTimeString.substring(6, 8));
        const hours = parseInt(dateTimeString.substring(9, 11));
        const minutes = parseInt(dateTimeString.substring(11, 13));
        const seconds = parseInt(dateTimeString.substring(13, 15));

        return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
    }

    function formatDateTime(dateTimeString) {
        const dateObj = parseDateTime(dateTimeString);
        return dateObj.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
        }) + " UTC";
    }
});
