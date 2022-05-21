export default class TopicObject {
    private _title: string;
    private _subject: string;
    private _repoName: string;
    private _id: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }


    get subject(): string {
        return this._subject;
    }

    set subject(value: string) {
        this._subject = value;
    }

    get repoName(): string {
        return this._repoName;
    }

    set repoName(value: string) {
        this._repoName = value;
    }

    constructor(tile: string, subject: string, repoName: string) {
        this._title = tile;
        this._subject = subject;
        this._repoName = repoName
    }
}
