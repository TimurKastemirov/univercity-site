export function changeHref(fileName) {
    const splittedHref = location.href.split('/');
    splittedHref.pop();
    location.href = [...splittedHref, `${fileName}.html`].join('/');
}