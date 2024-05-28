import { Put } from "../Endpoints";
import { api } from "../Config";
import { Utils } from "./Utils";

export class PutRequests {
    static updateTravel(travelId: number, travelData) {
        return api.put(Put.TRAVEL_PUT(travelId), travelData)
            .then(Utils.mapResponse)
            .catch(Utils.handleError);
    }
}
