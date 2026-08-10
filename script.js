const boton = document.getElementById("botonCalcular");
boton.addEventListener("click", calcularAhorro);

function calcularAhorro() {

    const meta = Number(
        document.getElementById("meta").value
    );

    const actual = Number(
        document.getElementById("actual").value
    );

    const semanas = Number(
        document.getElementById("semanas").value
    );

    const resultado =
        document.getElementById("resultado");

    const progreso =
        document.getElementById("progreso");

    const porcentajeTexto =
        document.getElementById("porcentaje");

    if (
        meta <= 0 ||
        semanas <= 0 ||
        actual < 0
    ) {

        resultado.textContent =
            "Por favor, introduce valores válidos y vuelve a intentarlo.";

        progreso.style.width = "0%";

        porcentajeTexto.textContent = "";

        return;
    }
    if (actual >= meta) {

        resultado.textContent =
            "¡Ya alcanzaste tu meta de ahorro! :D";

        progreso.style.width = "100%";

        porcentajeTexto.textContent =
            "100% de tu meta alcanzada.";

        return;
    }

    const restante = meta - actual;
    const semanal = restante / semanas;

    let porcentaje =
        (actual / meta) * 100;

    if (porcentaje > 100) {
        porcentaje = 100;
    }
    resultado.textContent =
        "Necesitas ahorrar S/ " +
        semanal.toFixed(2) +
        " por semana.";

    progreso.style.width =
        porcentaje + "%";

    porcentajeTexto.textContent =
        porcentaje.toFixed(0) +
        "% de tu meta alcanzada.";
}

// hola amigos jiji made by belen

const botonGasto =
    document.getElementById("botonGasto");

let gastos =
    JSON.parse(
        localStorage.getItem("gastos")
    ) || [];


botonGasto.addEventListener(
    "click",
    agregarGasto
);

function agregarGasto() {
    const nombre =
        document.getElementById(
            "nombreGasto"
        ).value;

    const monto =
        Number(
            document.getElementById(
                "montoGasto"
            ).value
        );
    if (
        nombre.trim() === "" ||
        monto <= 0
    ) {

        alert(
            " Completa correctamente los datos."
        );

        return;
    }
    const gasto = {

        nombre: nombre,

        monto: monto

    };

    gastos.push(gasto);


    localStorage.setItem(
        "gastos",
        JSON.stringify(gastos)
    );

    mostrarGastos();

    document.getElementById(
        "nombreGasto"
    ).value = "";

    document.getElementById(
        "montoGasto"
    ).value = "";
}


function mostrarGastos() {
    const lista =
        document.getElementById(
            "listaGastos"
        );

    lista.innerHTML = "";

    let total = 0;


    for (
        let gasto of gastos
    ) {

        const elemento =
            document.createElement(
                "p"
            );

        elemento.textContent =
            gasto.nombre +
            ": S/ " +
            gasto.monto.toFixed(2);

        lista.appendChild(
            elemento
        );

        total =
            total +
            gasto.monto;
    }

    document.getElementById(
        "totalGastos"
    ).textContent =
        "Total gastado: S/ " +
        total.toFixed(2);
    if (
        gastos.length > 0
    ) {
        const promedio =
            total /
            gastos.length;

        document.getElementById(
            "promedioGastos"
        ).textContent =
            "Promedio por gasto: S/ " +
            promedio.toFixed(2);

    }

    else {

        document.getElementById(
            "promedioGastos"
        ).textContent =
            "";

    }
}

mostrarGastos();