/**
 * Valida si el campo está vacío.
 * @param {string} value - Valor del campo.
 * @return {boolean} - Retorna true si el campo está vacío, false en caso contrario.
 */
function isEmpty(value) {
    return value.trim() === '';
}

/**
 * Valida si el valor es un número entero positivo.
 * @param {string} value - Valor del campo.
 * @return {boolean} - Retorna true si el valor no es un número entero positivo, false en caso contrario.
 */
function isPositiveInteger(value) {
    return !Number.isInteger(Number(value)) || Number(value) <= 0;
}

/**
 * Valida si el valor es un número positivo.
 * @param {string} value - Valor del campo.
 * @return {boolean} - Retorna true si el valor no es un número positivo, false en caso contrario.
 */
function isPositiveNumber(value) {
    return isNaN(Number(value)) || Number(value) <= 0;
}

/**
 * Valida si el valor es un número.
 * @param {string} value - Valor del campo.
 * @return {boolean} - Retorna true si el valor no es un número, false en caso contrario.
 */
function isNumber(value) {
    return isNaN(Number(value));
}

// Exportar las funciones para su uso en otros archivos
export { isEmpty, isPositiveInteger, isPositiveNumber, isNumber };
