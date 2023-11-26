const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

const toggle = document.getElementById('toggleDark');
const calculator = document.querySelector('.calculator');
const body = document.querySelector('body');
const display = document.querySelector('.display');
const display_operator = document.querySelector('.display .operator');
const display_percent = document.querySelector('.display .percent');
const keyss = document.querySelector('.keys');



toggle.addEventListener('click', function() {
  this.classList.toggle('ri-sun-line');
  if (this.classList.toggle('ri-moon-line')) {
    body.style.background = 'black';
    body.style.transition = '2s ease';
    calculator.style.background = '#22252D';
    calculator.style.transition = '2s';
    calculator.style.boxShadow = 'none';
    display.style.color = 'white';
    display.style.transition = '2s';
    display_operator.style.color = 'rgb(207, 51, 51)';
    display_operator.style.transition = '2s';
    display_percent.style.color = 'rgb(207, 51, 51)';
    display_percent.style.transition = '2s';
  } else {

    body.style.background = 'white';
    body.style.transition = '2s ease';
    calculator.style.background = 'white';
    calculator.style.transition = '2s';
    calculator.style.boxShadow = '2px 2px 8px 4px rgba(128, 0, 128, 0.813)';
    display.style.color = 'black';
    display.style.transition = '2s';
    display_operator.style.transition = '2s';
    display_percent.style.color = 'rgb(207, 51, 51)';
    display_percent.style.transition = '2s';

    
  }
})



let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value == "=") {
      let result = eval(PrepareInput(input));

      display_output.innerHTML = CleanOutput(result);
     } else {
      if (validateInput(value)) {
        input += value;
        display_input.innerHTML = CleanInput(input);
      }
    }
  }) 
}

function CleanInput (input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = ` <span class="operator">x</span> `;
    } else if (input_array[i] == "/") {
      input_array[i] = ` <span class="operator">&divide;</span> `;
    } else if (input_array[i] == "+") {
      input_array[i] = ` <span class="operator">+</span> `;
    } else if (input_array[i] == "-") {
      input_array[i] = ` <span class="operator">-</span> `;
    } else if (input_array[i] == "%") {
      input_array[i] = ` <span class="percent">%</span> `;
    }

    
  }
 
  return input_array.join("");
}
 
function CleanOutput (output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }

  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }

  return output_array.join("");
}

function validateInput (value) {
  let last_input = input.slice(-1);
  let operators = ["/", "-", "*", "+", "%"];

  if (value == "." && last_input == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PrepareInput (input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }

  return input_array.join("");
}

