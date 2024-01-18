document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.nav-search-bar');
    const searchButton = document.getElementById('search-loup');
    const totalRecipeElement = document.querySelector(".totalRecipes");
    const ingredientDropdownItems = document.getElementById('ingredientDropdownItems');
    const applianceDropdownItems = document.getElementById('applianceDropdownItems');
    const utensilDropdownItems = document.getElementById('utensilDropdownItems');


    function displayRecipes(recipes) {
        const cards = document.getElementById("recipes");
        let children = "";

        totalRecipeElement.textContent = `${recipes.length} recettes`;

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


    function populateDropdowns(recipes) {
        const ingredients = new Set();
        const appliances = new Set();
        const utensils = new Set();

        recipes.forEach(recipe => {
            recipe.ingredients.forEach(item => {
                ingredients.add(item.ingredient);
            });
            appliances.add(recipe.appliance);
            recipe.ustensils.forEach(utensil => {
                utensils.add(utensil);
            });
        });

        ingredients.forEach(ingredient => {
            ingredientDropdownItems.innerHTML += `<li>${ingredient}</li>`;

        });
        appliances.forEach(appliance => {
            applianceDropdownItems.innerHTML += `<li>${appliance}</li>`;

        });
        utensils.forEach(utensil => {
            utensilDropdownItems.innerHTML += `<li>${utensil}</li>`;

        });
    }

    // Fonctions pour filtrer les recettes par ingrédient, appareil et ustensile
    function filterByIngredient(ingredient, recipes) {
        return recipes.filter(recipe =>
            recipe.ingredients.some(ing => ing.toLowerCase().includes(ingredient.toLowerCase()))
        );
    }

    function filterByAppliance(appliance, recipes) {
        return recipes.filter(recipe => recipe.appliance.toLowerCase().includes(appliance.toLowerCase()));
    }

    function filterByUtensil(utensil, recipes) {
        return recipes.filter(recipe => recipe.ustensils.some(u => u.toLowerCase().includes(utensil.toLowerCase())));
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
    totalRecipeElement.textContent = recipes.length + " recettes";
    console.log("DisplayRecipes check: ", recipes);
    searchInput.addEventListener('input', handleSearch);
    searchButton.addEventListener('click', handleSearch);

    // Affichage initial de toutes les recettes
    displayRecipes(recipes);
    populateDropdowns(recipes);
});

// Dropdown toggle behavior
const dropdownToggleButtons = document.querySelectorAll(".dropdown-toggle");
for (let i = 0; i < dropdownToggleButtons.length; i++) {
    const button = dropdownToggleButtons[i];
    button.addEventListener("click", function () {
        event.stopPropagation(); // stop event from propagating to the document
        const dropdownMenu = button.nextElementSibling;

        // Check if dropdownMenu contains .show (if not: hidden, if yes: visible)
        if (dropdownMenu.classList.contains("show") == false) {
            const buttons = document.querySelectorAll(".dropdown-toggle");

            for (let j = 0; j < buttons.length; j++) {
                // Remove .show from next sibling of each .dropdown-toggle
                buttons[j].nextElementSibling.classList.remove("show");
                // Set aria-expanded to false, informs the toggle is closed
                buttons[j].setAttribute("aria-expanded", false);
            }
        }

        dropdownMenu.classList.toggle("show");
        // If .show, aria-expanded informs the toggle is expanded
        button.setAttribute(
            "aria-expanded",
            dropdownMenu.classList.contains("show")
        );
    });
}

window.onload = function () {
    // Call the functions to display the recipes
    displayRecipes(recipes);
    populateDropdowns(recipes);
    attachEventListeners();
};