
// Fonction pour afficher les recettes sur la page
function displayRecipes(recipes) {
    // On récupère l'élément du DOM où les recettes seront affichées
    const cards = document.getElementById("recipes")
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




