document.querySelector("#customInput").addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        document.querySelector("#portionInput input").focus();
    }
});
document.querySelector("#portionInput input").addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        document.querySelector("#timeInput input").focus();
    }
});
document.querySelector("#timeInput input").addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        document.querySelector("#addItemToTableBtn").click();
        document.querySelector("#customInput").value = '';
    }
});



try {
    var showNewItem = false;
    document.getElementById("addNewItemDialog").onclick = () => {
        console.log(showNewItem);
        if (showNewItem == false) {
            showNewItem = true;
            document.getElementById("addItemDialog").classList.remove('add-item-dialog-collapsed');
        } else {
            showNewItem = false;
            document.getElementById("addItemDialog").classList.add('add-item-dialog-collapsed');
        }
    }
} catch (error) {
    console.log("Erro ao localizar o elemento! " + error);
}


document.querySelector("#addItemToTableBtn").onclick = () => {
    console.log("HEres");
    const newFood = new FoodItem("newfood", " ", 0, 0);
    selectedFood = document.querySelector(".sugestion-list-item.focused");
    newFood.name = selectedFood.querySelectorAll('.item-name')[0].innerText;
    newFood.setPortion(parseInt(document.querySelector("#portionInput input").value));
    newFood.setHour(parseInt(document.querySelector("#timeInput input").value));

    newFood.setNutrients(selectedFood.querySelectorAll('p')[0].innerText, selectedFood.querySelectorAll('p')[1].innerText, selectedFood.querySelectorAll('p')[2].innerText, selectedFood.querySelectorAll('p')[3].innerText, selectedFood.querySelectorAll('p')[4].innerText, 100);
    currentTable.addFoodItemToTable(newFood);
}

function updateStats() {
    const statsContainer = document.querySelectorAll(".stats-container")[0];
    const accContainer = statsContainer.querySelectorAll(".accomplished")[0];
    const goalContainer = statsContainer.querySelectorAll(".goal")[0];
    const goalNutrients = currentTable.getTableNutrients("all");
    const accNutrients = currentTable.getTableNutrients("eaten");

    setStatsValues(goalContainer, goalNutrients);
    setStatsValues(accContainer, accNutrients);


}

function setStatsValues(container, nutrients) {
    container.querySelectorAll(".stats-kcal")[0].textContent = Math.round(nutrients["calories"]) + " Calories";
    container.querySelectorAll(".stats-proteins")[0].textContent = Math.round(nutrients["proteins"]) + "g Proteins";
    container.querySelectorAll(".stats-carbs")[0].textContent = Math.round(nutrients["carbs"]) + "g Carbs";
    container.querySelectorAll(".stats-fats")[0].textContent = Math.round(nutrients["fats"]) + "g Fats";
    container.querySelectorAll(".stats-fibers")[0].textContent = Math.round(nutrients["fibers"]) + "g Fibers";
}

// let tableSelect = document.querySelector("#newFoodSelect");

// for (let [foodID, props] of Object.entries(defaultFoods)) {
//   let option = document.createElement("option");
//   option.text = props.name;
//   option.value = props.id;
//   tableSelect.add(option);
// }