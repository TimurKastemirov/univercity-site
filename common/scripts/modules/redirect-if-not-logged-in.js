import { localStorageTokens } from "./constants.js";
import { changeHref } from "./change-href.js";

export function redirectIfNotLoggedIn() {
    if (!localStorage.getItem(localStorageTokens.isLoggedIn)) {
        changeHref('index');
    }
}