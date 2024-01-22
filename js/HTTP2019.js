var ret;
//取得網路上的資源
function HTTPGetBinaryData(urlStr) {
    var HttpObj = new XMLHttpRequest();
    HttpObj.responseType = "arraybuffer"; //取得或設定實際回應類型  
    HttpObj.onreadystatechange = function () {
        if (HttpObj.readyState === 4) {
            ret = HttpObj.response;
            // alert(ret);

            callBack();
            // callBack(ret);
            // alert("data retrieved");
        }
    }
    HttpObj.open("GET", urlStr, true);

    HttpObj.send();

}
//取得網路上的資源
function HTTPGetData(urlStr) {
    var HttpObj = new XMLHttpRequest();
    HttpObj.onreadystatechange = function () {
        if (HttpObj.readyState === 4) {
            ret = HttpObj.responseText;
            //   alert(ret);
            callBack();
            //   alert("data retrieved");
        }
    }
    HttpObj.open("GET", urlStr, true);
    HttpObj.send();
}

//上傳 dataStr 到網路上
function HTTPPostData(urlStr, dataStr) {
    var HttpObj = new XMLHttpRequest();
    HttpObj.open("POST", urlStr, true);
    HttpObj.setRequestHeader("Content-type", "application/json+fhir");
    // HttpObj.setRequestHeader("Content-type", "application/xml+fhir");
    HttpObj.onreadystatechange = function () {
        if (HttpObj.readyState === 4) {
            ret = HttpObj.responseText;

            alert(ret);
        }
    }

    HttpObj.send(dataStr);
    //  getData
}