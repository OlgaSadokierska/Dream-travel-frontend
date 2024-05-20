const API_V1 = "/api/v1";
const USERS = "/users";
const TRAVELS = "/travels";


export class Get {
    static USER_REG = '/login';

    static USERS = [API_V1, USERS].join("");
    static USER_BY_ID = [API_V1, USERS, "/id/"].join("");

    static TRAVELS = [API_V1, TRAVELS, "/id/"].join("");
}

export class Post {
    static USER_POST = [API_V1, "/auth/login"].join("");

    static TRAVEL_POST = [API_V1, TRAVELS].join("");
}

export class Put {
    static TRAVEL_PUT = [API_V1, TRAVELS,"/id"].join("");
}

export class Delete {
    static TRAVEL_DELETE = [API_V1, TRAVELS].join("");
}