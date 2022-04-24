import Lecturer from "./Lecturer";
import TopicObject from "./TopicObject";

export default class Subject{
    private _name: string;
    private _repoName: string;
    private _lecturer: Lecturer;
    private _topics: TopicObject[];
    private _id: number;

    constructor(name: string, repoName: string, lecturer: Lecturer, topics: TopicObject[]) {
        this._name = name;
        this._repoName = repoName;
        this._lecturer = lecturer;
        this._topics = topics;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get topics(): TopicObject[] {
        return this._topics;
    }

    set topics(value: TopicObject[]) {
        this._topics = value;
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
