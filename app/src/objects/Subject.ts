import Lecturer from "./Lecturer";

export default class Subject{
    private _name: string;
    private _repoName: string;
    private _lecturer: Lecturer;


    constructor(name: string, repoName: string, lecturer: Lecturer) {
        this._name = name;
        this._repoName = repoName;
        this._lecturer = lecturer;
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

    get lecturer(): Lecturer {
        return this._lecturer;
    }

    set lecturer(value: Lecturer){
        this._lecturer = value;
    }

}