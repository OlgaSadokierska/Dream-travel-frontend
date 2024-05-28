import { api } from '../Config';
import { User } from "../Types";
import { Post } from "../Endpoints";
import { Utils } from "./Utils";

export class AuthRequests {
    static registerUser(): Promise<User> {
        return api.get('')
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }
}

export class PostRequests {
    static userLogin(userData) {
        return api.post(Post.USER_POST, userData)
            .then(Utils.mapResponse)
            .catch(Utils.handleError);
    }

    static addTravel(travelData) {
        return api.post(Post.TRAVEL_POST, travelData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(Utils.mapResponse)
        .catch(Utils.handleError);
    }
}
