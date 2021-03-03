// const foodInput = document.querySelector('#inputFood');
// const foodDatalist = document.querySelector('#foodDatalist');


// var typingTimer;
// var doneTypingInterval = 1000;

// foodInput.addEventListener('keydown', function() {
//     clearTimeout(typingTimer);
// });
// foodInput.addEventListener('keyup', function() {
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(function() {
//         console.clear();
//         if (foodInput.value != '') {
//             searchFood(foodInput.value, 10);
//         }
//     }, doneTypingInterval);
// });


loadFood(746760);


function loadFood(foodId) {
    searchFood(foodId, 1);

    // console.log("Trying");
    // const apiKey = 'yOZhdNrJ112dXPBbwtS1ZJmhFEAqig0ie5aZNCVU';
    // let result = '';
    // let nutrients = '&nutrients=203%2C208%2C298%2C205%2C291';
    // nutrients = '';

    // fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${apiKey}${nutrients}`, {
    //     headers: {
    //         'accept': 'application/json'
    //     }
    // }).then((res) => res.json().then((data) => {
    //     showFood(data);
    // }));
}

function showFood(data) {
    const foodName = data.description;
    console.log('Food: ' + foodName);

    for (let nutrient of data.foodNutrients) {
        console.log(`${nutrient.nutrient.number} ${nutrient.nutrient.name} ${nutrient.amount}`);
    }
}

function showFoods(foods) {
    //foodDatalist.innerHTML = '';
    for (let food of foods) {
        let option = document.createElement('option');
        option.value = `${foodInput.value} - ${food.description}`;
        //foodDatalist.appendChild(option.cloneNode(true));
        console.log(`${food.description} ${food.fdcId}`);
        //showNutrients(food);
    }
}

function loadFoodSugestions(name, qtd, custom_input, template) {
    const apiKey = 'yOZhdNrJ112dXPBbwtS1ZJmhFEAqig0ie5aZNCVU';

    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${name}&api_key=${apiKey}&dataType=SR%20Legacy&pageSize=${qtd}`, {
        headers: {
            'accept': 'application/json'
        }
    }).then((res) => res.json().then((data) => {
        const results = data.foods;
        const listItems = [];
        for (let food of results) {
            showNutrients(food);
            let newLIstItem = template.content.cloneNode(true);
            console.log(food.description)

            newLIstItem.querySelectorAll('.item-name')[0].innerText = food.description.split(/,(.+)/)[0];
            newLIstItem.querySelectorAll('.item-description')[0].innerText = food.description.split(/,(.+)/)[1] ? (food.description.split(/,(.+)/)[1]) : '';
            //203 protein, 205

            for (let nutrient of food.foodNutrients) {
                switch (nutrient.nutrientNumber) {
                    case '208':
                        newLIstItem.querySelectorAll('.sugestion-item-icons-container')[0].querySelectorAll('p')[0].innerText = nutrient.value;
                        break;
                    case '203':
                        newLIstItem.querySelectorAll('.sugestion-item-icons-container')[0].querySelectorAll('p')[1].innerText = nutrient.value;
                        break;
                    case '205':
                        newLIstItem.querySelectorAll('.sugestion-item-icons-container')[0].querySelectorAll('p')[2].innerText = nutrient.value;
                        break;
                    case '204':
                        newLIstItem.querySelectorAll('.sugestion-item-icons-container')[0].querySelectorAll('p')[3].innerText = nutrient.value;
                        break;
                    case '291':
                        newLIstItem.querySelectorAll('.sugestion-item-icons-container')[0].querySelectorAll('p')[4].innerText = nutrient.value;
                        break;

                }

            }
            listItems.push(newLIstItem.cloneNode(true));
        }
        custom_input.updateSugestionsListItems(listItems);
    }));

}

function searchFood(name, qtd) {
    console.log(`Searching for ${name} in the FDC database (${qtd} results maximum)`);
    const apiKey = 'yOZhdNrJ112dXPBbwtS1ZJmhFEAqig0ie5aZNCVU';

    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${name}&api_key=${apiKey}&dataType=SR%20Legacy&pageSize=${qtd}`, {
        headers: {
            'accept': 'application/json'
        }
    }).then((res) => res.json().then((data) => {
        showFoods(data.foods);
    }));
}

function showNutrients(food) {
    const nutrientsToShow = ['203', '205', '204', '208', '291'];

    for (let nutrient of food.foodNutrients) {
        if (nutrientsToShow.includes(nutrient.nutrientNumber)) {
            console.log(`${nutrient.nutrientNumber} ${nutrient.nutrientName} ${nutrient.value}`);
        }
    }
}