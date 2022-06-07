export default class Branch {
    private _name: string;
    private _repoName: string;

    constructor(name: string, repoName: string) {
        this._name = name;
        this._repoName = repoName;
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
}
