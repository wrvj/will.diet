const defaultFoods = {
    0: { id: 0, name: "Pasta", proteins: 0.12, carbs: 0.72, fats: 0.015, fibers: 0.0, calories: 3.55 },
    1: { id: 1, name: "Chicken Breast", proteins: 0.31, carbs: 0.0, fats: 0.036, fibers: 0.0, calories: 1.65 },
    2: { id: 2, name: "Rice", proteins: 10, carbs: 20, fats: 10, fibers: 15, calories: 200 },
    3: { id: 3, name: "Chicken", proteins: 10, carbs: 20, fats: 10, fibers: 15, calories: 200 },
    4: { id: 4, name: "White Fish", proteins: 10, carbs: 20, fats: 10, fibers: 15, calories: 200 },
    5: { id: 5, name: "Whole Milk", proteins: 10, carbs: 20, fats: 10, fibers: 15, calories: 200 },
    6: { id: 6, name: "Beef", proteins: 10, carbs: 20, fats: 10, fibers: 15, calories: 200 },
    7: { id: 7, name: "Bananas", proteins: 10, carbs: 20, fats: 10, fibers: 15, calories: 200 },
    8: { id: 8, name: "Orange Juice", proteins: 10, carbs: 20, fats: 10, fibers: 15, calories: 200 },
    9: { id: 9, name: "Grape Juice", proteins: 10, carbs: 20, fats: 10, fibers: 15, calories: 200 },
    10: { id: 10, name: "Oatmeal", proteins: 10, carbs: 20, fats: 10, fibers: 15, calories: 200 }
}

class FoodItem {

    constructor(name, description, portion, hour) {
        this.foodItemId = FoodItem.incrementId();
        this.name = name;
        this.description = description;
        this.portion = portion;
        this.hour = hour;
        this.status = "planned";
        this.proteins = 0;
        this.carbs = 0;
        this.fats = 0;
        this.fibers = 0;
        this.calories = 0;

        this.cloneItem = function(newItem) {
            this.foodItemId = newItem.foodItemId;
            this.name = newItem.name;
            this.description = newItem.description;
            this.portion = newItem.portion;
            this.hour = newItem.hour;
            this.status = newItem.status;
            this.proteins = newItem.proteins;
            this.carbs = newItem.carbs;
            this.fats = newItem.fats;
            this.fibers = newItem.fibers;
            this.calories = newItem.calories;
        }
        this.setHour = function(newHour) {
            if (!isNaN(newHour))
                this.hour = newHour;
        }
        this.setPlusAnHour = function() {
            this.hour = ((this.hour + 1) % 24);
        };
        this.setMinusAnHour = function() {
            this.hour = ((this.hour + 23) % 24);
        }
        this.setPortion = function(newportion) {
            if (!isNaN(newportion))
                this.portion = newportion;
        };
        this.setStatus = function(newStatus) {
            this.status = newStatus;
        };
        this.toggleStatus = function() {
            this.status = (this.status == "planned") ? "eaten" : "planned";
        };
        this.setNutrients = function(calories, proteins, carbs, fats, fibers, serving) {
            if (isNaN(serving)) {
                serving = 1;
            }
            this.proteins = proteins / serving;
            this.carbs = carbs / serving;
            this.fats = fats / serving;
            this.fibers = fibers / serving;
            this.calories = calories / serving;
        };
        this.getNutrientsByServing = function(serving) {
            return {
                proteins: this.proteins * serving,
                carbs: this.carbs * serving,
                fats: this.fats * serving,
                fibers: this.fibers * serving,
                calories: this.calories * serving
            };
        };
    }
    static incrementId() {
        if (!this.latestId) this.latestId = 1;
        else this.latestId++;
        return this.latestId;
    };
}

class FoodTable {

