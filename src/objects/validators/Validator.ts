export default class Validator{
    protected stringNotEmpty(data: string){
        return data !== undefined && data !== null && data.length != 0;
    }

    protected stringHasLengthBetween(testedString: string, low: number, high: number){
        return testedString.length >= low && testedString.length <= high
    }

    protected stringContainsOnlyAlphaNumeric(data: string){
        return !!data.match(/^[a-zA-Z0-9]+$/i);
    }

    protected stringContainsOnlyLetters(data: string){
        return !!data.match(/^[a-zA-Z]+$/i)
    }

    protected stringContainsLettersNumbersAndSpecialChars(data: string){
        return !!data.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    }
}
