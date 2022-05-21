import CheckpointObject from "./CheckpointObject";

type StudentType = {
    name: string,
    commits: {
        url: string,
        status: number,
        checkpointName:string
    }[]
}

export default class SessionObject {
    private _students: StudentType[];
    private _checkpointNames: string[]


    get checkpointNames(): string[] {
        return this._checkpointNames;
    }

    set checkpointNames(value: string[]) {
        this._checkpointNames = value;
    }

    get students(): StudentType[] {
        return this._students;
    }

    set students(value: StudentType[]) {
        this._students = value;
    }


    constructor(checkpointNames: string[], students: StudentType[]) {
        this._checkpointNames = checkpointNames;
        this._students = students;
    }
}
