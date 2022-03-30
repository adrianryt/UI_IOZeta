export default class TopicObject {
    private _tile: string;
    private _description: string;
    private _subject: string;


    get tile(): string {
        return this._tile;
    }

    set tile(value: string) {
        this._tile = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get subject(): string {
        return this._subject;
    }

    set subject(value: string) {
        this._subject = value;
    }

    constructor(tile: string, description: string, subject: string) {
        this._tile = tile;
        this._description = description;
        this._subject = subject;
    }
}