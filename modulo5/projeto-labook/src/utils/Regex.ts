export class RegexEmail {
    public regexEmail = (email: string) => {
        const result = /\S+@\S+\.\S+/;
        return result.test(email);
    }
} 