export function makeError(errorCode){
    return { errorCode : errorCode }
}

export function validateFields( ...fields){
    return fields.every(val => val !== undefined && val !== null)
}