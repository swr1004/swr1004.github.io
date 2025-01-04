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
        loginUrl = "/PatientLogin.html";
    }
    if (localStorage.getItem('login-role') === "practitioner") {
        loginUrl = "/PractitionerLogin.html";
    }
    if (localStorage.getItem('login-role') === "person") {
        loginUrl = "/Person-deny.html";
    }
    localStorage.removeItem('login-id');
    localStorage.removeItem('login-role');
    localStorage.removeItem('patient');
    localStorage.removeItem('practitioner');
    localStorage.removeItem('token');
    localStorage.removeItem('person');
    localStorage.removeItem('patient');
    window.location.href = loginUrl;
}

const checkcreate = () => {
    const fhirrole = localStorage.getItem('fhir-patient1');
    console.log('fhirrole '+fhirrole);
    if (fhirrole=='0'){
        window.location.href = '/patient-createFHIR.html';
    }
    
    return true;
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

const toLocalISOString= (date) => {
    const localDate = new Date(date - date.getTimezoneOffset() * 60000); //offset in milliseconds. Credit https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
   
    // Optionally remove second/millisecond if needed
    localDate.setSeconds(null);
    localDate.setMilliseconds(null);
    return localDate.toISOString().slice(0, -1);
  }

  const toLocalDateString= (date) => {
    const localDate = new Date(date - date.getTimezoneOffset() * 60000); //offset in milliseconds. Credit https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
   
    // Optionally remove second/millisecond if needed
    localDate.setSeconds(null);
    localDate.setMilliseconds(null);
    //console.log(localDate + ' : ' +localDate.toLocaleDateString());
    return localDate.toLocaleDateString();
  }