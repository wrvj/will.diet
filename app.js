
console.log(defaultFoods);
for (let [foodName, props] of Object.entries(defaultFoods)){
  console.log(foodName, props);

}

class FoodItem {

  constructor(name, weight, hour) {
    this.foodItemId = FoodItem.incrementId();
    this.name = name;
    this.weight = weight;
    this.hour = hour;
    this.status = "planned";
    this.proteins = 0;
    this.carbs = 0;
    this.fats = 0;
    this.fibers = 0;
    this.calories = 0;

    this.setHour = function (newHour) {
      this.hour = newHour;
    }
    this.setPlusAnHour = function () {
      this.hour = ((this.hour + 1) % 24);
    };
    this.setMinusAnHour = function () {
      this.hour = ((this.hour + 23) % 24);
    }
    this.setWeight = function (newWeight) {
      this.weight = newWeight;
    };
    this.setStatus = function (newStatus) {
      this.status = newStatus;
    };
    this.toggleStatus = function () {
      this.status = (this.status == "planned") ? "eaten" : "planned";
    };
    this.setNutrients = function (proteins, carbs, fats, fibers, calories, serving) {
      if (isNaN(serving)) {
        serving = 1;
      }
      this.proteins = proteins / serving;
      this.carbs = carbs / serving;
      this.fats = fats / serving;
      this.fibers = fibers / serving;
      this.calories = calories / serving;
    };
    this.getNutrientsByServing = function (serving) {
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

    this.addFoodItem = function (foodItem) {
      this.foodItems.push(foodItem);
      this.tableOrder[this.foodQtd] = foodItem.foodItemId++;
    }
    this.removeFoodItem = function (idToRemove) {
      for (let i in this.foodItems) {
        if (this.foodItems[i].foodItemId = idToRemove) {
          this.foodItems.splice(i, 1);
        }
      }
    }
    this.setAllFoodsStatus = function (newStatus) {
      for (let f of this.foodItems) {
        f.setStatus(newStatus);
      }
    }
    this.addFoodItemToTable = function (foodItem) {
      this.addFoodItem(foodItem);
      this.populateHtmlTable();
    }
    this.getTableNutrients = function (status) {
      let nutrients = { proteins: 0, carbs: 0, fats: 0, fibers: 0, calories: 0 };
      for (let food of this.foodItems) {
        if (food.status == status) {
          nutrients["proteins"] += food.getNutrientsByServing(food.weight)["proteins"];
          nutrients["carbs"] += food.getNutrientsByServing(food.weight)["carbs"];
          nutrients["fats"] += food.getNutrientsByServing(food.weight)["fats"];
          nutrients["fibers"] += food.getNutrientsByServing(food.weight)["fibers"];
          nutrients["calories"] += food.getNutrientsByServing(food.weight)["calories"];
        }
      }
      return nutrients;
    }
    this.populateHtmlTable = function () {
      let rowTemplate = document.getElementsByTagName("template")[0];
      let tableElement = document.getElementsByTagName("tbody")[0];
      tableElement.innerHTML = "";

      let clone = rowTemplate.content.cloneNode(true);
      console.log(clone.querySelectorAll("tr")[0]);

      for (let f of this.foodItems) {
        clone.querySelectorAll(".table-item-hour")[0].textContent = f.hour + "h";
        clone.querySelectorAll(".table-item-name")[0].textContent = f.name;
        clone.querySelectorAll(".table-item-weight")[0].textContent = f.weight + "g";

        tableElement.appendChild(clone.cloneNode(true));
      }
    }
  }
}

class Day {
  constructor(dailyPlanTable) {
    this.dailyPlanTable = dailyPlanTable;
  }
}
