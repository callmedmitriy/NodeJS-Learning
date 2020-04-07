import {
    ContainerTypes,
    ValidatedRequestSchema
} from 'express-joi-validation';

export namespace UserApi {

    export type User = {
        id: string;
        login: string;
        password: string;
        age: number;
        isDeleted: boolean;
    }

    export type Params = {
        id: string;
    }

    export interface GetUseByIdSchema extends ValidatedRequestSchema {
        [ContainerTypes.Params]: {
            id: string;
        };
    }

    export interface GetUsersByLoginSchema extends ValidatedRequestSchema {
        [ContainerTypes.Query]: {
            login: string;
            limit: string;
        };
    }

    export interface PostUserSchema extends ValidatedRequestSchema {
        [ContainerTypes.Body]: {
            login: string;
            password: string;
            age: number;
        };
    }

    export interface PutUserSchema extends PostUserSchema {
        [ContainerTypes.Params]: {
            id: string;
        };
    }

    export interface DeleteUserSchema extends ValidatedRequestSchema {
        [ContainerTypes.Params]: {
            id: string;
        };
    }
}
