
const totalRecipeElement = document.querySelector(".totalRecipes");
const recipesSection = document.querySelector("#recipes");

function displayRecipes(recipes) {
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        // Creates div for each recipe
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipeCard");

        const recipeLink = document.createElement("a");
        recipeLink.href = "#";

        const recipeImage = document.createElement("img");
        recipeImage.classList.add("recipeImage");
        recipeImage.src = "./assets/images/recettes/" + recipe.image;
        recipeImage.alt = recipe.name;

        const recipeTime = document.createElement("p");
        recipeTime.classList.add("recipeTime");
        recipeTime.textContent = recipe.time + "min";

        const recipeName = document.createElement("h2");
        recipeName.classList.add("recipeName");
        recipeName.textContent = recipe.name;

        const recipeBody = document.createElement("div");
        recipeBody.classList.add("recipeBody");

        const recipeSection = document.createElement("div");
        recipeSection.classList.add("recettesSection");

        const recetteTitle = document.createElement("h3");
        recetteTitle.classList.add("recipeTitle");
        recetteTitle.textContent = "recette";

        const recipeDescription = document.createElement("p");
        recipeDescription.classList.add("recipeDescription");
        recipeDescription.textContent = recipe.description;

        const ingredientsSection = document.createElement("div");
        ingredientsSection.classList.add("ingredientsSection");

        const ingredientsTitle = document.createElement("h3");
        ingredientsTitle.classList.add("recipeTitle");
        ingredientsTitle.textContent = "ingrédients";

        const ingredientsTable = document.createElement("table");
        ingredientsTable.classList.add("ingredientsTable");

        for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j];
            const ingredientRow = document.createElement("tr");
            const ingredientNameCell = document.createElement("td");
            ingredientNameCell.classList.add("ingredientNameCell");
            ingredientNameCell.textContent = ingredient.ingredient;
            ingredientRow.appendChild(ingredientNameCell);

            if (ingredient.quantity) {
                const lineBreakRow = document.createElement("tr");
                const quantityUnitCell = document.createElement("td");
                quantityUnitCell.classList.add("quantityUnitCell");

                if (ingredient.unit) {
                    const quantityUnitText = `${ingredient.quantity} ${ingredient.unit}`;
                    quantityUnitCell.textContent = quantityUnitText;
                } else {
                    quantityUnitCell.textContent = ingredient.quantity;
                }

                ingredientRow.appendChild(lineBreakRow);
                ingredientRow.appendChild(quantityUnitCell);
            }

            ingredientsTable.appendChild(ingredientRow);
        }

        // Create elements for appliance and utensils
        if (recipe.appliance) {
            const recipeAppliance = document.createElement("div");
            recipeAppliance.classList.add("recipeAppliance");
            recipeAppliance.textContent = recipe.appliance;

            // Append the HTML elements to the recipe card
            recipeSection.appendChild(recetteTitle);
            recipeSection.appendChild(recipeDescription);
            recipeSection.appendChild(recipeAppliance);
        } else {
            recipeSection.appendChild(recetteTitle);
            recipeSection.appendChild(recipeDescription);
        }

        // Create element for utensils if available
        if (recipe.ustensils && recipe.ustensils.length > 0) {
            const recipeUtensil = document.createElement("div");
            recipeUtensil.classList.add("recipeUtensil");
            recipeUtensil.textContent = recipe.ustensils.join(", ");

            recipeSection.appendChild(recipeUtensil);
        }
        ingredientsSection.appendChild(ingredientsTitle);
        ingredientsSection.appendChild(ingredientsTable);

        recipeBody.appendChild(recipeSection);
        recipeBody.appendChild(ingredientsSection);

        recipeLink.appendChild(recipeImage);
        recipeLink.appendChild(recipeTime);
        recipeLink.appendChild(recipeName);
        recipeLink.appendChild(recipeBody);

        recipeCard.appendChild(recipeLink);

        recipesSection.appendChild(recipeCard);
    }

    // Set the text content for total number of recipes
    totalRecipeElement.textContent = recipes.length + " recettes";
    console.log("DisplayRecipes check: ", recipesSection);
}

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


/* Fonction pour afficher les recettes sur la page
function displayRecipes(recipes) {
    // On récupère l'élément du DOM où les recettes seront affichées
    const cards = document.getElementsById("recipes")
    // On initialise une variable pour construire le contenu HTML
    let children = ""

    // On parcourt le tableau de recettes
    for (let i = 0; i < recipes.length; i++) {
        // On initialise une variable pour la liste des ingrédients
        let ingredientList = ""

        // On parcourt les ingrédients de la recette courante pour construire leur HTML
        recipes[i].ingredients.forEach(ing => ingredientList += `<p class="card-ingredient col-sm-6"><b>${ing.ingredient}</b><br><span>${ing.quantity ? ing.quantity : "-"} ${ing.unit ? ing.unit : ""}</span></p>`)

        // On construit le HTML de la carte de recette et on l'ajoute au contenu global
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
        </div>`
    }

    // On injecte le contenu HTML global dans l'élément du DOM
    cards.innerHTML = `<div>
    <div class="row gy-5">
    ${children}</div>
    </div>`
}

// On appelle la fonction `displayRecipes` pour initialiser l'affichage des recettes
displayRecipes(recipes);

// *-----------la partie de recherche------------------*

// On attend que le DOM soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {
    // On sélectionne le champ de recherche et le bouton de recherche
    const searchInput = document.querySelector('.nav-search-bar');
    const searchButton = document.getElementById('search-loup');

    // Cette fonction sera appelée pour gérer la recherche
    function handleSearch() {
        // On récupère la valeur saisie, convertie en minuscules
        const searchTerm = searchInput.value.toLowerCase();
        // On effectue la recherche seulement si au moins 3 caractères ont été saisis
        if (searchTerm.length >= 3) {
            // On filtre le tableau des recettes
            const filteredRecipes = recipes.filter(recipe => {
                // On vérifie si le terme de recherche est présent dans le nom, la description ou les ingrédients
                return recipe.name.toLowerCase().includes(searchTerm) ||
                    recipe.description.toLowerCase().includes(searchTerm) ||
                    recipe.ingredients.some(ingredientObj =>
                        ingredientObj.name && ingredientObj.name.toLowerCase().includes(searchTerm)
                    );
            });
            // On affiche les recettes filtrées
            displayRecipes(filteredRecipes);
        } else {
            // Si moins de 3 caractères, on affiche toutes les recettes
            displayRecipes(recipes);
        }
    }

    // On ajoute des écouteurs d'événements pour lancer la recherche lors de la saisie ou du clic
    searchInput.addEventListener('input', handleSearch);
    searchButton.addEventListener('click', handleSearch);

    // On affiche toutes les recettes par défaut
    displayRecipes(recipes);
});




