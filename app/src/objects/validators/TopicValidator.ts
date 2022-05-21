import Validator from "./Validator";

export default class TopicValidator extends Validator{
    private _titleError: string = "";
    private _subjectError: string = "";
    private _repoNameError: string = "";
    private _githubUsernameError: string = "";
    private _repoLinkError: string = "";

    get repoNameError(): string{
        return this._repoNameError;
    }

    get readmeLinkError(): string {
        return this._repoLinkError;
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

    public validateReadmeLink(repoName: string){
        if(!this.stringNotEmpty(repoName)){
            this._repoNameError = "Repository link cannot be empty";
            return false;
        }
        this._repoNameError = "";
        return true;
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
