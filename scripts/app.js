function searchFunction(searchQuery, custom_input) {
    console.log("searching for foods: " + searchQuery);
    const template = document.querySelector("#listItemTemplate");
    loadFoodSugestions(searchQuery, 100, custom_input, template);
}

const custom_input = document.querySelector("#customInput");
const custom_input_sugestions_container = document.querySelector("#sugestionsContainer");
const customInput = new CustomInputSerch(custom_input, custom_input_sugestions_container, searchFunction);

const currentTable = new FoodTable(new Date().toLocaleDateString("en-US"));