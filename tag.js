document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour filtrer les éléments du menu déroulant
    function filterDropdownItems(inputElementId, dropdownElementId) {
        const inputText = document.getElementById(inputElementId).value.toLowerCase();
        const dropdownItems = document.getElementById(dropdownElementId).querySelectorAll('li');

        dropdownItems.forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(inputText) ? 'block' : 'none';
        });
    }



    // Fonction pour supprimer tous les tags
    function removeAllTags(typeClass) {
        const tags = document.querySelectorAll(`.all${typeClass}Tags .tag`);
        tags.forEach(tag => tag.remove());
    }

    // Fonction pour supprimer la sélection des éléments du menu déroulant
    function clearMenuSelection(dropdownElementId) {
        const dropdownItems = document.getElementById(dropdownElementId).querySelectorAll('li.selected-item');
        dropdownItems.forEach(item => item.classList.remove('selected-item'));
    }

    // Écouteurs d'événements pour la création de tags
    document.querySelectorAll('.dropdown-menu li').forEach(item => {
        item.addEventListener('click', function (event) {
            const type = this.closest('.dropdown').id; // Extrait le type à partir de l'ID
            let typeClass = '';
            if (type === 'ingredientDropdown') {
                typeClass = 'Ing';
            } else if (type === 'applianceDropdown') {
                typeClass = 'App';
            } else if (type === 'utensilDropdown') {
                typeClass = 'Ute';
            }

            if (this.classList.contains('selected-item')) {
                // Si l'élément est déjà sélectionné, supprimer le tag correspondant
                const tags = document.querySelectorAll(`.all${typeClass}Tags .tag`);
                tags.forEach(tag => {
                    if (tag.textContent.includes(this.textContent)) {
                        tag.remove();
                    }
                });
                this.classList.remove('selected-item');
            } else {
                // Sinon, ajouter le tag et marquer comme sélectionné
                this.classList.add('selected-item');
                createTag(this.textContent, typeClass, this);
            }
            // Empêcher la fermeture du menu déroulant sur la sélection d'un item
            event.stopPropagation();
        });
    });

    // Écouteurs d'événements pour la recherche dans les menus déroulants
    document.getElementById('ingredientSearchInput').addEventListener('input', () => filterDropdownItems('ingredientSearchInput', 'ingredientDropdownItems'));
    document.getElementById('applianceSearchInput').addEventListener('input', () => filterDropdownItems('applianceSearchInput', 'applianceDropdownItems'));
    document.getElementById('utensilSearchInput').addEventListener('input', () => filterDropdownItems('utensilSearchInput', 'utensilDropdownItems'));

    // Écouteur d'événements pour la fermeture des menus déroulants lorsqu'on clique à l'extérieur
    document.addEventListener('click', (event) => {
        if (!event.target.matches('.dropdown-toggle, .dropdown-menu *')) {
            // Fermer tous les menus et supprimer tous les éléments sélectionnés
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
            clearMenuSelection('ingredientDropdownItems');
            clearMenuSelection('applianceDropdownItems');
            clearMenuSelection('utensilDropdownItems');
            // Supprimer tous les tags si nécessaire
            removeAllTags('Ing');
            removeAllTags('App');
            removeAllTags('Ute');
        }
    });

    // Empêcher la fermeture du menu déroulant lorsqu'on clique à l'intérieur de la zone de recherche
    document.querySelectorAll('.dropdown-search-box').forEach(dropdownSearchBox => {
        dropdownSearchBox.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});

