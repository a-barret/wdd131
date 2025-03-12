import recipes from "./recipes.mjs";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomListEntry(recipes) {
    return recipes[getRandomInt(recipes.length)];
}

function tagsTemplate(tags) {
    let tagsHTML = ``;
    for (let tag of tags) {
        tagsHTML += `<span class="tag">${tag}</span>`;
    }
    return tagsHTML;
}

function ratingTemplate(rating) {
	// begin building an html string using the ratings HTML written earlier as a model.
	let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`
    // our ratings are always out of 5, so create a for loop from 1 to 5
    for (let i = 1; i <= 5; i++) {
		// check to see if the current index of the loop is less than our rating
        if (i <= rating) {
		// if so then output a filled star
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`
		// else output an empty star
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`
        }
    }
	// after the loop, add the closing tag to our string
	html += `</span>`
	// return the html string
	return html
}

function recipeTemplate(recipe) {
    return `<article class="recipe">
        <section>
            <img src=${recipe.image} alt="Picture of ${recipe.name}">
        </section>
        <section class="content">
            ${tagsTemplate(recipe.tags)}
            <h2>${recipe.name}</h2>
            ${ratingTemplate(recipe.rating)}
            <p class="hide-medium">${recipe.description}</p>
        </section>
    </article>`
}

function renderRecipes(recipeList) {
    // get the element we will output the recipes into
    const recipeListContainer = document.querySelector("#recipeList");
	// use the recipeTemplate function to transform our recipe objects into recipe HTML strings
    let recipeListHTML = recipeList.map(recipe => recipeTemplate(recipe));
	// Set the HTML strings as the innerHTML of our output element.
    recipeListContainer.innerHTML = recipeListHTML.join("");
}

function searchListObject(recipes, query) {
    function searchCallback(recipe) {
        return recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.find((item) => item.toLowerCase().includes(query)) ||
            recipe.cookTime.toLowerCase().includes(query);            
        }
    const filteredRecipes = recipes.filter(searchCallback);
    const sortedRecipes = filteredRecipes.sort((a,b) => a.cookTime - b.cookTime);
    return sortedRecipes;
}

function searchHandler(event) {
    // console.log("Search Button Clicked")
    event.preventDefault();
    let searchQuery = document.querySelector("#sParameter").value.toLowerCase();
    console.log(searchQuery);
    const filteredRecipes = searchListObject(recipes, searchQuery);
    renderRecipes(filteredRecipes);
}

function init() {
    // get a random recipe
    const recipe = getRandomListEntry(recipes)
    // render the recipe with renderRecipes.
    renderRecipes([recipe]);
}
init();

document.querySelector("#searchIcon").addEventListener("click", searchHandler)

let recipe = getRandomListEntry(recipes);
console.log(recipeTemplate(recipe));