

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.nav-search-bar');
    const searchButton = document.getElementById('search-loup');

    function displayRecipes(recipes) {
        const cards = document.getElementById("recipes");
        let children = "";

        for (let i = 0; i < recipes.length; i++) {
            let ingredientList = "";
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                const ing = recipes[i].ingredients[j];
                ingredientList += `<p class="card-ingredient col-sm-6"><b>${ing.ingredient}</b><br><span>${ing.quantity ? ing.quantity : "-"} ${ing.unit ? ing.unit : ""}</span></p>`;
            }

            children += `<div class="col-sm-4">
            <div class="card ">
            <img src="../assets/recipes/${recipes[i].image}" class="card-img-top" alt="...">
            <div class="card-recipe-time"><p class="px-3 py-1 m-0">${recipes[i].time}min</p></div>
            <div class="card-body p-4">
            <h5 class="card-title py-3 m-0">${recipes[i].name}</h5>
            <h6 class="card-subtitle py-3 m-0">Recette</h6>
            <p class="card-text">${recipes[i].description}</p>
            <h6 class="card-subtitle pt-3">Ingrédients</h6>
            <div class="d-flex flex-wrap">
            ${ingredientList}
            </div>
            </div>
            </div>
            </div>`;
        }

        cards.innerHTML = `<div><div class="row gy-5">${children}</div></div>`;
    }

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length >= 3) {
            let filteredRecipes = [];
            for (let i = 0; i < recipes.length; i++) {
                const recipe = recipes[i];
                const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
                const descriptionMatch = recipe.description.toLowerCase().includes(searchTerm);

                let ingredientMatch = false;
                for (let j = 0; j < recipe.ingredients.length; j++) {
                    const ingredient = recipe.ingredients[j];
                    if (ingredient.name && ingredient.name.toLowerCase().includes(searchTerm)) {
                        ingredientMatch = true;
                        break; // Arrête la recherche dès qu'un ingrédient correspond
                    }
                }

                if (nameMatch || descriptionMatch || ingredientMatch) {
                    filteredRecipes.push(recipe);
                }
            }

            displayRecipes(filteredRecipes);
        } else {
            displayRecipes(recipes);
        }
    }

    searchInput.addEventListener('input', handleSearch);
    searchButton.addEventListener('click', handleSearch);

    // Affichage initial de toutes les recettes
    displayRecipes(recipes);
});
const dropdownTitles = document.querySelectorAll(".dropdown_title-section");
const dropdownContents = document.querySelectorAll(".dropdown_content");
const chevrons = document.querySelectorAll(".fa-chevron-down");
const dropdownInputs = document.querySelectorAll(".dropdown_search-input");
const dropdownList = document.getElementById("ingredients_list");
const appareilsList = document.getElementById("appareils_list");
const ustensilesList = document.getElementById("ustensiles_list");


document.addEventListener("DOMContentLoaded", () => {
    handleDefaultItems();

});


handleDropdown(dropdownTitles, dropdownContents, chevrons);

// Écouteurs d'événements pour chaque dropdown
dropdownInputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
        const search = e.target.value.toLowerCase().trim();

        if (search === "") {
            handleDefaultItems();
        }

        if (e.key === "Enter") {
            if (e.target.id === "ingredientsInput") {
                filterAndUpdateDropdown(search, uniqueIngredients, dropdownList);
            } else if (e.target.id === "appliancesInput") {
                filterAndUpdateDropdown(search, uniqueAppliances, appareilsList);
            } else if (e.target.id === "ustensilsInput") {
                filterAndUpdateDropdown(search, uniqueUstensils, ustensilesList);
            }
        }
    });
});

// Fonction pour filtrer les éléments et mettre à jour le dropdown
function filterAndUpdateDropdown(search, itemList, dropdownType) {
    const filteredItems = itemList.filter(item => item.toLowerCase().includes(search));
    if (filteredItems.length > 0) {
        handleSearchResults(filteredItems, dropdownType);
    } else {
        handleDefaultItems();
    }
}

function handleSearchResults(results, listElement) {
    // Effacer les anciens résultats
    listElement.innerHTML = "";

    // Afficher les nouveaux résultats de la recherche
    results.forEach(result => {
        const li = document.createElement("li");
        li.classList = "dropdown_item";
        li.textContent = result;
        listElement.appendChild(li);
        handleTags(li);
    });
}

// Liste d'items par défaut
function handleDefaultItems() {
    for (const ingredient of uniqueIngredients) {
        const li = document.createElement("li");
        li.classList = "dropdown_item";
        li.textContent = ingredient;
        dropdownList.appendChild(li);
        handleTags(li);
    }
    for (const appliance of uniqueAppliances) {
        const li = document.createElement("li");
        li.classList = "dropdown_item";
        li.textContent = appliance;
        appareilsList.appendChild(li);
        handleTags(li);
    }
    for (const ustensil of uniqueUstensils) {
        const li = document.createElement("li");
        li.classList = "dropdown_item";
        li.textContent = ustensil;
        ustensilesList.appendChild(li);
        handleTags(li);
    }
}

// Appel de la fonction qui gère les events liés à la barre de recherche
handleSearchInput();


