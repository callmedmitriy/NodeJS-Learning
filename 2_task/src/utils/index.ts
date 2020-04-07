import { UserApi } from '../types/UserApi';

export function getAutoSuggestUsers(
    userList: UserApi.User[],
    loginSubstring: string,
    limit: number
): UserApi.User[] {
    return userList
        .filter((user) => user.login.search(loginSubstring) !== -1)
        .sort((first, second) => (first.login > second.login ? 1 : -1))
        .slice(0, limit);
}
