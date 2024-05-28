import { Get, Post } from "../Endpoints";
import { api } from "../Config";
import { Utils } from "./Utils";

export class GetRequests {
    static getLogin() {
        return api.get(Get.USER_REG)
            .then(Utils.mapResponse)
            .catch(Utils.handleError);
    }

    static getAllUsers() {
        return api.get(Get.USERS)
            .then(Utils.mapResponse)
            .catch(Utils.handleError);
    }

    static getAllTravels() {
        return api.get(Get.TRAVELS)
            .then(Utils.mapResponse)
            .catch(Utils.handleError);
    }

    static getMyTravels() {
        return api.get(Get.MY_TRAVELS, { withCredentials: true })
            .then(Utils.mapResponse)
            .catch(Utils.handleError);
    }

    static getUserInfo() {
        return api.get(Get.USER_ME, { withCredentials: true })
            .then(Utils.mapResponse)
            .catch(Utils.handleError);
    }
}
