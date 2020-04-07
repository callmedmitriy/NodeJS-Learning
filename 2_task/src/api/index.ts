// import express from 'express';
import { Response, Router } from 'express';
import { v1 as uuid } from 'uuid';
import {
    createValidator,
    ValidatedRequest
} from 'express-joi-validation';

import { getAutoSuggestUsers } from '../utils';

import { UserApi } from '../types/UserApi';

import * as schemes from '../schemes/UserApi';
import { tmpArray } from '../data';

let userList: UserApi.User[] = [];

export const router = Router();
const validator = createValidator();

router
    .get(
        '/',
        validator.query(schemes.getUsersByLoginSchema),
        (req: ValidatedRequest<UserApi.GetUsersByLoginSchema>, res: Response) => {
            const { login } = req.query;
            const limit = parseInt(req.query.limit, 10) || 5;

            res.json(getAutoSuggestUsers(userList, login, limit));
        }
    )
    .get(
        '/:id',
        validator.params(schemes.getUserByIdSchema),
        (req: ValidatedRequest<UserApi.GetUseByIdSchema>, res: Response) => {
            res.json(userList.find((user) => user.id === req.params.id));
        }
    )
    .post(
        '/',
        validator.body(schemes.postUserSchema),
        (req: ValidatedRequest<UserApi.PostUserSchema>, res: Response) => {
            userList.push({
                id: uuid(),
                ...req.body,
                isDeleted: false
            });

            res.json(userList);
        }
    )
    .put(
        '/:id',
        validator.params(schemes.putUserParamsSchema),
        validator.body(schemes.putUserBodySchema),
        (req: ValidatedRequest<UserApi.PostUserSchema>, res: Response) => {
            userList = userList.map((user): UserApi.User => {
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    };
                }

                return user;
            });

            res.json(userList);
        }
    )
    .delete(
        '/:id',
        validator.params(schemes.deleteUserSchema),
        (req: ValidatedRequest<UserApi.DeleteUserSchema>, res: Response) => {
            userList = userList.map((user): UserApi.User => {
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        isDeleted: true
                    };
                }

                return user;
            });

            res.json(userList);
        }
    );

userList = tmpArray;
