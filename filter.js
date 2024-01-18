document.addEventListener('DOMContentLoaded', () => {
    // Fonctions et gestionnaires d'événements ici

    // Attacher les écouteurs d'événements aux champs de recherche
    document.getElementById('ingredientSearchInput').addEventListener('input', () => filterDropdownItems('ingredientSearchInput', 'ingredientDropdownItems'));
    document.getElementById('applianceSearchInput').addEventListener('input', () => filterDropdownItems('applianceSearchInput', 'applianceDropdownItems'));
    document.getElementById('utensilSearchInput').addEventListener('input', () => filterDropdownItems('utensilSearchInput', 'utensilDropdownItems'));

    /* Fermer les menus déroulants lors du clic en dehors
    document.addEventListener('click', function (event) {
        if (!event.target.matches('.dropdown-toggle') && !event.target.closest('.dropdown-menu')) {
            closeAllDropdowns();
        }
    });

    // Empêcher la propagation du clic à l'intérieur de la zone de recherche pour éviter la fermeture du menu
    document.querySelectorAll('.dropdown-search-box').forEach(dropdownSearchBox => {
        dropdownSearchBox.addEventListener('click', function (event) {
            event.stopPropagation(); // Cela empêche le clic de fermer le menu déroulant
        });
    });
*/
    // Attacher les événements de clic aux éléments de la liste pour créer des tags
    document.querySelectorAll('#ingredientDropdownItems li, #applianceDropdownItems li, #utensilDropdownItems li').forEach(item => {
        item.addEventListener('click', function (event) {
            event.stopPropagation(); // Arrête la propagation pour empêcher la fermeture du dropdown
            const type = this.closest('.dropdown').id.replace('Dropdown', '');
            const typeClass = type.charAt(0).toUpperCase() + type.slice(1);
            createTag(this.textContent, typeClass);
        });
    });

    // Fonction pour fermer tous les menus déroulants
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    }

    // Fonction de filtrage générique pour les dropdowns
    function filterDropdownItems(inputElementId, dropdownElementId) {
        const inputText = document.getElementById(inputElementId).value.toLowerCase();
        const dropdownItems = document.getElementById(dropdownElementId).querySelectorAll('li');

        dropdownItems.forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(inputText) ? 'block' : 'none';
        });
    }

    // Fonction pour créer un tag
    function createTag(label, typeClass) {
        const tag = document.createElement('div');
        tag.className = 'tag ' + typeClass;
        tag.textContent = label;

        const closeBtn = document.createElement('span');
        closeBtn.textContent = '×';
        closeBtn.className = 'close-tag';
        closeBtn.onclick = function () {
            tag.remove();
            // Ajouter ici la logique pour mettre à jour le modèle de données si nécessaire
        };

        tag.appendChild(closeBtn);

        const tagBox = document.querySelector(`.all${typeClass}Tags`);
        tagBox.appendChild(tag);
    }
});


