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

class FoodItem {

  constructor(name, weight, hour) {
    this.foodItemId = FoodItem.incrementId();
    this.name = name;
    this.weight = weight;
    this.hour = hour;
    this.status = "planned";

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
  }
  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  };
}

class FoodItemTable {

  constructor(planDate) {
    this.foodQtd = 0;
    this.foodItems = [];
    this.planDate = planDate;
    this.tableOrder = {};

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
      let rowTemplate = document.getElementsByTagName("template")[0];
      let tableElement = document.getElementsByTagName("tbody")[0];
      let clone = rowTemplate.content.cloneNode(true);
      clone.querySelectorAll(".table-item-hour")[0].textContent = foodItem.hour + 'h';
      clone.querySelectorAll(".table-item-name")[0].textContent = foodItem.name;
      clone.querySelectorAll(".table-item-weight")[0].textContent = foodItem.weight + 'g';

      tableElement.appendChild(clone.cloneNode(true));
    }
    this.populateTable = function () {
      let rowTemplate = document.getElementsByTagName("template")[0];
      let tableElement = document.getElementsByTagName("tbody")[0];
      tableElement.innerHTML = "";

      let clone = rowTemplate.content.cloneNode(true);
      console.log(clone.querySelectorAll("tr")[0]);

      for (let f of this.foodItems) {
        clone.querySelectorAll(".table-item-hour")[0].textContent = f.hour;
        clone.querySelectorAll(".table-item-name")[0].textContent = f.name;
        clone.querySelectorAll(".table-item-weight")[0].textContent = f.weight;

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
