document.addEventListener("DOMContentLoaded", function () {
    fetch("metaDataSample.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(jsonData => {
            const results = jsonData.data.search.results;
            const container = document.getElementById("data-container");
            const template = document.querySelector(".meta-details-item.template"); // Get the template
            //const sortButton = document.getElementById("sort-date-btn");

            results.forEach(result => {
                // Clone the template
                const newMetaContainer = template.cloneNode(true);
                newMetaContainer.classList.remove("template");

                // Populate data dynamically
                newMetaContainer.querySelector(".page-name").textContent = result.PageName;
                newMetaContainer.querySelector(".item-path").textContent = result.ItemPath;
                newMetaContainer.querySelector(".keywords").textContent = result.PageKeywords.value || "N/A";
                newMetaContainer.querySelector(".description").textContent = result.PageDescription.value || "N/A";
                newMetaContainer.querySelector(".updated-time").textContent = formatDateTime(result.UpdatedDateTime.value);

                // Append the new element to the container
                container.appendChild(newMetaContainer);
            });

            function formatDateTime(dateTimeString) {
                if (!dateTimeString) return "N/A"; // Handle empty values

                // Convert "20250130T150733Z" to a proper date format
                const year = dateTimeString.substring(0, 4);
                const month = dateTimeString.substring(4, 6);
                const day = dateTimeString.substring(6, 8);
                const hours = dateTimeString.substring(9, 11);
                const minutes = dateTimeString.substring(11, 13);
                const seconds = dateTimeString.substring(13, 15);

                // Create a Date object in UTC
                const dateObj = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

                // Format date as "30 Jan 2025, 3:07 PM UTC"
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
        })
        .catch(error => console.error("Error loading JSON:", error));
});
