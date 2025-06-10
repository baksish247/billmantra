export type XoupError = {
    type : string;
    status : number;
    message : string;
}

export type AuthRequest = {
    username: string;
    password: string;
}