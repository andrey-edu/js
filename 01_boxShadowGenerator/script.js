window.addEventListener("load", shadowBox);

function shadowBox() {
  const preview = document.getElementById("element");
  const resultCSS = document.getElementById("result-css");
  const inputs = document.querySelectorAll(".shadow-property");
  const btnCopy = document.getElementById("btn-copy");

  inputs.forEach(inp => inp.addEventListener("input", generateShadow));
  btnCopy.addEventListener("click", copyCSS);

  function generateShadow() {
    const hShadow = document.getElementById("h-shadow").value;
    const vShadow = document.getElementById("v-shadow").value;
    const blurRadius = document.getElementById("blur-radius").value;
    const spreadRadius = document.getElementById("spread-radius").value;
    const shadowColor = document.getElementById("shadow-color").value;
    const shadowColorOpacity = document.getElementById("shadow-color-opacity").value;
    const shadowInset = document.getElementById("shadow-inset").checked;
    let shadow = '';

    if (shadowInset) shadow += "inset ";
    shadow = `${shadow} ${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRGBA(shadowColor, shadowColorOpacity)}`;

    preview.style.boxShadow = shadow;
    resultCSS.textContent = `box-shadow: ${shadow};`
  }

  function hexToRGBA(color, opacity) {
    const red = parseInt(color.substr(1, 2), 16);
    const green = parseInt(color.substr(3, 2), 16);
    const blue = parseInt(color.substr(5, 2), 16);

    return `rgba(${red}, ${green}, ${blue}, ${opacity})`
  }

  function copyCSS() {
    //Функция копирования CSS из текстового поля в буфер
    resultCSS.select();
    document.execCommand("copy");
    alert("CSS copied to clipboard")
  }
}

