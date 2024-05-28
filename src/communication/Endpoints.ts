const API_V1 = "/api/v1";
const USERS = "/users";
const TRAVELS = "/travels";

export class Get {
    static USER_REG = '/login';

    static USERS = [API_V1, USERS].join("");
    static MY_TRAVELS = [API_V1, USERS, "/me/travels"].join("");
    static USER_ME = [API_V1, USERS, "/me"].join("");  // Add this line

    static TRAVELS = [API_V1, TRAVELS].join("");
}

export class Post {
    static USER_POST = [API_V1, "/auth/login"].join("");

    static TRAVEL_POST = [API_V1, TRAVELS, "/add"].join("");
}

export class Put {
    static TRAVEL_PUT = (travelId: number) => `${API_V1}${TRAVELS}/${travelId}`;
}

export class Delete {
    static TRAVEL_DELETE = (travelId: number) => `${API_V1}${TRAVELS}/${travelId}`;
}
