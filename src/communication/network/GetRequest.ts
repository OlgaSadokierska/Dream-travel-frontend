import { Get } from "../Endpoints";
import {Travel, User} from "../Types";
import { api } from "../Config";
import { Utils } from "./Utils";

export class GetRequests {

    static getLogin():Promise<User[]>{
        return api.get(Get.USER_REG)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError)
    }

    //USERS
    static getUserById(id: number):Promise<User>{
        return api.get(Get.USER_BY_ID + id)
            .then(Utils.mapResponse<User>)
            .catch(Utils.handleError)
    }

    static getAllUser():Promise<User[]>{
        return api.get(Get.USERS)
            .then(Utils.mapResponse<User[]>)
            .catch(Utils.handleError)
    }

    //TRAVELS
    static getAllTravels():Promise<User>{
        return api.get(Get.TRAVELS)
            .then(Utils.mapResponse<Travel>)
            .catch(Utils.handleError)
    }

}