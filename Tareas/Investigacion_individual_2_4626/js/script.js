const pantalla = document.getElementById('pantalla'); 
const lineaHistorial = document.getElementById('historial');
const limpiar = document.getElementById('botonLimpiar');
const resultado = document.getElementById('botonIgual');

let expression = "";
let resListo = false;

function isOperator(charOperator) {
    return charOperator === '+' || charOperator === '-' || charOperator === '*' || charOperator === '/';
}

function show(){
    pantalla.value = expression || "0";
}

function showError(message){
   expression = "";
   resListo = true;
   lineaHistorial.textContent = "";
   pantalla.value = message;
}

function cleanCalculator(){
    expression = "";
    resListo = false;
    lineaHistorial.textContent = "";
    show();
}

function getLastNumb (){
    let lastNumb = "";  
    for(let i = expression.length - 1; i >= 0; i--){
        let chater = expression[i];
        if(isOperator(chater)){
            break;
        }
        lastNumb = chater + lastNumb;
    }
    return lastNumb;
}

function addNumb(num){
    if(resListo){
      cleanCalculator();
    }
    expression += num;
    resListo = false;
    show();
}

function pressDecimal(){
    if(resListo){
        cleanCalculator();
    }

    let lastNumb = getLastNumb();

    if(!lastNumb.includes('.')){
        if(lastNumb === ""){
            expression += "0.";
        }else{
            expression += ".";
        }
    }
    resListo = false;
    show();
}

function pressOperator(operator){
    if(expression === ""){
        return;
    }
    if(resListo){
        lineaHistorial.textContent = "";
    }

    let lastChar = expression[expression.length - 1];

    if(isOperator(lastChar)){
        expression = expression.slice(0, -1) + operator;
    }else{
        expression += operator;
    }

    resListo = false;
    show();
}

function calculateExpression(){
    let total = 0;
    let numb = "";
    let currentOperator = "+";

    for(let i = 0; i <= expression.length; i++){
        let chater = expression[i];

        if(chater === "-" && i === 0){
            numb = "-" ;
        }
        else if (i === expression.length || isOperator(chater)){
            if(numb === "" || numb === "-"){
                return "Error: Operación inválida";
            }

            let valor = parseFloat(numb);

            if(isNaN(valor)){
                return "Error: Operación inválida";
            }

            if (currentOperator === "+"){
                total += valor;
            }else if (currentOperator === "-"){
                total -= valor;
            }else if (currentOperator === "*"){
                total *= valor;
            }else if (currentOperator === "/"){
                if (valor === 0){
                    return "Error: División por cero";
                }
                total /= valor;
            }

            currentOperator = chater;
            numb = "";
        }else{
            numb += chater;
        }

    }//Fin for
    return total;

}// fin funcion calculateExpression

function calculateResult(){
    if (expression === ""){
        showError("Error: Operación inválida");
        return;
    }

    if(isOperator(expression[expression.length - 1])){
        showError("Error: Operación inválida");
        return;
    }

    let respuesta = calculateExpression();

    if (respuesta === "Error: División por cero"){
        showError("Error: División por cero");
        return;
    }

    if (respuesta === "Error: Operación inválida" || isNaN(respuesta) || !isFinite(respuesta)){
        showError("Error: Operación inválida");
        return;
    }

    lineaHistorial.textContent = expression + " =";
    expression = parseFloat(respuesta.toFixed(10)).toString();
    resListo = true;
    show();
}

limpiar.addEventListener('click', cleanCalculator);
resultado.addEventListener('click', calculateResult);

document.addEventListener('keydown', function(event){
    let teclado = event.key;

    if(teclado >= '0' && teclado <= '9'){
        addNumb(teclado);
    }   else if(teclado === '.'){
        pressDecimal();
    }   else if(teclado === '+' || teclado === '-' || teclado === '*' || teclado === '/'){
        pressOperator(teclado);
    }   else if(teclado === 'Enter' || teclado === '='){
        event.preventDefault();
        calculateResult();
    }  else if(teclado === "Escape"){
        cleanCalculator();
    }
});