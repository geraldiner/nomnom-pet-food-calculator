/**
 * Lists of recipes as objects for accessing the data for each easier and avoid hard-coding
 */
// List of NomNom dog food recipes as objects
const NOMNOM_RECIPES_DOG = [
	{
		"name": "Beef Mash",
		"protein": 77,
		"fat": 40,
		"carb": 111,
		"imgUrl": "https://www.nomnomnow.com/images/recipes/bowl_beef_square.png",
	},
	{
		"name": "Chicken Cuisine",
		"protein": 80,
		"fat": 56,
		"carb": 71,
		"imgUrl": "https://www.nomnomnow.com/images/recipes/bowl_chicken_square.png",
	},
	{
		"name": "Turkey Fare",
		"protein": 78,
		"fat": 41,
		"carb": 109,
		"imgUrl": "https://www.nomnomnow.com/images/recipes/bowl_turkey_square.png",
	},
	{
		"name": "Pork Potluck",
		"protein": 76,
		"fat": 48,
		"carb": 93,
		"imgUrl": "https://www.nomnomnow.com/images/recipes/bowl_pork_square.png",
	},
];

// List of NomNom cat food recipes as objects
const NOMNOM_RECIPES_CAT = [
	{
		"name": "Chicken Cuisine",
		"protein": 163,
		"fat": 34,
		"carb": 41,
		"imgUrl": "https://www.nomnomnow.com/images/recipes/bowl_cat_chicken_square.png",
	},
];

// List of dog food brands as objects
const PET_FOOD_BRANDS_DOG = [
	{
		"name": "Blue Buffalo ® Wilderness ™ Chicken",
		"protein": 99,
		"fat": 44,
		"carb": 79,
		"proteinPercent": 34,
		"fatPercent": 15,
		"cal": 3599,
		"imgUrl": "https://www.nomnomnow.com/images/brands/blue_buffalo_chicken.jpg",
	},
	{
		"name": "Hill's ® Chicken & Brown Rice",
		"protein": 54,
		"fat": 40,
		"carb": 135,
		"proteinPercent": 19,
		"fatPercent": 14,
		"cal": 3784,
		"imgUrl": "https://www.nomnomnow.com/images/brands/hill_chicken.jpg",
	},
	{
		"name": "Holistic Select ® Chicken & Brown Rice",
		"protein": 68,
		"fat": 41,
		"carb": 79,
		"proteinPercent": 25,
		"fatPercent": 15,
		"cal": 3916,
		"imgUrl": "https://www.nomnomnow.com/images/brands/holistic_select_chicken_rice.jpg",
	},
];

// List of cat food brands as objects
const PET_FOOD_BRANDS_CAT = [
	{
		"name": "Blue Buffalo ® Wilderness ™ Chicken",
		"protein": 108,
		"fat": 50,
		"carb": 57,
		"proteinPercent": 40,
		"fatPercent": 18,
		"cal": 3832,
		"imgUrl": "https://www.nomnomnow.com/images/brands/blue_buffalo_cat_chicken.jpg",
	},
	{
		"name": "Iams ® Chicken",
		"protein": 90,
		"fat": 43,
		"carb": 92,
		"proteinPercent": 32,
		"fatPercent": 15,
		"cal": 3740,
		"imgUrl": "https://www.nomnomnow.com/images/brands/iams_cat_chicken.jpg",
	},
	{
		"name": "Natural Balance ® Green Pea & Chicken",
		"protein": 88,
		"fat": 36,
		"carb": 111,
		"proteinPercent": 30,
		"fatPercent": 12,
		"cal": 3600,
		"imgUrl": "https://www.nomnomnow.com/images/brands/natural_balance_cat_chicken.jpg",
	},
];

/**
 * Global variables to be accessed throughout the code, especially in EventListeners
 */
// type of pet food being compared, either dog or cat
let petType;
// selected pet food from dropdown, intially undefined
let petFoodBrand;
// selected NomNom recipe, initalized to whatever's first in the list based on petType
let nomNomRecipe;

/**
 * DOM elements and EventListeners
 *
 */
// Radio buttons for choosing between dog and cat
const petTypeRadioBtns = document.querySelectorAll('input[name="petType"]');
// EventListener for each radio button to set the current petType to the selected radio button. Then update the selection for pet food brands and NomNom recipes based on the new petType.
petTypeRadioBtns.forEach(r => {
	r.addEventListener("click", e => {
		petType = e.target.value;
		updatePetFoodSelection();
		updateNomNomSelection();
		resetResults();
	});
});

// Dropdown menu for selecting the pet food brand
const petFoodSelect = document.querySelector("#pet-food-brand-select");
// EventListener to change the current petFoodBrand when the user makes a new selection. Then update the results section.
petFoodSelect.onchange = e => {
	petFoodBrand = petType === "dog" ? PET_FOOD_BRANDS_DOG[e.target.value] : PET_FOOD_BRANDS_CAT[e.target.value];
	updatePetFoodResults();
	updateNomNomResults();
	document.querySelector("#details").classList.remove("hidden");
	document.querySelector("#cta").classList.remove("hidden");
};

// Dropdown menu for selecting the NomNom recipe
const nomNomRecipeSelect = document.querySelector("#nomnom-recipe-select");
// EventListener to change the current nomNomRecipe when the user makes a new selection. Then update the results section.
nomNomRecipeSelect.onchange = e => {
	nomNomRecipe = petType === "dog" ? NOMNOM_RECIPES_DOG[e.target.value] : NOMNOM_RECIPES_CAT[e.target.value];
	updatePetFoodResults();
	updateNomNomResults();
	document.querySelector("#details").classList.remove("hidden");
	document.querySelector("#cta").classList.remove("hidden");
};

