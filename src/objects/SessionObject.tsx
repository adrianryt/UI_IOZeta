import CheckpointObject from "./CheckpointObject";

export default class SessionObject {
    private _checkpoints: CheckpointObject[];
    private _readmeUrl: string;
    private _subject: string;


    get checkpoints(): CheckpointObject[] {
        return this._checkpoints;
    }

    set checkpoints(value: CheckpointObject[]) {
        this._checkpoints = value;
    }

    get readmeUrl(): string {
        return this._readmeUrl;
    }

    set readmeUrl(value: string) {
        this._readmeUrl = value;
    }

    get subject(): string {
        return this._subject;
    }

    set subject(value: string) {
        this._subject = value;
    }

    constructor(checkpoints: CheckpointObject[], readmeUrl: string) {
        this._checkpoints = checkpoints;
        this._readmeUrl = readmeUrl;
    }
}