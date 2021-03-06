let userHistory;
let currentTable;

const custom_input = document.querySelector("#customInput");
const custom_input_sugestions_container = document.querySelector("#sugestionsContainer");
const customInput = new CustomInputSerch(custom_input, custom_input_sugestions_container, searchFunction);


function gotoNextDay() {
    let result = new Date(currentTable.planDate);
    result.setDate(result.getDate() + 1);
    currentTable = userHistory.setCurrentDay(result.toLocaleDateString('en-US'));
    currentTable.populateHtmlTable();
    updateStats();
}

function gotoLastDay() {
    let result = new Date(currentTable.planDate);
    result.setDate(result.getDate() - 1);
    currentTable = userHistory.setCurrentDay(result.toLocaleDateString('en-US'));
    currentTable.populateHtmlTable();
    updateStats();
}

function searchFunction(searchQuery, custom_input) {
    console.log("searching for foods: " + searchQuery);
    document.querySelectorAll('.loading-icon')[0].classList.add('show');
    const template = document.querySelector("#listItemTemplate");
    loadFoodSugestions(searchQuery, 100, custom_input, template);
}

function initializeSession() {
    if (localStorage.getItem("DaysHistory")) {
        const userDaysHistory = new DaysHistory();
        userDaysHistory.setDailyPlans(JSON.parse(localStorage.getItem("DaysHistory")));

        const currentDate = new Date().toLocaleDateString("en-US");
        if (userDaysHistory.getCurrentDayTable().planDate == currentDate) {
            console.log("same day");
            return userDaysHistory;
        } else {
            console.log("creating new day");
            userDaysHistory.addNewDay();
            return userDaysHistory;
        }
    } else {
        const userDaysHistory = new DaysHistory();
        const newTable = new FoodTable(new Date().toLocaleDateString("en-US"));
        userDaysHistory.setDailyPlans([newTable]);
        localStorage.setItem("DaysHistory", JSON.stringify(userDaysHistory.getDailyPlans()));
        return userDaysHistory;
    }
}