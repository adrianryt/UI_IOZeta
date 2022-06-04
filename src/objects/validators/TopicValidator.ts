import Validator from "./Validator";

export default class TopicValidator extends Validator{
    get checkPointNumberError(): string {
        return this._checkPointNumberError;
    }

    get checkPointTitleErrors(): string[] {
        return this._checkPointTitleErrors;
    }

    get checkPointDescriptionErrors(): string[] {
        return this._checkPointDescriptionErrors;
    }

    private _titleError: string = "";
    private _subjectError: string = "";
    private _repoNameError: string = "";
    private _githubUsernameError: string = "";
    private _checkPointNumberError: string = "";
    private _checkPointTitleErrors: string[] = [];
    private _checkPointDescriptionErrors: string[] = [];

    get repoNameError(): string{
        return this._repoNameError;
    }


    get githubUsernameError(): string {
        return this._githubUsernameError;
    }

    get titleError(): string {
        return this._titleError;
    }

    get subjectError(): string {
        return this._subjectError;
    }

    public validateSubject(subject: string){
        if(!this.stringNotEmpty(subject)){
            this._subjectError = "Subject cannot be empty";
            return false;
        }
        this._subjectError = "";
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

    public validateCheckPointNumber(checkPointNumber: number|undefined){
        if(checkPointNumber === undefined || checkPointNumber === 0){
            this._checkPointNumberError = "The number of checkpoints should be higher than 0 and cannot be empty";
            return false;
        }

        return true;
    }

    public validateCheckPointTitles(checkPointTitles: string[]){
        let succeed = true
        this._checkPointTitleErrors = []
        checkPointTitles.forEach(checkPointTitle => {
            if(!this.stringNotEmpty(checkPointTitle)){
                this._checkPointTitleErrors.push("checkpoint title cannot be empty")
                succeed = false;
            }
            else if(!this.stringHasLengthBetween(checkPointTitle, 1, 100)){
                this._checkPointTitleErrors.push("checkpoint title should contain between 1 and 100 characters")
                succeed = false;
            }
            this._checkPointTitleErrors.push("")
        })
        return succeed;
    }

    public validateCheckPointDescription(checkPointDescriptions: string[]){
        let succeed = true
        this._checkPointDescriptionErrors = []
        checkPointDescriptions.forEach(checkPointDescription => {
            if(!this.stringNotEmpty(checkPointDescription)){
                this._checkPointDescriptionErrors.push("checkpoint description cannot be empty")
                succeed = false;
            }
            else if(!this.stringHasLengthBetween(checkPointDescription, 1, 5000)){
                this._checkPointDescriptionErrors.push("checkpoint description should contain between 1 and 5000 characters")
                succeed = false;
            }
            this._checkPointDescriptionErrors.push("")
        })
        return succeed;
    }

    public validateGithubUsername(githubUsername: string) {
        if(!this.stringNotEmpty(githubUsername)){
            this._repoNameError = "Github username cannot be empty";
            return false;
        }
        this._repoNameError = "";
        return true;
    }
}
