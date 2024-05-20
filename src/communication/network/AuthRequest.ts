import axios from "axios";
import {User} from "../Types";
import {api} from "../Config";
import {Get} from "../Endpoints";
import {Utils} from "./Utils";

export const apiAuth = axios.create({
    baseURL: "http://localhost:8080",
});

export class AuthRequests {
    static registerUser():Promise<User>{
        return api.get('')
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError)
    }

}


