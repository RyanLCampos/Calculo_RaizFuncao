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

  function exibirIntervalos(x, arrayNum, aux, aux_x, precisao) {
    let raiz = 0;

    while (x <= 1000) {
      let func2 = 0;

      for (let j = 0; j < arrayNum.length; j++) {
        func2 += arrayNum[j] * Math.pow(x, j);
      }

      if (x > -999 && Math.abs(x - aux_x) > precisao) {
        if ((aux < 0 && func2 > 0) || (aux > 0 && func2 < 0)) {
          resultado.push("Intervalo: [" + aux_x + "," + x + "]");

          let fdivisao = 1;
          let divisao = (aux_x + x) / 2;

          while (fdivisao > precisao) {
            fdivisao = f(divisao, arrayNum);

            if (aux * fdivisao < 0) {
              x = divisao;
            } else {
              aux_x = divisao;
              aux = fdivisao;
            }

            divisao = (aux_x + x) / 2;
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
