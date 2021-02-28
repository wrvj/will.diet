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

document.querySelector("#addItemToTableBtn").onclick = () => {
  const newFood = new FoodItem("newfood", 0, 0);
  selectedFood = document.querySelector("#newFoodSelect");
  newFood.name = defaultFoods[selectedFood.value].name;
  newFood.setWeight(parseInt(document.querySelector("#weightInput").value));
  newFood.setHour(parseInt(document.querySelector("#hourInput").value));
  newFood.setNutrients(defaultFoods[selectedFood.value].proteins,
                        defaultFoods[selectedFood.value].carbs,
                        defaultFoods[selectedFood.value].fats,
                        defaultFoods[selectedFood.value].fibers,
                        defaultFoods[selectedFood.value].calories,
                        1);
  currentTable.addFoodItemToTable(newFood);
}

function updateStats(){
  const statsContainer = document.querySelectorAll(".stats-container")[0];
  const accContainer = statsContainer.querySelectorAll(".accomplished")[0];
  const goalContainer = statsContainer.querySelectorAll(".goal")[0];
  const goalNutrients = currentTable.getTableNutrients("all");
  const accNutrients = currentTable.getTableNutrients("eaten");

  setStatsValues(goalContainer, goalNutrients);
  setStatsValues(accContainer, accNutrients);

  
}
function setStatsValues(container, nutrients){
  container.querySelectorAll(".stats-kcal")[0].textContent = Math.round(nutrients["calories"]) + " Calories";
  container.querySelectorAll(".stats-proteins")[0].textContent = Math.round(nutrients["proteins"]) + "g Proteins";
  container.querySelectorAll(".stats-carbs")[0].textContent = Math.round(nutrients["carbs"]) + "g Carbs";
  container.querySelectorAll(".stats-fats")[0].textContent = Math.round(nutrients["fats"]) + "g Fats";
  container.querySelectorAll(".stats-fibers")[0].textContent = Math.round(nutrients["fibers"]) + "g Fibers";
}

let tableSelect = document.querySelector("#newFoodSelect");

for (let [foodID, props] of Object.entries(defaultFoods)) {
  let option = document.createElement("option");
  option.text = props.name;
  option.value = props.id;
  tableSelect.add(option);
}