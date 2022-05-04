export default class CheckpointObject {
    private _title: string;
    private _description: string;
    private _command: string[];


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get command(): string[] {
        return this._command;
    }

    set command(value: string[]) {
        this._command = value;
    }

    constructor(tile: string, description: string, command: string[]) {
        this._title = tile;
        this._description = description;
        this._command = command;
    }
}
