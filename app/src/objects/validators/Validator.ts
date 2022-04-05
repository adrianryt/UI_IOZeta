export default class Validator{
    protected stringNotEmpty(data: string){
        if(data.length != 0){
            return true;
        }
        else {
            return false;
        }
    }

    protected stringContainsOnlyAlphaNumeric(data: string){
        if(data.match(/^[a-z0-9]+$/i)){
            return true;
        }
        else {
            return false;
        }
    }
}