/*document.addEventListener('DOMContentLoaded', () => {
   const allTags = new Set();

   function createTag(label, typeClass) {
       if (!allTags.has(label)) {
           allTags.add(label);
           const tag = document.createElement('div');
           tag.className = `tag ${typeClass}`;
           tag.textContent = label;

           const closeBtn = document.createElement('span');
           closeBtn.textContent = '×';
           closeBtn.className = 'close-tag';
           closeBtn.onclick = function () {
               tag.remove();
               allTags.delete(label);
           };

           tag.appendChild(closeBtn);
           const tagBox = document.querySelector(`.all${typeClass}Tags`);
           tagBox.appendChild(tag);
       }
   }

   function filterDropdownItems(inputElementId, dropdownElementId) {
       const inputText = document.getElementById(inputElementId).value.toLowerCase();
       const dropdownItems = document.getElementById(dropdownElementId).querySelectorAll('li');
       dropdownItems.forEach(item => {
           item.style.display = item.textContent.toLowerCase().includes(inputText) ? '' : 'none';
       });
   }

   document.querySelectorAll('.dropdown-toggle').forEach(button => {
       button.addEventListener('click', function () {
           const dropdownMenu = this.parentElement.querySelector('.dropdown-menu');
           dropdownMenu.classList.toggle('show');
       });
   });

   document.addEventListener('click', function (event) {
       if (!event.target.matches('.dropdown-toggle') && !event.target.closest('.dropdown-menu')) {
           document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
               menu.classList.remove('show');
           });
       }
   });

   document.querySelectorAll('.dropdown-item').forEach(item => {
       item.addEventListener('click', function (event) {
           const type = this.closest('.dropdown').querySelector('.dropdown-toggle').id.replace('DropdownToggle', '');
           const typeClass = type.charAt(0).toUpperCase() + type.slice(1);
           createTag(this.textContent.trim(), `${typeClass}Tag`);
       });
   });

   document.getElementById('ingredientSearchInput').addEventListener('input', () => filterDropdownItems('ingredientSearchInput', 'ingredientDropdownItems'));
   document.getElementById('applianceSearchInput').addEventListener('input', () => filterDropdownItems('applianceSearchInput', 'applianceDropdownItems'));
   document.getElementById('utensilSearchInput').addEventListener('input', () => filterDropdownItems('utensilSearchInput', 'utensilDropdownItems'));

   document.addEventListener('click', function (event) {
       if (event.target.classList.contains('close-tag')) {
           const label = event.target.parentElement.textContent.replace('×', '').trim();
           allTags.delete(label);
           event.target.parentElement.remove();
       }
   });
});

*/

/*document.addEventListener('DOMContentLoaded', () => {
    // Fonction de filtrage générique pour les dropdowns
    function filterDropdownItems(inputElementId, dropdownElementId) {
        const inputText = document.getElementById(inputElementId).value.toLowerCase();
        const dropdownItems = document.getElementById(dropdownElementId).querySelectorAll('li');

        dropdownItems.forEach(item => {
            if (item.textContent.toLowerCase().includes(inputText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function createTag(label, typeClass) {
        // Créez un nouveau tag
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = label;

        // Bouton de fermeture
        const closeBtn = document.createElement('span');
        closeBtn.textContent = '×';
        closeBtn.className = 'close-tag';
        closeBtn.onclick = function () {
            tag.remove();
        };

        tag.appendChild(closeBtn);

        // Ajoutez le tag à la bonne boîte de tags
        const tagBox = document.querySelector(`.all${typeClass}Tags`);
        tagBox.appendChild(tag);
        // Fermez le menu déroulant
        const dropdownMenu = tagBox.closest('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.classList.remove('show');
        }
    }


    document.querySelectorAll('#ingredientDropdownItems li, #applianceDropdownItems li, #utensilDropdownItems li').forEach(item => {
        item.addEventListener('click', function () {
            const type = this.closest('.dropdown').id; // 'ingredientDropdown', 'applianceDropdown', ou 'utensilDropdown'
            let typeClass = '';
            if (type === 'ingredientDropdown') {
                typeClass = 'Ing';
            } else if (type === 'applianceDropdown') {
                typeClass = 'App';
            } else if (type === 'utensilDropdown') {
                typeClass = 'Ute';
            }
            createTag(this.textContent, typeClass);
        });
    });

    // Attacher les écouteurs d'événements aux champs de recherche
    document.getElementById('ingredientSearchInput').addEventListener('input', () => filterDropdownItems('ingredientSearchInput', 'ingredientDropdownItems'));
    document.getElementById('applianceSearchInput').addEventListener('input', () => filterDropdownItems('applianceSearchInput', 'applianceDropdownItems'));
    document.getElementById('utensilSearchInput').addEventListener('input', () => filterDropdownItems('utensilSearchInput', 'utensilDropdownItems'));
});
*/



