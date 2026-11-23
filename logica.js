let historial = [];

function mostrar(op, datos, res, unidad) {
  const texto = res !== 0 && Math.abs(res) < 0.01 ? res.toFixed(6) : res.toFixed(2);
  document.getElementById("resultado").textContent =
    texto + " " + unidad + "\n" + op + "\nDatos: " + datos;
  historial.push({ op, datos, res, unidad });
  const lista = document.getElementById("historial");
  lista.innerHTML = "";
  historial.forEach((h, i) => {
    const li = document.createElement("li");
    li.textContent = (i + 1) + ") " + h.op + " | " + h.datos + " | Resultado: " + h.res + " " + h.unidad;
    lista.appendChild(li);
  });
  document.getElementById("total").textContent = "Total de cálculos: " + historial.length;
}

function num(id) { return parseFloat(document.getElementById(id).value); }

function calcularOhm() {
  const tipo = document.getElementById("ohm-tipo").value;
  const a = num("ohm-valor1"), b = num("ohm-valor2");
  if (isNaN(a) || isNaN(b)) return alert("Ingresa los dos valores");
  if (tipo === "voltaje") mostrar("Voltaje calculado mediante la Ley de Ohm", "I = " + a + " A, R = " + b + " ohm", a * b, "V");
  else if (tipo === "corriente") {
    if (b === 0) return alert("Error: la resistencia no puede ser cero");
    mostrar("Corriente calculada mediante la Ley de Ohm", "V = " + a + " V, R = " + b + " ohm", a / b, "A");
  } else {
    if (b === 0) return alert("Error: la corriente no puede ser cero");
    mostrar("Resistencia calculada mediante la Ley de Ohm", "V = " + a + " V, I = " + b + " A", a / b, "ohm");
  }
}

function calcularPotencia() {
  const v = num("pot-voltaje"), i = num("pot-corriente");
  if (isNaN(v) || isNaN(i)) return alert("Ingresa voltaje y corriente");
  mostrar("Potencia calculada con P = V x I", "V = " + v + " V, I = " + i + " A", v * i, "W");
}

function calcularSenal() {
  const tipo = document.getElementById("senal-tipo").value;
  const x = num("senal-valor");
  if (isNaN(x) || x <= 0) return alert("Ingresa un valor mayor que cero");
  if (tipo === "frecuencia") mostrar("Frecuencia calculada con f = 1 / T", "T = " + x + " s", 1 / x, "Hz");
  else mostrar("Periodo calculado con T = 1 / f", "f = " + x + " Hz", 1 / x, "s");
}

function calcularConversion() {
  const tipo = document.getElementById("conv-tipo").value;
  const x = num("conv-valor");
  if (isNaN(x)) return alert("Ingresa un valor");
  if (tipo === "v-mv") mostrar("Conversion de voltios a milivoltios", x + " V", x * 1000, "mV");
  else if (tipo === "a-ma") mostrar("Conversion de amperios a miliamperios", x + " A", x * 1000, "mA");
  else if (tipo === "khz-hz") mostrar("Conversion de kilohertz a hertz", x + " kHz", x * 1000, "Hz");
  else mostrar("Conversion de microsegundos a segundos", x + " us", x / 1000000, "s");
}

document.getElementById("ohm-tipo").addEventListener("change", function () {
  const ayuda = document.getElementById("ohm-ayuda");
  if (this.value === "voltaje") ayuda.textContent = "Valor 1 = Corriente (A) · Valor 2 = Resistencia (ohm)";
  else if (this.value === "corriente") ayuda.textContent = "Valor 1 = Voltaje (V) · Valor 2 = Resistencia (ohm)";
  else ayuda.textContent = "Valor 1 = Voltaje (V) · Valor 2 = Corriente (A)";
});

