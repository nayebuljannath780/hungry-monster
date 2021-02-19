const StartSearch = () => {
    const inputFood = document.getElementById('first-input').value;
    const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFood}`;
    fetch(api)
        //fetch the food name from input
        .then(response => response.json())
        .then(data => {
            document.getElementById('items').innerHTML = "";
            //make it null because of showing next result
            document.getElementById('food-info').innerHTML = "";
            //make it null because of showing next result
            const items = document.getElementById('items');
            data.meals.forEach(searchResult => {
                let searchFood = document.createElement('div');
                //created a child div inside items id 
                let Meals = ` <img src="${ searchResult.strMealThumb }" onclick="showResult(${ searchResult.idMeal })">
                <h2 onclick="showResult(${ searchResult.idMeal })">${ searchResult.strMeal }</h2> `;
                searchFood.className = "card";
                searchFood.innerHTML = Meals;
                items.appendChild(searchFood);
            });
        })
        .catch(error => {
            //catch error for no result from search
            document.getElementById('food-info').innerHTML = "";
            document.getElementById('items').innerHTML = "";          
            const items = document.getElementById('items');
            const noResult = document.createElement('h2');
            noResult.innerHTML = "No Items Found...";
            items.appendChild(noResult);
        })
}
//using async await instead of fetch
const showResult = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const response = await fetch(url);
    const data = await response.json();
    showIngredients(data);
}
const showIngredients = data => {
    const foodInfo = document.getElementById('food-info');
    document.getElementById('food-info').innerHTML = "";
    document.getElementById('food-info').style.display = 'block';
    let detailsInfo = document.createElement('div');

    //show both integrate and measurement 
    const integrate = `
            <img src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1> 
            <h2>Categories: ${ data.meals[0].strCategory }</h2>
            <h2>Area: ${ data.meals[0].strArea }</h2>
            <br>
            <h4><strong><u>Ingredients</u></strong></h4>
            <h4><span> ${ data.meals[0].strIngredient1 }</span> <span>${ data.meals[0].strMeasure1 }</span></h4>
            <h4><span> ${ data.meals[0].strIngredient2 }</span> <span>${ data.meals[0].strMeasure2 }</span></h4>
            <h4><span> ${ data.meals[0].strIngredient3 }</span> <span>${ data.meals[0].strMeasure3 }</span></h4>
            <h4><span> ${ data.meals[0].strIngredient4 }</span> <span>${ data.meals[0].strMeasure4 }</span></h4>
            <h4><span> ${ data.meals[0].strIngredient5 }</span> <span>${ data.meals[0].strMeasure5 }</span></h4>
            <h4><span> ${ data.meals[0].strIngredient6 }</span> <span>${ data.meals[0].strMeasure6 }</span></h4>
            <h4><span> ${ data.meals[0].strIngredient7 }</span> <span>${ data.meals[0].strMeasure7 }</span></h4>     
        `;
    detailsInfo.innerHTML = integrate;
    detailsInfo.className = 'total-info';
    foodInfo.appendChild(detailsInfo);
    
}