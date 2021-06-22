export default () => {
    if (localStorage.token) {
        return true;
    }
    else {
        return false;
    }
}
