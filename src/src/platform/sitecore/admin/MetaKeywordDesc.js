document.addEventListener("DOMContentLoaded", function () {
    fetch("metaDataSample.json") // Adjust the path if needed
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(jsonData => {
            const results = jsonData.data.search.results;
            const container = document.getElementById("data-container");
            const template = document.querySelector(".meta-details-container.template"); // Get the template
            //const sortButton = document.getElementById("sort-date-btn");

            results.forEach(result => {
                // Clone the template
                const newMetaContainer = template.cloneNode(true);
                newMetaContainer.classList.remove("template"); // Remove template class
                //newMetaContainer.style.display = "block"; // Make it visible

                // Populate data dynamically
                newMetaContainer.querySelector(".page-name").textContent = result.PageName;
                newMetaContainer.querySelector(".item-path").textContent = result.ItemPath;
                newMetaContainer.querySelector(".keywords").textContent = result.PageKeywords.value || "N/A";
                newMetaContainer.querySelector(".description").textContent = result.PageDescription.value || "N/A";
                newMetaContainer.querySelector(".updated-time").textContent = result.UpdatedDateTime.value;

                // Append the new element to the container
                container.appendChild(newMetaContainer);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