/*const allIngTags = document.querySelector(".allIngTags");
const allAppTags = document.querySelector(".allAppTags");
const allUteTags = document.querySelector(".allUteTags");

const ingredientTagsBox = document.getElementById("ingredientTagsBox");
const applianceTagsBox = document.getElementById("applianceTagsBox");
const utensilTagsBox = document.getElementById("utensilTagsBox");

const ingredientDropdownItems = document.getElementById(
    "ingredientDropdownItems"
);
const applianceDropdownItems = document.getElementById(
    "applianceDropdownItems"
);
const utensilDropdownItems = document.getElementById("utensilDropdownItems");

let selectedIngredientTags = [];
let selectedApplianceTags = [];
let selectedUtensilTags = [];

// 1. Ingredient section
// Remove tag from the tags box div and show it back on the dropdown list
ingredientTagsBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("tag")) {
        // Show the tag's ingredientList in the dropdown
        const dropdownItems =
            ingredientDropdownItems.getElementsById("ingredientDropdownItems");
        for (let i = 0; i < dropdownItems.length; i++) {
            const item = dropdownItems[i];
            if (
                item.textContent.toLowerCase().trim() ===
                event.target.textContent.toLowerCase().trim()
            ) {
                item.style.display = "block";
                break;
            }
        }

        // remove tag from selectedIngredientTags array
        const tagIndex = selectedIngredientTags.indexOf(
            event.target.textContent.toLowerCase()
        );
        if (tagIndex > -1) {
            selectedIngredientTags.splice(tagIndex, 1);
        }
        // Remove tag from ingredientTagsBox
        event.target.remove();

        // Remove tag from allTagsBox
        // "event.target.textContent" = targeted tag contents
        removeAllIngTags(event.target.textContent);
        searchIngredients();
    }
    displayFilteredRecipes();
});

// Add & remove tag from dropdown
function addIngredientTag(ingredient) {
    console.log("Ingredient tag check:", ingredient);
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = ingredient;

    // Append tag to the tags box div
    ingredientTagsBox.appendChild(tag);

    // Add tag to the selectedIngredientTags array
    selectedIngredientTags.push(ingredient);

    // Add tag to the all tags div if it doesn't already exist
    const existingIngredientTags = allIngTags.querySelectorAll(".tag");
    let existingTag = false;

    for (let i = 0; i < existingIngredientTags.length; i++) {
        if (
            existingIngredientTags[i].textContent.toLowerCase() ===
            ingredient.toLowerCase()
        ) {
            existingTag = true;
            break;
        }
    }
    if (!existingTag) {
        // Create container for allIngTagsTag & closeTags
        const tagContainer = document.createElement("span");
        tagContainer.classList.add("tagContainer");

        // Create allIngTagsTag element
        const allIngTagsTag = document.createElement("span");
        allIngTagsTag.classList.add("tag");
        allIngTagsTag.textContent = ingredient;

        const closeTags = document.createElement("span");
        closeTags.classList.add("close", "fas", "fa-times");
        closeTags.addEventListener("click", () => {
            tagContainer.remove(); // Remove tag from all tags box
            tag.remove(); // Remove tag from ingredientTagsBox in dropdown

            // Add tag back to ingredientList in dropdown
            const dropdownItems =
                ingredientDropdownItems.getElementsById("ingredientDropdownItems");

            for (let i = 0; i < dropdownItems.length; i++) {
                const item = dropdownItems[i];
                if (
                    item.textContent.toLowerCase() ===
                    allIngTagsTag.textContent.toLowerCase()
                ) {
                    item.style.display = "block";
                    break;
                }
            }
        });

        // Append allIngTagsTag & closeTags to tagContainer
        tagContainer.appendChild(allIngTagsTag);
        tagContainer.appendChild(closeTags);
        // Append tagContainer to allIngTags
        allIngTags.appendChild(tagContainer);
    }
    searchIngredients();
}

allIngTags.addEventListener("click", (event) => {
    if (event.target.classList.contains("close")) {
        const tagContainer = event.target.parentElement;
        const tagElement = tagContainer.querySelector(".tag");
        const tagText = tagElement.textContent.trim();

        // Show ingredientList
        const ingredientDropdownList =
            ingredientDropdownItems.getElementsById("ingredientDropdownItems");
        for (let i = 0; i < ingredientDropdownList.length; i++) {
            const item = ingredientDropdownList[i];
            if (
                item.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()
            ) {
                item.style.display = "block";
                break;
            }
        }

        // Remove tag from ingredientTagsBox
        const ingredientTags = ingredientTagsBox.getElementsByClassName("tag");
        for (let i = 0; i < ingredientTags.length; i++) {
            const tag = ingredientTags[i];
            if (
                tag.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()
            ) {
                tag.remove();
                break;
            }
        }

        // Remove tag from all tags box
        tagContainer.remove();

        // Update the selectedIngredientTags array
        const tagIndex = selectedIngredientTags.indexOf(tagText.toLowerCase());
        if (tagIndex > -1) {
            selectedIngredientTags.splice(tagIndex, 1);
        }

        // Update the filtered recipes
        searchIngredients();
    }
    displayFilteredRecipes();
});

// Remove tags from all tags boxes, under the filters
function removeAllIngTags(tagText) {
    const existingIngTags = allIngTags.getElementsByClassName("tagContainer");
    // Loop through each tagContainer
    for (let i = 0; i < existingIngTags.length; i++) {
        const ingTagContainer = existingIngTags[i];
        // Get the tag within the current tagContainer
        const ingTag = ingTagContainer.querySelector(".tag");
        // Check if this tag's text matches the provided tagText
        if (
            ingTag.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()
        ) {
            // If it matches, remove the entire tagContainer (including the tag and the close button)
            ingTagContainer.remove();
            break;
        }
    }

    const existingIngredientTags =
        ingredientTagsBox.getElementsByClassName("tag");
    for (let i = 0; i < existingIngredientTags.length; i++) {
        const tag = existingIngredientTags[i];
        if (tag.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()) {
            tag.remove();
            break;
        }
    }

    // Update the selectedIngredientTags array
    const tagIndex = selectedIngredientTags.indexOf(tagText.toLowerCase());
    if (tagIndex > -1) {
        selectedIngredientTags.splice(tagIndex, 1);
    }

    // Add tag back to ingredientList in dropdown
    const dropdownItems =
        ingredientDropdownItems.getElementsByClassName("ingredientList");

    for (let j = 0; j < dropdownItems.length; j++) {
        const item = dropdownItems[j];
        if (item.textContent.toLowerCase().trim() === tagText.toLowerCase()) {
            item.style.display = "block";
            break;
        }
    }
}

// 2. Appliance section
applianceTagsBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("tag")) {
        // Show the tag's applianceList in the dropdown
        const dropdownItems =
            applianceDropdownItems.getElementsById("applianceDropdownItems");
        for (let i = 0; i < dropdownItems.length; i++) {
            const item = dropdownItems[i];
            if (
                item.textContent.toLowerCase().trim() ===
                event.target.textContent.toLowerCase().trim()
            ) {
                item.style.display = "block";
                break;
            }
        }

        const tagIndex = selectedApplianceTags.indexOf(
            event.target.textContent.toLowerCase()
        );
        if (tagIndex > -1) {
            selectedApplianceTags.splice(tagIndex, 1);
        }

        // Remove tag from allAppTags
        event.target.remove();
        removeAllAppTags(event.target.textContent);
        searchAppliances();
    }
    displayFilteredRecipes();
});

// Add & remove tag from dropdown
function addApplianceTag(appliance) {
    console.log("Appliance tag check:", appliance);
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = appliance;

    // Append tag to the applianceTagsBox div
    applianceTagsBox.appendChild(tag);

    // Add tag to the selectedApplianceTags array
    selectedApplianceTags.push(appliance);

    // Add tag to the all tags div if it doesn't already exist
    const existingApplianceTags = allAppTags.querySelectorAll(".tag");
    let existingTag = false;

    for (let i = 0; i < existingApplianceTags.length; i++) {
        if (
            existingApplianceTags[i].textContent.toLowerCase() ===
            appliance.toLowerCase()
        ) {
            existingTag = true;
            break;
        }
    }
    if (!existingTag) {
        const tagContainer = document.createElement("span");
        tagContainer.classList.add("tagContainer");

        const allAppTagsTag = document.createElement("span");
        allAppTagsTag.classList.add("tag");
        allAppTagsTag.textContent = appliance;

        const closeTags = document.createElement("span");
        closeTags.classList.add("close", "fas", "fa-times");
        closeTags.addEventListener("click", () => {
            tagContainer.remove();
            tag.remove();

            // Add tag back to applianceList in dropdown
            const dropdownItems =
                applianceDropdownItems.getElementsById("applianceDropdownItems");
            for (let i = 0; i < dropdownItems.length; i++) {
                const item = dropdownItems[i];
                if (
                    item.innerText.toLowerCase() ===
                    allAppTagsTag.textContent.toLowerCase()
                ) {
                    item.style.display = "block";
                    break;
                }
            }
        });

        tagContainer.appendChild(allAppTagsTag);
        tagContainer.appendChild(closeTags);
        allAppTags.appendChild(tagContainer);
    }

    searchAppliances();
}

allAppTags.addEventListener("click", (event) => {
    if (event.target.classList.contains("close")) {
        const tagContainer = event.target.parentElement;
        const tagElement = tagContainer.querySelector(".tag");
        const tagText = tagElement.textContent.trim();

        // Show applianceList
        const applianceDropdownList =
            applianceDropdownItems.getElementsById("applianceDropdownItems");

        for (let i = 0; i < applianceDropdownList.length; i++) {
            const item = applianceDropdownList[i];
            if (
                item.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()
            ) {
                item.style.display = "block";
                break;
            }
        }

        // Remove tag from applianceTagsBox
        const applianceTags = applianceTagsBox.getElementsByClassName("tag");
        for (let i = 0; i < applianceTags.length; i++) {
            const tag = applianceTags[i];
            if (
                tag.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()
            ) {
                tag.remove();
                break;
            }
        }

        // Remove tag from all tags box
        tagContainer.remove();

        const tagIndex = selectedApplianceTags.indexOf(tagText.toLowerCase());
        if (tagIndex > -1) {
            selectedApplianceTags.splice(tagIndex, 1);
        }

        // Update the filtered recipes
        searchAppliances();
    }
    displayFilteredRecipes();
});

function removeAllAppTags(tagText) {
    const existingAppTags = allAppTags.getElementsByClassName("tagContainer");
    for (let i = 0; i < existingAppTags.length; i++) {
        const appTagContainer = existingAppTags[i];
        const appTag = appTagContainer.querySelector(".tag");
        if (
            appTag.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()
        ) {
            appTagContainer.remove();
            break;
        }
    }

    const existingApplianceTags = applianceTagsBox.getElementsByClassName("tag");
    for (let i = 0; i < existingApplianceTags.length; i++) {
        const tag = existingApplianceTags[i];
        if (tag.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()) {
            tag.remove();
            break;
        }
    }

    // Update the selectedApplianceTags array
    const tagIndex = selectedApplianceTags.indexOf(tagText.toLowerCase());
    if (tagIndex > -1) {
        selectedApplianceTags.splice(tagIndex, 1);
    }

    // Add tag back to applianceList in dropdown
    const dropdownItems =
        applianceDropdownItems.getElementsById("applianceDropdownItems");

    for (let j = 0; j < dropdownItems.length; j++) {
        const item = dropdownItems[j];
        if (item.textContent.toLowerCase().trim() === tagText.toLowerCase()) {
            item.style.display = "block";
            break;
        }
    }
}

// 3. Utensil section
utensilTagsBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("tag")) {
        // Show the tag's utensilList in the dropdown
        const dropdownItems =
            utensilDropdownItems.getElementsById("utensilDropdownItems");
        for (let i = 0; i < dropdownItems.length; i++) {
            const item = dropdownItems[i];
            if (
                item.textContent.toLowerCase().trim() ===
                event.target.textContent.toLowerCase().trim()
            ) {
                item.style.display = "block";
                break;
            }
        }

        const tagIndex = selectedUtensilTags.indexOf(
            event.target.textContent.toLowerCase()
        );
        if (tagIndex > -1) {
            selectedUtensilTags.splice(tagIndex, 1);
        }

        event.target.remove();
        removeAllUteTags(event.target.textContent);
        searchUtensils();
    }
    displayFilteredRecipes();
});

// Add & remove tag from dropdown
function addUtensilTag(utensil) {
    console.log("Utensil tag check:", utensil);
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = utensil;

    // Append tag to the utensilTagsBox div
    utensilTagsBox.appendChild(tag);

    // Add tag to the selectedUtensilTags array
    selectedUtensilTags.push(utensil);

    // Add tag to the all tags div if it doesn't already exist
    const existingUtensilTags = allUteTags.querySelectorAll(".tag");
    let existingTag = false;

    for (let i = 0; i < existingUtensilTags.length; i++) {
        if (
            existingUtensilTags[i].textContent.toLowerCase() === utensil.toLowerCase()
        ) {
            existingTag = true;
            break;
        }
    }
    if (!existingTag) {
        const tagContainer = document.createElement("span");
        tagContainer.classList.add("tagContainer");

        const allUteTagsTag = document.createElement("span");
        allUteTagsTag.classList.add("tag");
        allUteTagsTag.textContent = utensil;

        const closeTags = document.createElement("span");
        closeTags.classList.add("close", "fas", "fa-times");
        closeTags.addEventListener("click", () => {
            tagContainer.remove();
            tag.remove();

            // Add tag back to utensilList in dropdown
            const dropdownItems =
                utensilDropdownItems.getElementsById("utensilDropdownItems");
            for (let i = 0; i < dropdownItems.length; i++) {
                const item = dropdownItems[i];
                if (
                    item.innerText.toLowerCase() ===
                    allUteTagsTag.textContent.toLowerCase()
                ) {
                    item.style.display = "block";
                    break;
                }
            }
        });

        tagContainer.appendChild(allUteTagsTag);
        tagContainer.appendChild(closeTags);
        allUteTags.appendChild(tagContainer);
    }

    searchUtensils();
}

allUteTags.addEventListener("click", (event) => {
    if (event.target.classList.contains("close")) {
        const tagContainer = event.target.parentElement;
        const tagElement = tagContainer.querySelector(".tag");
        const tagText = tagElement.textContent.trim();

        // Show utensilList
        const utensilDropdownList =
            utensilDropdownItems.getElementsById("utensilDropdownItems");

        for (let i = 0; i < utensilDropdownList.length; i++) {
            const item = utensilDropdownList[i];
            if (
                item.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()
            ) {
                item.style.display = "block";
                break;
            }
        }

        // Remove tag from utensilTagsBox
        const utensilTags = utensilTagsBox.getElementsByClassName("tag");
        for (let i = 0; i < utensilTags.length; i++) {
            const tag = utensilTags[i];
            if (
                tag.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()
            ) {
                tag.remove();
                break;
            }
        }

        // Remove tag from all tags box
        tagContainer.remove();

        const tagIndex = selectedUtensilTags.indexOf(tagText.toLowerCase());
        if (tagIndex > -1) {
            selectedUtensilTags.splice(tagIndex, 1);
        }

        // Update the filtered recipes
        searchUtensils();
    }
    displayFilteredRecipes();
});

function removeAllUteTags(tagText) {
    const existingUteTags = allUteTags.getElementsByClassName("tagContainer");
    for (let i = 0; i < existingUteTags.length; i++) {
        const uteTagContainer = existingUteTags[i];
        const uteTag = uteTagContainer.querySelector(".tag");
        if (
            uteTag.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()
        ) {
            uteTagContainer.remove();
            break;
        }
    }

    const existingUtensilTags = utensilTagsBox.getElementsByClassName("tag");
    for (let i = 0; i < existingUtensilTags.length; i++) {
        const tag = existingUtensilTags[i];
        if (tag.textContent.toLowerCase().trim() === tagText.toLowerCase().trim()) {
            tag.remove();
            break;
        }
    }

    // Update the selectedUtensilTags array
    const tagIndex = selectedUtensilTags.indexOf(tagText.toLowerCase());
    if (tagIndex > -1) {
        selectedUtensilTags.splice(tagIndex, 1);
    }

    // Add tag back to utensilList in dropdown
    const dropdownItems =
        utensilDropdownItems.getElementsById("utensilDropdownItems");

    for (let j = 0; j < dropdownItems.length; j++) {
        const item = dropdownItems[j];
        if (item.textContent.toLowerCase().trim() === tagText.toLowerCase()) {
            item.style.display = "block";
            break;
        }
    }
}
*/