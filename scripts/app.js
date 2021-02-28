
console.log(defaultFoods);
for (let [foodName, props] of Object.entries(defaultFoods)){
  console.log(foodName, props);

}

const currentTable = new FoodTable(new Date().toLocaleDateString("en-US"));


