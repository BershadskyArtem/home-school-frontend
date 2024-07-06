export interface IUser {
    email? : string | null | undefined;
    id? : string | null | undefined;
    role? : string | null | undefined;
    is_confirmed : boolean;
    is_authentificated : boolean;
}