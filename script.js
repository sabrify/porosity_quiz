const stepInfo = document.getElementById("stepInfo");
const navLeft = document.getElementById("navLeft");
const navRight = document.getElementById("navRight");
const submit = document.getElementById("submit");
const getStarted = document.getElementById("getStarted");
const form = document.getElementById("myForm");
const formSteps = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
const options = document.querySelectorAll(".option");
const fName = document.getElementById('name');

let currentStep = 0;

function checkNameInput(){
  const nameInput = document.getElementById('name').value;
  navRight.disabled = nameInput === '';

  if(nameInput.length > 0){
    navRight.classList.remove('disabled')
  }

}
function selectOption(option){
  const shineInput = document.getElementById('shine');
  shineInput.value = option.getAttribute('data-value');

  if(shineInput.value){
    submit.disabled = false;
    submit.classList.remove("disabled");
  }else{
    submit.disabled = true;
    submit.classList.add('disabled')
  }

}
function updateStepVisibility() {
  // Hide all steps
  formSteps.forEach((step) => {
    document.getElementById(step).style.display = "none";
  });

  // Show current step
  document.getElementById(formSteps[currentStep]).style.display = "block";

  // Update navigation buttons
  navLeft.style.display = currentStep === 0 ? "none" : "block";
  getStarted.style.display = currentStep === 0 ? "block" : "none";
  navRight.style.display = currentStep === 1 ? "block" : "none";
  // navRight.style.display =
  //   currentStep < formSteps.length - 1 && currentStep != 0 ? "block" : "none";
  submit.style.display = currentStep === formSteps.length - 1 ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  navLeft.style.display = "none";
  updateStepVisibility();

  getStarted.addEventListener("click", () => {
    currentStep++;
    updateStepVisibility();
    
  });

  navRight.addEventListener("click", () => {
    if (currentStep < formSteps.length - 1) {
      currentStep++;
      updateStepVisibility();
    }
   
  });

  navLeft.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      updateStepVisibility();
    }
  });
});


// Handle selection for all options (image and text)
document.querySelectorAll(".option").forEach((option) => {
  option.addEventListener("click", function () {
    // Clear previous selection
    const parent = this.closest(".form-control");
    parent.querySelectorAll(".option").forEach((opt) =>
      opt.classList.remove("selected")
    );

    // Add 'selected' to clicked option
    this.classList.add("selected");

    // Set hidden input value
    const hiddenInput = parent.querySelector("input[type='hidden']");
    hiddenInput.value = this.dataset.value;

    // Move to the next step if it's not the last step
    if (currentStep < formSteps.length - 1) {
      currentStep++;
      updateStepVisibility();
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect user inputs
  const name = document.getElementById("name").value.trim();
  const watterAbsorption = document.getElementById("watter_absorption").value;
  const dryingTime = document.getElementById("drying_time").value;
  const hairTexture = document.getElementById("hair_texture").value;
  const productAbsorption = document.getElementById("product_absorption").value;
  const elasticity = document.getElementById("elasticity").value;
  const shine = document.getElementById("shine").value;



  // Validate inputs
  if (!name || !watterAbsorption || !dryingTime || !hairTexture || !productAbsorption || !elasticity || !shine ) {
    alert("Please complete all steps before submitting.");
    return;
  }

  // Save data to localStorage
  localStorage.setItem(
    "quizResults",
    JSON.stringify({ name, watterAbsorption, dryingTime, hairTexture , productAbsorption, elasticity, shine})
  );

  // Redirect to results page
  window.location.href = "results.html";
});
