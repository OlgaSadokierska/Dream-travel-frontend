import { Delete } from "../Endpoints";
import { User } from "../Types";
import { api } from "../Config";
import { Utils } from "./Utils";

export class DeleteRequest {
    static deleteTravel(id: number): Promise<User> {
        return api.delete(`${Delete.TRAVEL_DELETE}/${id}`)
            .then(Utils.mapResponse<User>)
            .catch(Utils.handleError);
    }
}