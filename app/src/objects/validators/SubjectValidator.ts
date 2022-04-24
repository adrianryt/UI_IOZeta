import Validator from "./Validator";

export default class SubjectValidator extends Validator{
    private _nameError: string;
    private _repoNameError: string;
    private _lecturerError: string;

    get nameError(): string {
        return this._nameError;
    }

    get repoNameError(): string {
        return this._repoNameError;
    }

    get lecturerError(): string {
        return this._lecturerError;
    }

    public validateName(name: string){
        if(!this.stringNotEmpty(name)){
            this._nameError = "Name cannot be empty";
            return false;
        }
        this._nameError = "";
        return true;
    }

    public validateRepoName(repoName: string){
        if(!this.stringNotEmpty(repoName)){
            this._repoNameError = "Repository name cannot be empty";
            return false;
        }
        this._repoNameError = "";
        return true;
    }

    public validateLecturer(lecturer: string){
        if(!this.stringNotEmpty(lecturer)){
            this._lecturerError = "Lecturer cannot be empty";
            return false;
        }
        this._lecturerError = "";
        return true;
    }
}
