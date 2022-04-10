export function makeError(msg){
    return { error : msg }
}

export function validateFields( ...fields){
    return fields.every(val => val !== undefined && val !== null)
}