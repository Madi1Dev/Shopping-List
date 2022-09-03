const addProductButton = document.getElementById("add_product");
const inputProduct = document.getElementById("product");
const productTable = document.getElementById("shopping_box");

// ARRAYS IN THE DOM
const treatsArray = document.getElementById("treats_array");
const healthyFoodsArray = document.getElementById("healthy_foods_array");

// ARRAYS IN JS
let healthyFoods = [];
let treats = [];
let allFoods = [];

// beginning event listeners
addProductButton.addEventListener("click", function () {
  inputProduct.value.toLowerCase();
  addProduct();
  inputProduct.value = "";
});

// this function recognises enter
inputProduct.addEventListener("keyup", function () {
  if (event.which === 13) {
    inputProduct.value.toLowerCase();
    addProduct();
    inputProduct.value = "";
  }
});

function addProduct(input) {
  if (inputProduct.value === "") {
    alert("What would you like to buy?");
  } else if (!isNaN(inputProduct.value)) {
    alert("Please, don't use numbers!");
  } else if (allFoods.includes(inputProduct.value)) {
    alert("This item is already on the list!");
    return inputProduct.value;
  } else if (healthyFoods.includes(inputProduct.value)) {
    alert("This item is already on the healthy list!");
    return inputProduct.value;
  } else if (treats.includes(inputProduct.value)) {
    alert("This item is already a treat!");
    return inputProduct.value;
  } else {
    addProductContinue();
  }

  function addProductContinue() {
    // create the list element + div elements inside

    const li = document.createElement("li");

    // this is for the entered value
    let div1 = document.createElement("div");
    div1.classList.add("div1");
    div1.innerText = inputProduct.value;
    li.appendChild(div1);

    allFoods.push(div1.innerText);

    // add counter
    const counter = document.createElement("div");
    counter.classList.add("counter", "opacity");
    let integer = 1;
    counter.innerHTML = integer;
    li.appendChild(counter);

    // this is for the buttons of the value
    let div2 = document.createElement("div");
    div2.classList.add("div2");
    li.appendChild(div2);

    inputProduct.value == "";
    productTable.appendChild(li);

    // add add to one list button
    const addToListButton = document.createElement("button");
    addToListButton.classList.add("add_to_list_button");
    addToListButton.textContent = "Add to list";
    div2.appendChild(addToListButton);

    // add delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete_button");
    deleteButton.textContent = "Delete";
    div2.appendChild(deleteButton);

    // add add one more button
    const addOneMoreButton = document.createElement("button");
    addOneMoreButton.classList.add("add_one_more_button");
    addOneMoreButton.textContent = "+";
    div2.appendChild(addOneMoreButton);

    // add remove one button
    const removeOne = document.createElement("button");
    removeOne.classList.add("remove_one_button", "opacity");
    removeOne.disabled = true;
    removeOne.textContent = "-";
    div2.appendChild(removeOne);

    // add one more of this item to the counter
    addOneMoreButton.addEventListener("click", function () {
      removeOne.classList.remove("opacity");
      removeOne.disabled = false;
      counter.classList.remove("opacity");
      integer += 1;
      counter.innerHTML = integer;
    });

    // remove one of this item from the counter
    removeOne.addEventListener("click", function () {
      if (integer > 2) {
        integer -= 1;
        counter.innerHTML = integer;
      } else {
        counter.classList.add("opacity");
        removeOne.classList.add("opacity");
        removeOne.disabled = true;
        counter.innerHTML = integer;
      }
    });

    // delete the li element and the value in the allFoods array
    deleteButton.addEventListener("click", function () {
      li.remove();
      let found = allFoods.indexOf(div1.innerText);
      allFoods.splice(found, 1);
    });

    // add to the array
    addToListButton.addEventListener("click", function () {
      const promptBox = document.createElement("div");
      promptBox.classList.add("prompt_box");
      div2.appendChild(promptBox);

      // text inside prompt box
      const textInsidePromptBox = document.createElement("p");
      textInsidePromptBox.classList.add("text_inside_prompt_box");
      textInsidePromptBox.innerText =
        "Which list would you like to add this item to?";
      promptBox.appendChild(textInsidePromptBox);

      // healthy button prompt
      const promptHealthyButton = document.createElement("button");
      promptHealthyButton.classList.add("promptHealthyButton");
      promptHealthyButton.innerText = "Healthy";
      promptBox.appendChild(promptHealthyButton);

      promptHealthyButton.addEventListener("click", function () {
        if (healthyFoods.includes(div1.innerText)) {
          alert("This item is already on the healthy list!");
          promptBox.remove();
        } else if (treats.includes(div1.innerText)) {
          alert("An item can be either healthy or a treat, not both!");
          promptBox.remove();
        } else {
          healthyFoods.unshift(div1.innerText);
          forHealthyIndividual();
          div1.classList.add("change_Healthy_Colour");
          promptBox.remove();
        }
      });

      // treats button prompt
      const promptUnhealthyButton = document.createElement("button");
      promptUnhealthyButton.classList.add("promptUnhealthyButton");
      promptUnhealthyButton.innerText = "Treats";
      promptBox.appendChild(promptUnhealthyButton);

      promptUnhealthyButton.addEventListener("click", function () {
        if (treats.includes(div1.innerText)) {
          alert("This item is already on the treats list!");
          promptBox.remove();
        } else if (healthyFoods.includes(div1.innerText)) {
          alert("An item can be either healthy or a treat, not both!");
          promptBox.remove();
        } else {
          treats.unshift(div1.innerText);
          div1.classList.add("change_Treats_Colour");
          forTreatsIndividual();
          promptBox.remove();
        }
      });

      // exit button inside the prompt box
      const exitButton = document.createElement("button");
      exitButton.classList.add("exitButton");
      exitButton.innerText = "x";
      promptBox.appendChild(exitButton);

      exitButton.addEventListener("click", function () {
        promptBox.remove();
      });
    });

    // NEXT SECTION: WORKING WITH THE HEALTHY AND TREATS LISTS

    // healthy label function
    function forHealthyIndividual() {
      const healthyLabel = document.createElement("label");
      healthyLabel.classList.add("healthy_label");
      healthyFoodsArray.appendChild(healthyLabel);
      healthyLabel.innerText = healthyFoods[0];

      // clicking on the healthy button starts this function
      healthyLabel.addEventListener("click", function () {
        const arrayPromptBox = document.createElement("div");
        arrayPromptBox.classList.add("prompt_box");
        healthyFoodsArray.appendChild(arrayPromptBox);

        // Add this item to the shopping list
        const promptHealthyButtonAddToList = document.createElement("button");
        promptHealthyButtonAddToList.classList.add(
          "prompt_Healthy_Button_Add_To_List"
        );
        promptHealthyButtonAddToList.innerText = "Add to list";
        arrayPromptBox.appendChild(promptHealthyButtonAddToList);

        promptHealthyButtonAddToList.addEventListener("click", function () {
          if (allFoods.includes(healthyLabel.innerText)) {
            alert("This item is already on the list!");
            arrayPromptBox.remove();
          } else {
            arrayPromptBox.remove();

            // create the list element + div elements inside
            const li = document.createElement("li");

            // this is for the entered value
            let div1 = document.createElement("div");
            div1.classList.add("div1");
            div1.classList.add("change_Healthy_Colour");
            div1.innerText = healthyLabel.innerText;
            li.appendChild(div1);
            allFoods.push(div1.innerText);

            // add counter
            const counter = document.createElement("div");
            counter.classList.add("counter", "opacity");
            let integer = 1;
            counter.innerHTML = integer;
            li.appendChild(counter);

            // this is for the buttons of the value
            let div2 = document.createElement("div");
            div2.classList.add("div2");
            li.appendChild(div2);

            inputProduct.value == "";
            productTable.appendChild(li);

            // add add to one list button
            const addToListButton = document.createElement("button");
            addToListButton.classList.add("add_to_list_button");
            addToListButton.textContent = "Add to list";
            div2.appendChild(addToListButton);

            // add delete button
            const deleteButton = document.createElement("button"); // first need to create the element, then append
            deleteButton.classList.add("delete_button");
            deleteButton.textContent = "Delete";
            div2.appendChild(deleteButton);

            // add add one more button
            const addOneMoreButton = document.createElement("button");
            addOneMoreButton.classList.add("add_one_more_button");
            addOneMoreButton.textContent = "+";
            div2.appendChild(addOneMoreButton);

            // add remove one button
            const removeOne = document.createElement("button");
            removeOne.classList.add("remove_one_button", "opacity");
            removeOne.disabled = true;
            removeOne.textContent = "-";
            div2.appendChild(removeOne);

            // delete the li element and the value in the allFoods array
            deleteButton.addEventListener("click", function () {
              li.remove();
              let found = allFoods.indexOf(div1.innerText);
              allFoods.splice(found, 1);
            });

            // add to the array
            addToListButton.addEventListener("click", function () {
              const promptBox = document.createElement("div");
              promptBox.classList.add("prompt_box");
              div2.appendChild(promptBox);

              // text inside prompt box
              const textInsidePromptBox = document.createElement("p");
              textInsidePromptBox.classList.add("text_inside_prompt_box");
              textInsidePromptBox.innerText =
                "Which list would you like to add this item to?";
              promptBox.appendChild(textInsidePromptBox);

              // healthy button prompt
              const promptHealthyButton = document.createElement("button");
              promptHealthyButton.classList.add("promptHealthyButton");
              promptHealthyButton.innerText = "Healthy";
              promptBox.appendChild(promptHealthyButton);

              promptHealthyButton.addEventListener("click", function () {
                if (healthyFoods.includes(div1.innerText)) {
                  alert("This item is already on the healthy list!");
                  promptBox.remove();
                } else if (treats.includes(div1.innerText)) {
                  alert("An item can be either healthy or a treat, not both!");
                  promptBox.remove();
                } else {
                  healthyFoods.unshift(div1.innerText);
                  forHealthyIndividual();
                  promptBox.remove();
                  div1.classList.add("change_Healthy_Colour");
                }
              });

              // treats button prompt
              const promptUnhealthyButton = document.createElement("button");
              promptUnhealthyButton.classList.add("promptUnhealthyButton");
              promptUnhealthyButton.innerText = "Treats";
              promptBox.appendChild(promptUnhealthyButton);

              promptUnhealthyButton.addEventListener("click", function () {
                if (treats.includes(div1.innerText)) {
                  alert("This item is already on the treats list!");
                  promptBox.remove();
                } else if (healthyFoods.includes(div1.innerText)) {
                  alert("An item can be either healthy or a treat, not both!");
                  promptBox.remove();
                } else {
                  treats.unshift(div1.innerText);
                  forTreatsIndividual();
                  promptBox.remove();
                  div1.classList.add("change_Treats_Colour");
                }
              });

              // exit button inside the prompt box
              const exitButton = document.createElement("button");
              exitButton.classList.add("exitButton");
              exitButton.innerText = "x";
              promptBox.appendChild(exitButton);

              exitButton.addEventListener("click", function () {
                promptBox.remove();
              });
            });

            // add one more of this item to the counter
            addOneMoreButton.addEventListener("click", function () {
              removeOne.classList.remove("opacity");
              removeOne.disabled = false;
              counter.classList.remove("opacity");
              integer += 1;
              counter.innerHTML = integer;
            });

            // remove one of this item from the counter
            removeOne.addEventListener("click", function () {
              if (integer > 2) {
                integer -= 1;
                counter.innerHTML = integer;
              } else if ((integer = 2)) {
                counter.classList.add("opacity");
                removeOne.classList.add("opacity");
                removeOne.disabled = true;
                counter.innerHTML = integer;
              }
            });
          }
        });

        // Delete this item from the healthy foods list
        const promptHealthyButtonRemoveFromArray =
          document.createElement("button");
        promptHealthyButtonRemoveFromArray.classList.add(
          "prompt_Healthy_Button_Remove_From_Array"
        );
        promptHealthyButtonRemoveFromArray.innerText = "Delete";
        arrayPromptBox.appendChild(promptHealthyButtonRemoveFromArray);

        // function triggered by the RemoveFromArray
        promptHealthyButtonRemoveFromArray.addEventListener(
          "click",
          function () {
            healthyLabel.remove();
            arrayPromptBox.remove();
            let found = healthyFoods.indexOf(healthyLabel.innerText);
            healthyFoods.splice(found, 1);
            let divs = document.getElementsByClassName("div1");
            for (let div of divs) {
              if (div.innerText === healthyLabel.innerText) {
                div.classList.remove("change_Healthy_Colour");
              }
            }
          }
        );

        // exit button inside the prompt box
        const exitButton = document.createElement("button");
        exitButton.classList.add("exitButton");
        exitButton.innerText = "x";
        arrayPromptBox.appendChild(exitButton);

        exitButton.addEventListener("click", function () {
          arrayPromptBox.remove();
        });

        // text inside treats prompt box
        const textInsideHealthyPromptBox = document.createElement("p");
        textInsideHealthyPromptBox.classList.add(
          "text_Inside_Healthy_Prompt_Box"
        );
        textInsideHealthyPromptBox.innerText =
          "Add to shopping list or delete from healthy foods?";
        arrayPromptBox.appendChild(textInsideHealthyPromptBox);
      });
    }

    // treats label function
    function forTreatsIndividual() {
      const treatsLabel = document.createElement("label");
      treatsLabel.classList.add("treats_label");
      treatsArray.appendChild(treatsLabel);
      treatsLabel.innerText = treats[0];

      // clicking on the treat starts this function
      treatsLabel.addEventListener("click", function () {
        const arrayPromptBox = document.createElement("div");
        arrayPromptBox.classList.add("prompt_box");
        treatsArray.appendChild(arrayPromptBox);

        // Add this item to the shopping list
        const promptTreatsButtonAddToList = document.createElement("button");
        promptTreatsButtonAddToList.classList.add(
          "prompt_Treats_Button_Add_To_List"
        );
        promptTreatsButtonAddToList.innerText = "Add to list";
        arrayPromptBox.appendChild(promptTreatsButtonAddToList);

        // the function triggered by the AddToList
        promptTreatsButtonAddToList.addEventListener("click", function () {
          if (allFoods.includes(treatsLabel.innerText)) {
            alert("This item is already on the list!");
            arrayPromptBox.remove();
          } else {
            arrayPromptBox.remove();

            // create the list element + div elements inside
            const li = document.createElement("li");

            // this is for the entered value
            let div1 = document.createElement("div");
            div1.classList.add("div1");
            div1.innerText = treatsLabel.innerText;
            div1.classList.add("change_Treats_Colour");
            li.appendChild(div1);

            allFoods.push(div1.innerText);

            // add counter
            const counter = document.createElement("div");
            counter.classList.add("counter", "opacity");
            let integer = 1;
            counter.innerHTML = integer;
            li.appendChild(counter);

            // this is for the buttons of the value
            let div2 = document.createElement("div");
            div2.classList.add("div2");
            li.appendChild(div2);

            inputProduct.value == "";
            productTable.appendChild(li);

            // add add to one list button
            const addToListButton = document.createElement("button");
            addToListButton.classList.add("add_to_list_button");
            addToListButton.textContent = "Add to list";
            div2.appendChild(addToListButton);

            // add delete button
            const deleteButton = document.createElement("button"); // first need to create the element, then append
            deleteButton.classList.add("delete_button");
            deleteButton.textContent = "Delete";
            div2.appendChild(deleteButton);

            // add add one more button
            const addOneMoreButton = document.createElement("button");
            addOneMoreButton.classList.add("add_one_more_button");
            addOneMoreButton.textContent = "+";
            div2.appendChild(addOneMoreButton);

            // add remove one button
            const removeOne = document.createElement("button");
            removeOne.classList.add("remove_one_button", "opacity");
            removeOne.disabled = true;
            removeOne.textContent = "-";
            div2.appendChild(removeOne);

            // delete the li element and the value in the allFoods array
            deleteButton.addEventListener("click", function () {
              li.remove();
              let found = allFoods.indexOf(div1.innerText);
              allFoods.splice(found, 1);
            });

            // add to the array
            addToListButton.addEventListener("click", function () {
              const promptBox = document.createElement("div");
              promptBox.classList.add("prompt_box");
              div2.appendChild(promptBox);

              // text inside prompt box
              const textInsidePromptBox = document.createElement("p");
              textInsidePromptBox.classList.add("text_inside_prompt_box");
              textInsidePromptBox.innerText =
                "Which list would you like to add this item to?";
              promptBox.appendChild(textInsidePromptBox);

              // healthy button prompt
              const promptHealthyButton = document.createElement("button");
              promptHealthyButton.classList.add("promptHealthyButton");
              promptHealthyButton.innerText = "Healthy";
              promptBox.appendChild(promptHealthyButton);

              promptHealthyButton.addEventListener("click", function () {
                if (healthyFoods.includes(div1.innerText)) {
                  alert("This item is already on the healthy list!");
                  promptBox.remove();
                } else if (treats.includes(div1.innerText)) {
                  alert("An item can be either healthy or a treat, not both!");
                  promptBox.remove();
                } else {
                  healthyFoods.unshift(div1.innerText);
                  forHealthyIndividual();
                  promptBox.remove();
                  div1.classList.add("change_Healthy_Colour");
                }
              });

              // treats button prompt
              const promptUnhealthyButton = document.createElement("button");
              promptUnhealthyButton.classList.add("promptUnhealthyButton");
              promptUnhealthyButton.innerText = "Treats";
              promptBox.appendChild(promptUnhealthyButton);

              promptUnhealthyButton.addEventListener("click", function () {
                if (treats.includes(div1.innerText)) {
                  alert("This item is already on the treats list!");
                  promptBox.remove();
                } else if (healthyFoods.includes(div1.innerText)) {
                  alert("An item can be either healthy or a treat, not both!");
                  promptBox.remove();
                } else {
                  treats.unshift(div1.innerText);
                  div1.classList.add("change_Treats_Colour");
                  forTreatsIndividual();
                  promptBox.remove();
                }
              });

              // exit button inside the prompt box
              const exitButton = document.createElement("button");
              exitButton.classList.add("exitButton");
              exitButton.innerText = "x";
              promptBox.appendChild(exitButton);

              exitButton.addEventListener("click", function () {
                promptBox.remove();
              });
            });

            // add one more of this item to the counter
            addOneMoreButton.addEventListener("click", function () {
              removeOne.classList.remove("opacity");
              removeOne.disabled = false;
              counter.classList.remove("opacity");
              integer += 1;
              counter.innerHTML = integer;
            });

            // remove one of this item from the counter
            removeOne.addEventListener("click", function () {
              if (integer > 2) {
                integer -= 1;
                counter.innerHTML = integer;
              } else {
                counter.classList.add("opacity");
                removeOne.classList.add("opacity");
                removeOne.disabled = true;
                counter.innerHTML = integer;
              }
            });
          }
        });

        // Delete this item from the treats list
        const promptTreatsButtonRemoveFromArray =
          document.createElement("button");
        promptTreatsButtonRemoveFromArray.classList.add(
          "prompt_Treats_Button_Remove_From_Array"
        );
        promptTreatsButtonRemoveFromArray.innerText = "Delete";
        arrayPromptBox.appendChild(promptTreatsButtonRemoveFromArray);

        // function triggered by the RemoveFromArray
        promptTreatsButtonRemoveFromArray.addEventListener(
          "click",
          function () {
            treatsLabel.remove();
            arrayPromptBox.remove();
            let found = treats.indexOf(treatsLabel.innerText);
            treats.splice(found, 1);
            let divs = document.getElementsByClassName("div1");
            for (let div of divs) {
              if (div.innerText === treatsLabel.innerText) {
                div.classList.remove("change_Treats_Colour");
              }
            }
          }
        );

        // exit button inside the prompt box
        const exitButton = document.createElement("button");
        exitButton.classList.add("exitButton");
        exitButton.innerText = "x";
        arrayPromptBox.appendChild(exitButton);

        exitButton.addEventListener("click", function () {
          arrayPromptBox.remove();
        });

        // text inside treats prompt box
        const textInsideTreatsPromptBox = document.createElement("p");
        textInsideTreatsPromptBox.classList.add(
          "text_Inside_Treats_Prompt_Box"
        );
        textInsideTreatsPromptBox.innerText =
          "Add to shopping list or delete from treats?";
        arrayPromptBox.appendChild(textInsideTreatsPromptBox);
      });
    }
  }
}
