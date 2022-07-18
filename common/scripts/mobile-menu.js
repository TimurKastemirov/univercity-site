import {localStorageTokens} from "./modules/constants.js";
import {redirectIfNotLoggedIn} from "./modules/redirect-if-not-logged-in.js";

(function () {
    'use strict'

    const burgerOpenMenu = document.getElementById('open-menu-icon');

    burgerOpenMenu.addEventListener('click', () => {
        const mobileMenuContainer = document.querySelectorAll('.mobile')[0];
        mobileMenuContainer.classList.add('menu-open');
    })

    const closeMenu = () => {
        const mobileMenuContainer = document.querySelectorAll('.mobile')[0];
        mobileMenuContainer.classList.remove('menu-open');
    };

    const closeMenuIcon = document.getElementById('close-menu-icon');
    const closeIcon = document.getElementById('close-icon');

    [closeMenuIcon, closeIcon].forEach((elem) => elem.addEventListener('click', closeMenu));

    const logout = () => {
        localStorage.removeItem(localStorageTokens.isLoggedIn);
        redirectIfNotLoggedIn();
    };

    const logoutIcon = document.getElementById('logout-icon');
    const logoutMenuItem = document.getElementById('logout-menu-item');

    [logoutIcon, logoutMenuItem].forEach((elem) => elem.addEventListener('click', logout));
})();