export default class Branch {
    private _name: string;
    private _repoName: string;
    private _lecturerNickname: string

    constructor(name: string, repoName: string, lecturerNickname: string) {
        this._name = name;
        this._repoName = repoName;
        this._lecturerNickname = lecturerNickname;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get repoName(): string {
        return this._repoName;
    }

    set repoName(value: string) {
        this._repoName = value;
    }


    get lecturerNickname(): string {
        return this._lecturerNickname;
    }

    set lecturerNickname(value: string) {
        this._lecturerNickname = value;
    }

    public getCommand(): string{

        return  "git clone https://github.com/"+ this.lecturerNickname +"/" + this.repoName +".git" + "\n" +
            "cd " + this.repoName + "\n" +
            "git checkout " + this.name;

    }

}
