export const addLeadingZero = (number : string) => {
    if(number.length === 1) {
        return `0${number}`
    }
    return number 
}