    constructor(planDate) {
        this.foodQtd = 0;
        this.foodItems = [];
        this.planDate = planDate;
        this.tableOrder = {};
        this.tableTotalNutrients = { proteins: 0, carbs: 0, fats: 0, fibers: 0, calories: 0 };

        this.recreateFoodItems = function() {
            for (let i = 0; i < this.foodItems.length; i++) {
                let tempFoodItem = new FoodItem("name", "description", 0, 0);
                tempFoodItem.cloneItem(this.foodItems[i]);
                this.foodItems[i] = tempFoodItem;
            }
        }

        this.addFoodItem = function(foodItem) {
            this.foodItems.push(foodItem);
            this.tableOrder[this.foodQtd] = foodItem.foodItemId++;
        }
        this.removeFoodItem = function(idToRemove) {
            for (let i in this.foodItems) {
                if (this.foodItems[i].foodItemId == idToRemove) {
                    this.foodItems.splice(i, 1);
                    this.populateHtmlTable();
                    updateStats();
                }
            }
        }
        this.toggleFoodStatusById = function(foodId) {

            for (let i in this.foodItems) {
                if (this.foodItems[i].foodItemId == foodId) {
                    this.foodItems[i].toggleStatus();
                    updateStats();
                }
            }
        }
        this.setAllFoodsStatus = function(newStatus) {
            for (let f of this.foodItems) {
                f.setStatus(newStatus);
            }
        }
        this.addFoodItemToTable = function(foodItem) {
            this.addFoodItem(foodItem);
            this.populateHtmlTable();
            updateStats();
        }
        this.getTableNutrients = function(status) {
            let nutrients = { proteins: 0, carbs: 0, fats: 0, fibers: 0, calories: 0 };
            for (let food of this.foodItems) {
                if (food.status == status || status == "all") {
                    nutrients["proteins"] += food.getNutrientsByServing(food.portion)["proteins"];
                    nutrients["carbs"] += food.getNutrientsByServing(food.portion)["carbs"];
                    nutrients["fats"] += food.getNutrientsByServing(food.portion)["fats"];
                    nutrients["fibers"] += food.getNutrientsByServing(food.portion)["fibers"];
                    nutrients["calories"] += food.getNutrientsByServing(food.portion)["calories"];
                }
            }
            return nutrients;
        }
        this.populateHtmlTable = function() {
            let rowTemplate = document.querySelector("#foodTableItemTemplate");
            let tableElement = document.getElementsByTagName("tbody")[0];
            tableElement.innerHTML = "";

            let clone = rowTemplate.content.cloneNode(true);
            console.log(clone.querySelectorAll("tr")[0]);

            for (let f of this.foodItems) {
                clone.querySelectorAll(".table-item-hour")[0].textContent = f.hour + "h";
                clone.querySelectorAll(".table-item-name")[0].textContent = f.name;
                clone.querySelectorAll(".table-item-weight")[0].textContent = f.portion + "g";
                clone.querySelectorAll(".delete-button")[0].value = f.foodItemId;
                clone.querySelectorAll(".toggle-eaten-button")[0].value = f.foodItemId;
                console.log(f.status);
                clone.querySelector('.toggle-eaten-button-icon').classList.remove('eaten');
                clone.querySelector('.toggle-eaten-button-icon').classList.add(f.status);
                tableElement.appendChild(clone.cloneNode(true));
            }
        }
    }
}

class DaysHistory {
    constructor() {
        this.dailyPlans = [];
        console.log("new daily plan created");

        this.setDailyPlans = function(newDailyPlans) {
            this.dailyPlans = newDailyPlans;
            console.log(this.dailyPlans, this.dailyPlans.length);
        }
        this.getDailyPlans = function() {
            return this.dailyPlans;
        }
        this.getCurrentDayTable = function() {
            return this.dailyPlans[this.dailyPlans.length - 1];
        }
        this.addNewDay = function() {
            this.dailyPlans.push(new FoodTable(new Date().toLocaleDateString("en-US")));
        }
        this.updateDayTable = function(dayTable) {
            for (let i = 0; i < this.dailyPlans.length; i++) {
                if (this.dailyPlans[i].planDate == dayTable.planDate) {
                    this.dailyPlans[i] = dayTable;
                    break;
                }
            }
        }
        this.setCurrentDay = function(date) {
            const newTable = new FoodTable(date);
            for (let t of this.dailyPlans) {
                if (t.planDate == date) {
                    newTable.foodQtd = t.foodQtd;
                    newTable.foodItems = t.foodItems;
                    newTable.tableOrder = t.tableOrder;
                    newTable.tableTotalNutrients = t.tableTotalNutrients;
                    newTable.recreateFoodItems();
                    newTable.populateHtmlTable();
                    return newTable;
                }
            }
            this.dailyPlans.push(newTable);
            return newTable;
        }
    }
}