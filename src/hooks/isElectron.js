const isElectron = () => {
    if (navigator.userAgent.toLowerCase().indexOf(' electron/') > -1) return true;
    return false;
};

export default isElectron;