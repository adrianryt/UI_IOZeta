export default class Validator{
    protected stringNotEmpty(data: string){
        return data !== undefined && data !== null && data.length != 0;
    }

    protected stringContainsOnlyAlphaNumeric(data: string){
        return !!data.match(/^[a-z0-9]+$/i);
    }
}
