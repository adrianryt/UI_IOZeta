export default class CheckpointObject {
    private _title: string;
    private _description: string;
    private _commands: string[];
    private _progressCheckBox: boolean;
    private _number: number;

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

    get commands(): string[] {
        return this._commands;
    }

    set commands(value: string[]) {
        this._commands = value;
    }


    get progressCheckBox(): boolean {
        return this._progressCheckBox;
    }

    set progressCheckBox(value: boolean) {
        this._progressCheckBox = value;
    }

    get number(): number {
        return this._number;
    }

    set number(value: number) {
        this._number = value;
    }

    constructor(tile: string, description: string, commands: string[], progressCheckBox: boolean, number: number) {
        this._title = tile;
        this._description = description;
        this._commands = commands;
        this._progressCheckBox = progressCheckBox;
        this._number = number;
    }
}
