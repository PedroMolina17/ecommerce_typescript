export interface Users {
    error:      boolean;
    statusCode: number;
    info:       Info;
    results:    Result[];
}

export interface Info {
    count:      number;
    pages:      number;
    totalItems: number;
    next:       string | null;
    prev:       null | string;
}

export interface Result {
    id:       number;
    userName: string;
    email:    string;
    password: string;
    address:  null | string;
    phone:    null | string;
    googleId: null | string;
    role:     Role;
}

export enum Role {
    User = "user",
}

