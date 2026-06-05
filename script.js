const sedes = {
  bogota: `TURGAS S.A E.S.P<br>Av. Cra. 7 No. 113-43 Of. 1501<br>Bogotá D.C.`,
  mariquita: `TURGAS S.A E.S.P<br>Planta Mariquita<br>Mariquita, Tolima`,
  caldas: `TURGAS S.A E.S.P<br>Planta Caldas Viejo<br>Caldas Viejo, Tolima`,
  toqui: `TURGAS S.A E.S.P<br>Planta Toqui<br>Toqui`
};

const nombre = document.getElementById("nombre");
const cargo = document.getElementById("cargo");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const sede = document.getElementById("sede");

const firmaNombre = document.getElementById("firmaNombre");
const firmaCargo = document.getElementById("firmaCargo");
const firmaEmail = document.getElementById("firmaEmail");
const firmaTel = document.getElementById("firmaTel");
const telefonoContainer = document.getElementById("telefonoContainer");
const firmaDireccion = document.getElementById("firmaDireccion");

const firma = document.getElementById("firma");
const descargar = document.getElementById("descargar");

function actualizarFirma() {
  const valorNombre = nombre.value.trim();
  const valorCargo = cargo.value.trim();
  const valorEmail = email.value.trim();
  const valorTelefono = telefono.value.trim();

  firmaNombre.textContent = valorNombre || "Nombre completo";
  firmaCargo.textContent = valorCargo || "Cargo";

  firmaEmail.textContent = valorEmail;
  firmaEmail.style.display = valorEmail === "" ? "none" : "block";

  firmaTel.textContent = valorTelefono;
  telefonoContainer.style.display = valorTelefono === "" ? "none" : "flex";

  firmaDireccion.innerHTML = sedes[sede.value];
}

nombre.addEventListener("input", actualizarFirma);
cargo.addEventListener("input", actualizarFirma);
email.addEventListener("input", actualizarFirma);
telefono.addEventListener("input", actualizarFirma);
sede.addEventListener("change", actualizarFirma);

actualizarFirma();

descargar.addEventListener("click", async () => {
  const canvas = await html2canvas(firma, {
    backgroundColor: "#ffffff",
    scale: 3,
    useCORS: true
  });



  const enlace = document.createElement("a");

  const nombreArchivo = (nombre.value || "firma-turgas")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  enlace.download = `${nombreArchivo}-firma-turgas.png`;
  enlace.href = canvas.toDataURL("image/png");
  enlace.click();
});


const btnCopiar = document.getElementById("copiarAviso");

if (btnCopiar) {
  btnCopiar.addEventListener("click", async () => {
    const texto = document.getElementById("textoAviso").innerText;

    try {
      await navigator.clipboard.writeText(texto);

      btnCopiar.innerHTML = "✅ Copiado";
      btnCopiar.classList.add("copiado");

      setTimeout(() => {
        btnCopiar.innerHTML = "📋 Copiar aviso";
        btnCopiar.classList.remove("copiado");
      }, 2000);
    } catch (error) {
      alert("No fue posible copiar el texto.");
    }
  });
}
