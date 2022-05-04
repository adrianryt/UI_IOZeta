import Validator from "./Validator";

export default class TopicValidator extends Validator{
    private _titleError: string = "";
    private _subjectError: string = "";
    private _descriptionError: string = "";
    private _repoNameError: string = "";

    get repoNameError(): string{
        return this._repoNameError;
    }

    get titleError(): string {
        return this._titleError;
    }

    get subjectError(): string {
        return this._subjectError;
    }

    get descriptionError(): string {
        return this._descriptionError;
    }

    public validateSubject(subject: string){
        if(!this.stringNotEmpty(subject)){
            this._subjectError = "Subject cannot be empty";
            return false;
        }
        this._subjectError = "";
        return true;
    }

    public validateDescription(description: string){
        if(!this.stringNotEmpty(description)){
            this._descriptionError = "Description cannot be empty";
            return false;
        }
        this._descriptionError = "";
        return true;
    }

    public validateTitle(title: string){
        if(!this.stringNotEmpty(title)){
            this._titleError = "Title cannot be empty";
            return false;
        }
        this._titleError = "";
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
}
