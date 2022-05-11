import Validator from "./Validator";

export default class LoginValidator extends Validator{
    private _loginError: string;
    private _passwordError: string;

    public validateLogin(login: string): boolean{
        if(!this.stringNotEmpty(login)){
            this._loginError = "Login cannot be empty"
            return false;
        }
        return true
    }

    public validatePassword(password: string) : boolean{
        if(!this.stringNotEmpty(password)){
            this._passwordError = "Password cannot be empty"
            return false
        }
        return true;
    }

    get passwordError(): string {
        return this._passwordError;
    }

    set passwordError(value: string) {
        this._passwordError = value;
    }

    get loginError(): string {
        return this._loginError;
    }

    set loginError(value: string) {
        this._loginError = value;
    }
}