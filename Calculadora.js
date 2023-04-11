function calcular() {
  const grau = parseInt(document.getElementById("grau").value);
  const epsilon = parseFloat(document.getElementById("epsilon").value);
  const coeficientes = document
    .getElementById("coeficientes")
    .value.split(",")
    .map(Number);

  if (coeficientes.length !== grau + 1) {
    document.getElementById("resultado").innerHTML =
      "Número de coeficientes não condizente com o grau da polinomial";
    return;
  }

  let resultado = [];

  function exibirIntervalos(x, arrayNum, aux, aux_x, epsilon) {
    let raiz = 0;

    while (x <= 1000) {
      let func2 = 0;

      for (let j = 0; j < arrayNum.length; j++) {
        func2 += arrayNum[j] * Math.pow(x, j);
      }

      if (x > -999) {
        if ((aux < 0 && func2 > 0) || (aux > 0 && func2 < 0)) {
          resultado.push("Intervalo: [" + Math.round(aux_x) + "," + Math.round(x) + "]");

          let divisao = (aux_x + x) / 2;
          let fdivisao = f(divisao, arrayNum);
          let comp = 1;

          while (Math.abs(fdivisao) > epsilon) {
            if (aux * fdivisao < 0) {
              x = divisao;
            } else {
              aux_x = divisao;
              aux = fdivisao;
            }

            divisao = (aux_x + x) / 2;
            fdivisao = f(divisao, arrayNum);
          }

          raiz = divisao;
          resultado.push("Raiz: " + raiz);
        }
      }

      aux = func2;
      aux_x = x;
      x += 1;
    }
  }

  function f(x, arrayNum) {
    let func = 0;

    for (let j = 0; j < arrayNum.length; j++) {
      func += arrayNum[j] * Math.pow(x, j);
    }

    return func;
  }

  exibirIntervalos(-1000, coeficientes, 0, 0, epsilon);
  document.getElementById("resultado").innerHTML = resultado.join("<br>");
}

function toggleInfo() {
  var info = document.querySelector(".info");
  if (info.style.display === "block") {
    info.style.display = "none";
  } else {
    info.style.display = "block";
  }
}

document.addEventListener("click", function(event) {
  const infoBox = document.querySelector(".info");
  

  if (event.target.closest(".info") === null && event.target.closest(".infoicon") === null) {
    infoBox.style.display = "none";
  }
})