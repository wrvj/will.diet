document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    createLoadingIcon();
    userHistory = initializeSession();
    currentTable = new FoodTable(userHistory.getCurrentDayTable().planDate);

    currentTable.foodQtd = userHistory.getCurrentDayTable().foodQtd;
    currentTable.foodItems = userHistory.getCurrentDayTable().foodItems;
    currentTable.tableOrder = userHistory.getCurrentDayTable().tableOrder;
    currentTable.tableTotalNutrients = userHistory.getCurrentDayTable().tableTotalNutrients;
    currentTable.recreateFoodItems();
    currentTable.populateHtmlTable();
    updateStats();
});


function deleteItemFromTable(event) {
    currentTable.removeFoodItem(event.target.value);
}

function toggleFoodEaten(event) {
    currentTable.toggleFoodStatusById(event.target.value);
    if (event.target.querySelectorAll('.toggle-eaten-button-icon')[0].classList.contains("eaten")) {

        event.target.querySelectorAll('.toggle-eaten-button-icon')[0].classList.remove("eaten");

    } else {
        event.target.querySelectorAll('.toggle-eaten-button-icon')[0].classList.add("eaten");
    }
    event.target.blur();
}

function createLoadingIcon() {
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

    userHistory.updateDayTable(currentTable);
    setCalendarValues(new Date(currentTable.planDate));
    localStorage.setItem("DaysHistory", JSON.stringify(userHistory.getDailyPlans()));
}


function setStatsValues(container, nutrients) {
    container.querySelectorAll(".stats-kcal")[0].textContent = Math.round(nutrients["calories"]) + " Calories";
    container.querySelectorAll(".stats-proteins")[0].textContent = Math.round(nutrients["proteins"]) + "g Proteins";
    container.querySelectorAll(".stats-carbs")[0].textContent = Math.round(nutrients["carbs"]) + "g Carbs";
    container.querySelectorAll(".stats-fats")[0].textContent = Math.round(nutrients["fats"]) + "g Fats";
    container.querySelectorAll(".stats-fibers")[0].textContent = Math.round(nutrients["fibers"]) + "g Fibers";
}

function setCalendarValues(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateContainer = document.querySelector('#date').querySelectorAll('div')[0];

    document.querySelectorAll('.daily-plan-title')[0].innerText = `Daily plan for ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}.`;

    dateContainer.querySelectorAll('p')[0].innerText = months[date.getMonth()];
    dateContainer.querySelectorAll('p')[1].innerText = date.getDate();
    dateContainer.querySelectorAll('p')[2].innerText = date.getFullYear();

}