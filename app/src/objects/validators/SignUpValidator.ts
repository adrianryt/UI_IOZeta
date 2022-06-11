import Validator from "./Validator";
import axios from "axios";

export default class SignUpValidator extends Validator{
    private _firstNameError: string;
    private _surnameError: string;
    private _nicknameError: string;
    private _tokenError: string;
    private _passwordError: string;

    public validateFirstName(firstName: string): boolean{
        if(!this.stringNotEmpty(firstName)){
            this._firstNameError = "First name cannot be empty"
            return false;
        }
        if(!this.stringHasLengthBetween(firstName,1, 150)){
            this._firstNameError = "First name cannot be longer than 150 characters"
            return false;
        }
        if(!this.stringContainsOnlyLetters(firstName)){
            this._firstNameError = "First name should contains only letters"
            return false;
        }
        return true;
    }

    public validateSurname(surname: string): boolean{
        if(!this.stringNotEmpty(surname)){
            this._surnameError = "Surname cannot be empty"
            return false;
        }
        if(!this.stringHasLengthBetween(surname,1, 250)){
            this._surnameError = "Surname cannot be longer than 250 characters"
            return false;
        }
        if(!this.stringContainsOnlyLetters(surname)){
            this._surnameError = "Surname should contains only letters"
            return false;
        }
        return true;
    }

    public async validateNickname(nickname: string): Promise<boolean> {
        if(!this.stringNotEmpty(nickname)){
            this._nicknameError = "Nickname cannot be empty"
            return false;
        }
        if(!this.stringHasLengthBetween(nickname, 1, 100)){
            this._nicknameError = "Nickname cannot be longer than 100 characters"
            return false;
        }
        // if(!this.stringContainsOnlyAlphaNumeric(nickname)){
        //     this._nicknameError = "Nickname should contains only letters and numbers"
        //     return false;
        // }
        console.log("axios nickname")
        let isUsernameValid = true;
        await axios({
            url: "https://api.github.com/users/" + nickname,
            method: "get"
        }).then((response) => {
            console.log(response)
            if (response.status === 404) {
                console.log("bledny nickname");
                this._nicknameError = "This github username doesn't exist";
                isUsernameValid = false;
            }
        }).catch((e) => {
            console.log(e)
            this._nicknameError = "This github username doesn't exist";
            isUsernameValid = false;
        })
        console.log("nickname return " + isUsernameValid);
        return isUsernameValid;
    }

    public validateGitToken(token: string): boolean{
        if(!this.stringNotEmpty(token)){
            this._tokenError = "Token cannot be empty"
            return false;
        }
        if(!this.stringHasLengthBetween(token,1, 500)){
            this._tokenError = "Token cannot be longer than 500 characters"
            return false;
        }
        return true;
    }

    public validatePassword(password: string): boolean{
        if(!this.stringNotEmpty(password)){
            this._passwordError = "Password cannot be empty"
            return false;
        }
        if(!this.stringHasLengthBetween(password,8, 250)){
            this._passwordError = "Password should be longer than 7 and shorter than  250 characters"
            return false;
        }
        if(!this.stringContainsLettersNumbersAndSpecialChars(password)){
            this._passwordError = "Password should contain at least one letter, digit and special character"
            return false;
        }
        return true;
    }


    get firstNameError(): string {
        return this._firstNameError;
    }

    set firstNameError(value: string) {
        this._firstNameError = value;
    }

    get surnameError(): string {
        return this._surnameError;
    }

    set surnameError(value: string) {
        this._surnameError = value;
    }

    get nicknameError(): string {
        return this._nicknameError;
    }

    set nicknameError(value: string) {
        this._nicknameError = value;
    }

    get tokenError(): string {
        return this._tokenError;
    }

    set tokenError(value: string) {
        this._tokenError = value;
    }

    get passwordError(): string {
        return this._passwordError;
    }

    set passwordError(value: string) {
        this._passwordError = value;
    }
}