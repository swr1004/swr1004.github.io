const checkLogin = () => {
    const id = localStorage.getItem('login-id');
    const role = localStorage.getItem('login-role');
    let needLogin = false;
    try {
        if (role === "patient") {
            const patient = JSON.parse(localStorage.getItem('patient'));
            if (!id || !patient) {
                needLogin = true;
            }
        } else if (role === "practitioner") {
            const practitioner = JSON.parse(localStorage.getItem('practitioner'));
            if (!id || !practitioner) {
                needLogin = true;
            }
        } else if (role === "person") {
            const person = JSON.parse(localStorage.getItem('person'));
            if (!id || !person) {
                needLogin = true;
            }
        } else {
            needLogin = true;
        }
    } catch (e) {
        needLogin = true;
    }

    if (needLogin) {
        logout();
    }
    return true;
}

const logout = () => {
    let loginUrl = "/login.html";
    if (localStorage.getItem('login-role') === "patient") {
        loginUrl = "/patient-login.html";
    }
    localStorage.removeItem('login-id');
    localStorage.removeItem('login-role');
    localStorage.removeItem('patient');
    localStorage.removeItem('practitioner');
    localStorage.removeItem('token');
    localStorage.removeItem('person');
    window.location.href = loginUrl;
}

const getPractioner = () => {
    try {
        return JSON.parse(localStorage.getItem('practitioner'));
    } catch (e) {
        return null;
    }
}

const getPerson = () => {
    try {
        return JSON.parse(localStorage.getItem('person'));
    } catch (e) {
        return null;
    }
}

const getPatient = () => {
    try {
        return JSON.parse(localStorage.getItem('patient'));
    } catch (e) {
        return null;
    }
}

const getUrlParam = (name) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}