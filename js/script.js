import { Modal } from "./modal.js";
import { AlertError } from "./alert-error.js";
import { calculateBMI, notANumber } from "./utils.js";

// 1º Mapear as variáveis:
const form = document.querySelector("form");
const inputWeight = document.querySelector("#weight");
const inputHeight = document.querySelector("#height");

// 3 maneiras de criar e atribuir função a um evento:
// OBS: O método ON acessa diversas funcionalidades na DOM:

// a) Atribuir uma fcn diretamente
form.onsubmit = function (event) {
  // Evita o comportamente padrão do form (enviar form e carregar pág):
  event.preventDefault();

  // Pega os valores dos inputs:
  const weight = inputWeight.value;
  const height = inputHeight.value;

  const weightOrHeightIsNotANumber = notANumber(weight) || notANumber(height); // se weight e height não forem nº ou se forem vazio, serão verdadeiro.

  if (weightOrHeightIsNotANumber) {
    AlertError.open();
    return;
  }

  //AlertError.close(); // fecha após inserção dos inputs corretamente.

  const result = calculateBMI(weight, height);
  DisplayResultMessage(result);
};

// b) Arrow function:
// form.onsubmit = () => {}

// c) Criando uma fcn e passar o nome como referência:
//form.onsubmit = handleSubmit
//function handleSubmit() {}

// Fecha janela de erro após digitação nos campos:
// o método "oninput" verifica se o elemento que está recebendo input sofreu alteração
inputWeight.oninput = () => AlertError.close();
inputHeight.oninput = () => AlertError.close();

function DisplayResultMessage(result) {
  const message = `Your BMI is ${result}.`;
  //console.log(result);

  Modal.message.innerHTML = message;
  Modal.open();
}


