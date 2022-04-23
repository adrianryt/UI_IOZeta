export default class{
    private _id: number;
    private _name: string;
    private _surname: string;
    private _gitNick: string;
    private _gitToken: string;

    constructor(name: string, surname: string, gitNick: string, gitToken: string) {
        this._name = name;
        this._surname = surname;
        this._gitNick = gitNick;
        this._gitToken = gitToken;
    }


    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get surname(): string {
        return this._surname;
    }

    set surname(value: string) {
        this._surname = value;
    }

    get gitNick(): string {
        return this._gitNick;
    }

    set gitNick(value: string) {
        this._gitNick = value;
    }

    get gitToken(): string {
        return this._gitToken;
    }

    set gitToken(value: string) {
        this._gitToken = value;
    }
}