// Once the window loads, initialize petType to dog (initially checked). Then update the dropdown menus for dog food/recipes.
window.onload = () => {
	petType = "dog";
	updatePetFoodSelection();
	updateNomNomSelection();
};

// Update the pet food dropdown menu based on the current petType
function updatePetFoodSelection() {
	petFoodSelect.innerHTML = `<option value="">Select Pet Food Brand</option>`;
	let brands = petType === "dog" ? PET_FOOD_BRANDS_DOG : PET_FOOD_BRANDS_CAT;
	updateSelection(brands, petFoodSelect);
}

// Update the NomNom dropdown menu based on the current petType
function updateNomNomSelection() {
	nomNomRecipeSelect.innerHTML = "";
	let recipes = petType === "dog" ? NOMNOM_RECIPES_DOG : NOMNOM_RECIPES_CAT;
	nomNomRecipe = recipes[0];
	updateSelection(recipes, nomNomRecipeSelect);
}

// Update the given dropdown menu with the given list
function updateSelection(list, dropdown) {
	for (let i = 0; i < list.length; i++) {
		let option = document.createElement("option");
		option.value = i;
		option.innerText = list[i].name;
		dropdown.appendChild(option);
	}
}

// Update the pet food results based on the current petFoodBrand
function updatePetFoodResults() {
	const resultsP = document.querySelector("#results>p");
	resultsP.innerText = "";

	resultsP.innerText = `${petFoodBrand.name} contains ${petFoodBrand.proteinPercent}% min protein, ${petFoodBrand.fatPercent}% min fat and has a calorie density of ${petFoodBrand.cal}kcal/kg.`;

	const petFoodResults = document.querySelector("#pet-food-results");
	petFoodResults.innerHTML = "";
	const imgPetFood = document.createElement("img");
	imgPetFood.src = petFoodBrand.imgUrl;
	imgPetFood.alt = `${petFoodBrand.name} logo`;

	const h4ProteinPetFood = document.createElement("h4");
	const spanProteinPetFood = document.createElement("span");

	h4ProteinPetFood.innerText = "Protein";
	spanProteinPetFood.innerText = petFoodBrand.protein;

	const h4FatPetFood = document.createElement("h4");
	const spanFatPetFood = document.createElement("span");

	h4FatPetFood.innerText = "Fat";
	spanFatPetFood.innerText = petFoodBrand.fat;

	const h4CarbPetFood = document.createElement("h4");
	const spanCarbPetFood = document.createElement("span");

	h4CarbPetFood.innerText = "Carbohydrate";
	spanCarbPetFood.innerText = petFoodBrand.carb;

	petFoodResults.appendChild(imgPetFood);
	petFoodResults.appendChild(h4ProteinPetFood);
	petFoodResults.appendChild(spanProteinPetFood);
	petFoodResults.appendChild(h4FatPetFood);
	petFoodResults.appendChild(spanFatPetFood);
	petFoodResults.appendChild(h4CarbPetFood);
	petFoodResults.appendChild(spanCarbPetFood);
}

// Update the NomNom results based on the current nomNomRecipe
function updateNomNomResults(e) {
	const nomNomResults = document.querySelector("#nomnom-results");
	nomNomResults.innerHTML = "";

	const imgNomNomLogo = document.createElement("img");
	imgNomNomLogo.src = "https://www.nomnomnow.com/images/logo/nom_nom_straight.svg";
	imgNomNomLogo.alt = "NomNom logo";
	imgNomNomLogo.classList.add("nomnom-logo");

	const h3NomNomRecipeName = document.createElement("h3");
	h3NomNomRecipeName.innerText = nomNomRecipe.name;

	const imgNomNom = document.createElement("img");
	imgNomNom.src = nomNomRecipe.imgUrl;
	imgNomNom.alt = `${nomNomRecipe.name} logo`;

	const h4ProteinNomNom = document.createElement("h4");
	const spanProteinNomNom = document.createElement("span");

	h4ProteinNomNom.innerText = "Protein *";
	spanProteinNomNom.innerText = nomNomRecipe.protein;

	const h4FatNomNom = document.createElement("h4");
	const spanFatNomNom = document.createElement("span");

	h4FatNomNom.innerText = "Fat";
	spanFatNomNom.innerText = nomNomRecipe.fat;

	const h4CarbNomNom = document.createElement("h4");
	const spanCarbNomNom = document.createElement("span");

	h4CarbNomNom.innerText = "Carbohydrate";
	spanCarbNomNom.innerText = nomNomRecipe.carb;

	nomNomResults.appendChild(imgNomNomLogo);
	nomNomResults.appendChild(h3NomNomRecipeName);
	nomNomResults.appendChild(imgNomNom);
	nomNomResults.appendChild(h4ProteinNomNom);
	nomNomResults.appendChild(spanProteinNomNom);
	nomNomResults.appendChild(h4FatNomNom);
	nomNomResults.appendChild(spanFatNomNom);
	nomNomResults.appendChild(h4CarbNomNom);
	nomNomResults.appendChild(spanCarbNomNom);
}

function resetResults() {
	const resultsHtml = document.querySelector("#results");
	resultsHtml.innerHTML = `<p class="tip">Select a pet food brand to get a nutrient comparison</p>
  <div>
    <section id="pet-food-results"></section>
    <section id="nomnom-results"></section>
  </div>`;
	document.querySelector("#details").classList.add("hidden");
	document.querySelector("#cta").classList.add("hidden");
}
