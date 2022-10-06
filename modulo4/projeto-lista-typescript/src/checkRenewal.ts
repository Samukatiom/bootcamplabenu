const data : any = new Date()
const currentYear : number = data.getFullYear()

const checkRenewal = (birthAge: any, issuanceOfIdentity: any): boolean => {
    const yearOfBirth:number = Number(birthAge.substring(6, 10))

    const yearOfIssue : number = Number(issuanceOfIdentity.substring(6, 10))

    const age : number = currentYear - yearOfBirth

    const emissionTime : number = currentYear - yearOfIssue

    if(age <= 25) {
        if(emissionTime >= 5) {
            return true
        } else {
            return false 
        }
    }else if(age > 25 && age <= 50) {
        if(emissionTime >= 10) {
            return true
        }else {
            return false
        }
    }else if(age > 50) {
        if(emissionTime >= 15) {
            return true
        }else {
            return false
        }
    }

} 

console.log(checkRenewal("03/02/1971", "20/10/2007"))


