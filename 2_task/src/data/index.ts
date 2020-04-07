import { v1 as uuid } from 'uuid';
import { UserApi } from '../types/UserApi';

const One: UserApi.User = {
    id: uuid(),
    login: 'Name_a',
    password: 'somepassword',
    age: 13,
    isDeleted: false
};
const Two: UserApi.User = {
    id: uuid(),
    login: 'Name_d',
    password: 'pas',
    age: 14,
    isDeleted: false
};
const Three: UserApi.User = {
    id: uuid(),
    login: 'Name_b',
    password: 'qwerty',
    age: 43,
    isDeleted: false
};
const Four: UserApi.User = {
    id: uuid(),
    login: 'Name_c',
    password: 'somepassword',
    age: 13,
    isDeleted: false
};
const Five: UserApi.User = {
    id: uuid(),
    login: 'Natasha',
    password: 'pas',
    age: 14,
    isDeleted: false
};
const Six: UserApi.User = {
    id: uuid(),
    login: 'Nanana',
    password: 'qwerty',
    age: 43,
    isDeleted: false
};

export const tmpArray: UserApi.User[] = [One, Two, Three, Four, Five, Six];
