export class regexEmail {
    public regexEmail = (email: string) => {
        const result = /\S+@\S+\.\S+/;
        return result.test(email);
    }
}