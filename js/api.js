const FHIR_BASE = 'https://fhir.tcumi.com:51443/hapi66/fhir';
const API_HOST = 'https://fhir.tcumi.com:51443/hapi66';
const FHIR_BASE2 = 'https://fhir.tcumi.com:52443/hapi66/fhir';
const API_HOST2 = 'https://fhir.tcumi.com:52443/hapi66';
const FHIR_APP = 'https://dd1004.github.io/'
//const FHIR_BASE = 'http://localhost:8080/r5/fhir';
//const API_HOST = 'http://localhost:8080/r5';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization' : ''
}
const API_UP_HEADERS = {
    'Authorization' : ''
}


let personJSONobj = {
		"resourceType": "Person",
		"active": "true",
		"identifier": [ 
			{
				"system": "UserID",
				"value": ""
			}, 
			{
				"system": "Password",
				"value": ""
			},
			{
				"system": "jobPosition",
				"value": ""
			},
			{
				"system": "institution",
				"value": ""
			},
			{
				"system": "nationality",
				"value": ""
			}
		],
		"gender": "",
		"name": [ {
			"text": ""
		} ],
		"telecom": [
			{
			  "system": "email",
			  "value": "Jim@example.org"
			}
		]
	};

    let practitionerJSONobj = {
		"resourceType": "Practitioner",
		"active": "true",
		"identifier": [
			{
				"system": "UserID",
				"value": "",
                "use" : "official",
                "type" : {
                    "coding" : [{
                        "system" : "http://terminology.hl7.org/CodeSystem/v2-0203",
                        "code" : "NNxxx"
                    }]
                },
			},
			{
				"system": "Password",
				"value": ""
			},
			{
				"system": "role",
				"value": ""
			}
		],
		"gender": "",
		"name": [ {
			"text": ""
		} ],
		"telecom": [
			{
			  "system": "email",
			  "value": "Jim@example.org"
			}
		]
	};

    let registerObj = {"Person":"", "Practitioner": ""};

    let  orgJSONobj = {
		"resourceType": "Organization",
        "id":"",
		"active": "true",
		"name": "TCU",
		"managingOrganization": {
			"reference": ""
		},
	};

	
    let  patientJSONobj = {
        
		"resourceType": "Patient",
        "id":"",
		"active": "true",
        "identifier": [ 
			{
				"system": "UserID",
				"value": ""
			}, 
			{
				"system": "Password",
				"value": ""
			},
			{
				"system": "man",
				"value": ""
			},
			{
				"system": "name",
				"value": ""
			},
			{
				"system": "nationality",
				"value": ""
			}
		],
		"gender": "",
        "birthDate": "",
		"name": [ {
			"text": "testPatient1"
		} ],
		"managingOrganization": {
			"reference": "Organization/98a6f5c5-af58-41b5-bd6f-d8ca996b5580"
		},
		"telecom": [
			{
			  "system": "email",
			  "value": "Jim@example.org"
			}
		]
	};

    let encounterJSONobj = {
		"resourceType": "Encounter",
		"status": "unknown",
		"identifier": [ 
			{
				"system": "type",
				"value": ""
			}, 
			{
				"system": "name",
				"value": ""
			}
		],
        "participant":[
            {"actor":{"reference":""}}
        ],
        "subject" : {"reference":""},
        "actualPeriod" :{"start":""}

    };
    //documenet reference
    let drJsonobj = {
        "resourceType": "DocumentReference",
        "status": "current",
        "period": {
            "start": "",
            "end": ""
        },
        "date": "",
        "content": [{
            "attachment": {
                "contentType": "text/plain",
                "url": ""
            }
        }],
        "context": [{
            "reference": ""
        }]
    }; 
    //https://build.fhir.org/ig/cctwFHIRterm/MOHW_TWCoreIG_Build/examples.html
    //身高 8302-2 Body height, unit cm, code cm
    //體重 29463-7 Body weight, unit kg, code kg
    //體溫 8310-5 Body temperature, unit Cel, code Cel
    //心率 8867-4 Heart rate, unit beats/min, code /min
    let observationobj = {
        "resourceType": "Observation",
        "status": "final",
        "category": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                "code": "vital-signs",
                "display": "Vital Signs"
              }
            ],
            "text": "Vital Signs"
          }
        ],
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "8480-6",
              "display": "Systolic blood pressure"
            }
          ],
          "text": "Systolic Blood Pressure"
        },
        "subject": {
          "reference": "Patient/xxxx"
        },
        "performer":[{
            "reference": "Patient/xxxx"
          }],
        "effectiveDateTime": "2025-01-01",
        "valueQuantity": {
          "value": 120,
          "unit": "mmHg",
          "system": "http://unitsofmeasure.org",
          "code": "mm[Hg]"
        }
      };
	
	
    const  fileGet = async (myfile) => {
        const url = `${API_HOST}/api/downloadfile?filename=${myfile}&type=get`;
        API_HEADERS.Authorization = localStorage.getItem('token');
        await fetch(url, {
            method: 'GET',
            headers: API_HEADERS
        }).then(async (response) => response.blob())
        .then((blob) => {
          var url = window.URL.createObjectURL(blob); // create url from blob
          var fileLink = document.createElement('a'); // create link for file
          fileLink.href = url;
          fileLink.download = myfile; // download filename
          document.body.appendChild(fileLink); // append file link to download
          fileLink.click();
          fileLink.remove(); // remove file link after click
        })
        .catch((error) => {});
       
    }

const useGet = async (url, headers = {}, params = {}) => {
    let json = null;
    await fetch(url, {
        method: 'GET',
        headers: headers,
        params: params
    }).then(async (response) => {
        json = await response.json();
    }).catch((error) => {});
    return json;
}

const usePost = async (url, headers = {}, body = {}) => {
    let json = null;
    await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    }).then(async (response) => {
       
        json = await response.json();
    }).catch((error) => {
        console.log(error);
    });
    return json;
}

const usePut = async (url, headers = {}, body = {}) => {
    let json = null;
    await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body
    }).then(async (response) => {
        json = await response.json();
    }).catch((error) => {});
    return json;
}

const getPractitionerById = async (id, identifier) => {
    const url = `${FHIR_BASE}/Practitioner?_id=${id}&identifier=${identifier}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.total > 0 : false,
        data: response ? response.entry.length > 0 ? response.entry[0].resource : null : null
    };
}

const getPractitionerByLink = async (link) => {
    const url = `${FHIR_BASE}/`+link;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.id  : false,
        data: response ? response.id ? response : null : null
    };
}

const getPatientByLink = async (link) => {
    const url = `${FHIR_BASE}/`+link;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.id  : false,
        data: response ? response.id ? response : null : null
    };
}


const getPatientById = async (id) => {
    const url = `${FHIR_BASE}/Patient/${id}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        data: success ? response : null
    };
}

const getPatientByIdentifierAndBirth = async (identifier, birthdate) => {
    const url = `${FHIR_BASE}/Patient?identifier=${identifier}&birthdate=${birthdate}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    let success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    let data = null;
    if (success) {
        if (response.total > 0) {
            data = response.entry[response.total - 1].resource;
        } else {
            success = false;
        }
    }
    return {
        success: success,
        data: data
    };
}

const getEncounterDataById = async (id) => {
    const url = `${FHIR_BASE}/Encounter/${id}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    const success = response ? true : false;
    return {
        success: success,
        data: response
    };
}

const getEncounterDataByPractitionerAndStatus = async (status, id) => {
    const url = `${FHIR_BASE}/Encounter?status=${status}&participant=${id}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    const success = response ? true : false;
    let datas = [];
    if (success) {
        for (let i in response.entry) {
            let encounter = response.entry[i].resource;
            let patientId = encounter.subject.reference.split('/')[1];
            datas.push({
                id: encounter.id,
                status: encounter.status,
                patientId,
                note: "",
            });
        }
    } 

    return {
        success: success,
        data: datas
    };
}

//舊版
const getEncountersByPractitioner = async (id) => {
    // 未報到
    const unknown = await getEncounterDataByPractitionerAndStatus("unknown", id).then((response) => {
        return response.success ? response.data : [];
    });

    // 已報到
    const planned = await getEncounterDataByPractitionerAndStatus("planned", id).then((response) => {
        return response.success ? response.data : [];
    });

    // 進行中
    const progress = await getEncounterDataByPractitionerAndStatus("in-progress", id).then((response) => {
        return response.success ? response.data : [];
    });

    // 已完成
    const completed = await getEncounterDataByPractitionerAndStatus("completed", id).then((response) => {
        return response.success ? response.data : [];
    });

    const encounters = unknown.concat(planned).concat(progress).concat(completed);
    let datas = [];
    for (let i in encounters) {
        let encounter = encounters[i];
        let response2 = await getPatientById(encounter.patientId);
        let patient = response2.success && response2.data ? response2.data : null;
        datas.push({
            id: encounter.id,
            status: encounter.status,
            name: patient ? patient.name[0].text : "查無此人",
            note: "",
        });
    }

    return {
        success: true,
        data: datas
    };
}

//新版for 老師流程
const getEncountersinprogress = async (id) => {


    // 進行中
    const progress = await getEncounterDataByPractitionerAndStatus("in-progress", id).then((response) => {
        return response.success ? response.data : [];
    });


    const encounters = progress;
    let datas = [];
    for (let i in encounters) {
        let encounter = encounters[i];
        let response2 = await getPatientById(encounter.patientId);
        let patient = response2.success && response2.data ? response2.data : null;
        datas.push({
            id: encounter.id,
            patientid: encounter.patientId,
            status: encounter.status,
            name: patient ? patient.name[0].text : "查無此人",
            note: "",
        });
    }

    return {
        success: true,
        data: datas
    };
}

const getPractitionerByEncounter = async (url) => {
    // get doctor or nurse
    const response = await getFHIRResourceById(url);
    //const response = await getFHIRResource(url).then((response) => {
        
    //    return response.success ? response.data : [];
    //});
    
    let datas =response.data ;
     if (Array.isArray(response.data)){
        datas.sort((a, b) => {
            return a.id - b.id;
        });
    }

    let datas1 =  "";
    if (Array.isArray(datas)){
        datas.forEach((data) => {
            datas1 = data.name[0].text +"("+data.id+")";
           
        });
    }else{
        datas1 =  datas.name[0].text +"("+datas.id+")";
   }
    
   

    return datas1;
}

const getEncounterDataByPatientAndStatus = async (status, id) => {
    const url = `${FHIR_BASE}/Encounter?status=${status}&patient=${id}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    const success = response ? true : false;
    let datas = [];
    if (success) {
        for (let i in response.entry) {
            let encounter = response.entry[i].resource;
            let patientId = encounter.subject.reference.split('/')[1];
            let referenceurl = encounter.participant ? encounter.participant[0].actor.reference :"";
            let bookdate = encounter.actualPeriod ?encounter.actualPeriod.start : "";
            datas.push({
                id: encounter.id,
                status: encounter.status,
                reference: referenceurl,
                patientId,
                note: "",
                book : bookdate,
            });
        }
    }

    return {
        success: success,
        data: datas
    };
}

const getEncountersByPatient = async (id) => {
    // 未報到
    const unknown = await getEncounterDataByPatientAndStatus("unknown", id).then((response) => {
        return response.success ? response.data : [];
    });

    // 已報到
    const planned = await getEncounterDataByPatientAndStatus("planned", id).then((response) => {
        return response.success ? response.data : [];
    });

    // 進行中
    const progress = await getEncounterDataByPatientAndStatus("in-progress", id).then((response) => {
        return response.success ? response.data : [];
    });

    // 已完成
    const completed = await getEncounterDataByPatientAndStatus("completed", id).then((response) => {
        return response.success ? response.data : [];
    });

    const encounters = unknown.concat(planned).concat(progress).concat(completed);
    let datas = [];
    for (let i in encounters) {
        let encounter = encounters[i];
        let response2 = await getPatientById(encounter.patientId);
        let patient = response2.success && response2.data ? response2.data : null;
        console.log(encounter);
        datas.push({
            book : encounter.book,
            id: encounter.id,
            status: encounter.status,
            name: patient ? patient.name[0].text : "查無此人",
            reference : encounter.reference ,
            note: "",
        });
    }

    return {
        success: true,
        data: datas
    };
}

const updateEncounterStatus = async (id, status) => {
    let encounter = await getEncounterDataById(id).then((response) => {
        return response.success ? response.data : null;
    });
    if (!encounter) {
        return {
            success: false,
            msg: "查無此掛號資料",
            data: null
        };
    }
    encounter.status = status;

    const url = `${FHIR_BASE}/Encounter/${id}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await usePut(url, API_HEADERS, JSON.stringify(encounter));
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        msg: success ? "更新成功" : "更新失敗",
        data: response
    };
}




const userlogin = async (id, identifier) => {
    const url = `${API_HOST}/api/login?username=${id}&password=${identifier}`;
    const response = await usePost(url, API_HEADERS);
    //console.log(response.entry.length);
    //console.log(response.total);
    if (response.total == null){
        return {
            success : false,
            data : null,
            jwt : null
        };
    }else{
        return {
            success: response ? response.total > 0 : false,
            data: response ? response.entry.length > 0 ? response.entry[0] : null : null,
            jwt: response.jwt
        };
    }
}


const Patientlogin = async (id, identifier) => {
    const url = `${API_HOST}/api/Patientlogin?username=${id}&password=${identifier}`;
    const response = await usePost(url, API_HEADERS);
    console.log(response);
    //console.log(response.total);
    if (null== response || response.total == null){
        return {
            success : false,
            data : null,
            jwt : null
        };
    }else{
        return {
            success: response ? response.total > 0 : false,
            data: response ? response.entry.length > 0 ? response.entry[0] : null : null,
            jwt: response.jwt
        };
    }
    
}

const Personlogin = async (id, identifier) => {
    const url = `${API_HOST}/api/Personlogin?username=${id}&password=${identifier}`;
    const response = await usePost(url, API_HEADERS);
    console.log(response);
    //console.log(response.total);
    if (null== response || response.total == null){
        return {
            success : false,
            data : null,
            jwt : null
        };
    }else{
        return {
            success: response ? response.total > 0 : false,
            data: response ? response.entry.length > 0 ? response.entry[0] : null : null,
            jwt: response.jwt
        };
    }
    
}

const Practitionerlogin = async (id, identifier) => {
    const url = `${API_HOST}/api/Practitionerlogin?username=${id}&password=${identifier}`;
    const response = await usePost(url, API_HEADERS);
    console.log(response);
    //console.log(response.total);
    if (response.total == null){
        return {
            success : false,
            data : null,
            jwt : null
        };
    }else{
        return {
            success: response ? response.total > 0 : false,
            data: response ? response.entry.length > 0 ? response.entry[0] : null : null,
            jwt: response.jwt
        };
    }
    
}
const getPersonById = async (id) => {
    const url = `${FHIR_BASE}/Person/${id}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    console.log(response);
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        data: success ? response : null
    };
}

const createPerson = async (data) => {
    

    const url = `${API_HOST}/api/registerPerson`;
    const response = await usePost(url, API_HEADERS, JSON.stringify(data));
    console.log(response);
    if (response.data !=undefined){
        return {
            success: false,
            msg: "註冊失敗" + response.msg,
            data: response
        };
    }else{
        const success = response ? response.data && response.data.length > 0 && response.data.code === "200" ? false : true : false;
        return {
            success: success,
            msg: success ? "註冊成功" : "註策失敗",
            data: response
        };
    }
    
}

const createPatient = async (data) => {
    

    const url = `${API_HOST}/api/registerPatient`;
    const response = await usePost(url, API_HEADERS, JSON.stringify(data));
    console.log(response);
    if (response.data !=undefined){
        return {
            success: false,
            msg: "註冊失敗" + response.msg,
            data: response
        };
    }else{
        const success = response ? response.data && response.data.length > 0 && response.data.code === "200" ? false : true : false;
        return {
            success: success,
            msg: success ? "註冊成功" : "註策失敗",
            data: response
        };
    }
    
}

const createPatientAndID = async (data,id) => {
    

    const url = `${FHIR_BASE}/Patient/${id}`;
API_HEADERS.Authorization = localStorage.getItem('token');
const response = await usePut(url, API_HEADERS, JSON.stringify(data));
    if (response.data !=undefined){
        return {
            success: false,
            msg: "新增失敗" + response.msg,
            data: response
        };
    }else{
        const success = response ? response.data && response.data.length > 0 && response.data.code === "200" ? false : true : false;
        return {
            success: success,
            msg: success ? "新增成功" : "新增失敗",
            data: response
        };
    }
    
}

const createFHIR2PatientAndID = async (data,id) => {
    

    const url = `${FHIR_BASE2}/Patient/${id}`;
API_HEADERS.Authorization = localStorage.getItem('token');
const response = await usePut(url, API_HEADERS, JSON.stringify(data));
    if (response.data !=undefined){
        return {
            success: false,
            msg: "新增失敗" + response.msg,
            data: response
        };
    }else{
        const success = response ? response.data && response.data.length > 0 && response.data.code === "200" ? false : true : false;
        return {
            success: success,
            msg: success ? "新增成功" : "新增失敗",
            data: response
        };
    }
    
}


const createFHIRPatient = async (data) => {
    

    const url = `${API_HOST2}/api/registerPatient`;
    const response = await usePost(url, API_HEADERS, JSON.stringify(data));
    console.log(response);
    if (response.data !=undefined){
        return {
            success: false,
            msg: "註冊失敗" + response.msg,
            data: response
        };
    }else{
        const success = response ? response.data && response.data.length > 0 && response.data.code === "200" ? false : true : false;
        return {
            success: success,
            msg: success ? "註冊成功" : "註策失敗",
            data: response
        };
    }
    
}

const createPractitioner = async (data) => {
    

    const url = `${API_HOST}/api/regPractioner`;
    const response = await usePost(url, API_HEADERS, JSON.stringify(data));
    //console.log(response);
    if (response.data !=undefined){
        return {
            success: false,
            msg: "註冊失敗" + response.msg,
            data: response
        };
    }else{
        const success = response ? response.data && response.data.length > 0 && response.data.code === "200" ? false : true : false;
        return {
            success: success,
            msg: success ? "註冊成功" : "註策失敗",
            data: response
        };
    }
    
}

const createPersonAndPractitioner = async (data) => {
    

    const url = `${API_HOST}/api/createAccount`;
    const response = await usePost(url, API_HEADERS, JSON.stringify(data));
    if (response.data.code !=undefined && response.data.code==400){
        return {
            success: false,
            msg: "註冊失敗" + response.msg,
            data: response
        };
    }else{
        const success = response ? response.data && response.data.length > 0 && response.data.code === "200" ? false : true : false;
        return {
            success: success,
            msg: success ? "註冊成功" : "註策失敗",
            data: response
        };
    }
    
}
//https://fhir.tcumi.com:52443/hapi66/fhir/Observation 回傳Observation 的json, 根本沒有issue, 所以一定會成立issue==undefined, 之前不知道執行哪一段讓我寫加入這段code的判斷
const createFHIRResource = async (myresource, data) => {
    

    const url = `${FHIR_BASE}/${myresource}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await usePost(url, API_HEADERS, JSON.stringify(data));
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        msg: success ? "資料新增成功" : "資料新增失敗",
        data: response
    };
}
const createFHIR2Resource = async (myresource, data) => {
    

    const url = `${FHIR_BASE2}/${myresource}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await usePost(url, API_HEADERS, JSON.stringify(data));
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        msg: success ? "資料新增成功" : "資料新增失敗",
        data: response
    };
}


const createDocumentReference = async (myform) => {
    
    const url = `${API_HOST}/api/postDR` ;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await usePost(url, API_UP_HEADERS, myform);
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        msg: success ? "資料(DocumentReference)建立成功" : "資料(DocumentReference)建立失敗",
        data: response
    };
}

const createOrganization = async (data) => {
    

    const url = `${FHIR_BASE}/Organization`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await usePost(url, API_HEADERS, JSON.stringify(data));
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        msg: success ? "組織建立成功" : "組織建立失敗",
        data: response
    };
}

const uploadDocumentReference = async (patientID, encounterID, attachment, note, now, organizationID = "Org-1145010010") => {
    const data = {
        "resourceType": "DocumentReference",
        "status": "current",
        "type": {
            "coding": [{
                "system": "http://example.org/coding-system",
                "code": "note",
                "display": "Clinical Note"
            }]
        },
        "subject": {
            "reference": "Patient/" + patientID
        },
        "period": {
            "start": now,
            "end": now
        },
        "date": now,
        "content": [{
            "attachment": {
                "contentType": "text/plain",
                "url": attachment
            },
            "profile": [{
                "valueCoding": {
                    "system": "http://example.org/coding-system",
                    "code": "note-profile",
                    "display": "Clinical Note Profile"
                },
                "valueUri": "http://example.org/profiles/note-profile"
            }]
        }],
        "custodian": {
            "reference": "Organization/" + organizationID
        }
    };

    if (encounterID) {
        data.context = [{
            "reference": "Encounter/" + encounterID
        }];
    }

    const url = `${FHIR_BASE}/DocumentReference`;
    const response = await usePost(url, API_HEADERS, JSON.stringify(data));
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        msg: success ? "上傳成功" : "上傳失敗",
        data: response
    };
}

const getDocumentReferenceByCondition = async (patient, organizationID, start, end) => {
    let url = `${FHIR_BASE}/DocumentReference?date=ge${start}&date=le${end}`;
    if (patient) {
        url += `&subject=${patient.id}`;
    }
    if (organizationID && organizationID !== "all") {
        url += `&custodian=${organizationID}`;
    }

    const response = await useGet(url, API_HEADERS);
    const success = response ? true : false;
    let datas = [];
    if (success && response.total > 0) {
        for (let i in response.entry) {
            let documentReference = response.entry[i].resource;
            let patientId = documentReference.subject.reference.split('/')[1];
            let name = "";
            if (patient) {
                name = patient.name[0].text;
            } else {
                let response2 = await getPatientById(patientId);
                let patient = response2.success && response2.data ? response2.data : null;
                name = patient ? patient.name[0].text : "查無此人";
            }

            let organizationID = documentReference.custodian ? documentReference.custodian.reference.split('/')[1] : null;
            let organization = null;
            if (organizationID) {
                let response3 = await getOrganizationById(organizationID);
                organization = response3.success && response3.data ? response3.data : null;
            }
            datas.push({
                id: documentReference.id,
                patientId,
                name: name,
                time: documentReference.date.split('T')[0].replace(/-/g, "/") + " " + documentReference.date.split('T')[1].split('.')[0].substring(0, 5),
                organization,
                note: "",
                attachment: documentReference.content.length > 0 ? documentReference.content[0].attachment.url : null
            });
        }
    }

    return {
        success: true,
        data: datas
    };
}
//用reponse.entry 如果沒有查到資料不會回傳entry node
const getOrganizationByName = async (name) => {
    const url = `${FHIR_BASE}/Organization?name=${name}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.total > 0 : false,
        data: response ? response.total > 0 ? response.entry[0].resource : null : null
    };
}

const getRemoteFHIRResourceById = async (resource) => {
    const url = `${FHIR_BASE2}/`+resource;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        data: success ? response : null
    };
}

const getFHIRResourceById = async (resource) => {
    const url = `${FHIR_BASE}/`+resource;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        data: success ? response : null
    };
}
const getFHIRResource = async (resource) => {
    const url = `${FHIR_BASE}/`+resource;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.total > 0 : false,
        data: response ? response.entry.length > 0 ? response.entry : null : null
    };
    
}
//連到另一台FHIR SERFVER
const getFHIR2Resource = async (resource) => {
    const url = `${FHIR_BASE}/`+resource;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.total > 0 : false,
        data: response ? response.entry.length > 0 ? response.entry : null : null
    };
    
}


//用reponse.entry 如果沒有查到資料不會回傳entry node
const getFHIRResourceByIdentifier = async (resource, id) => {
    const url = `${FHIR_BASE}/${resource}?identifier=${id}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.total > 0 : false,
        data: response ? response.total > 0 ? response.entry[0].resource : null : null
    };
}

const getDocumentReferneceByContext = async ( myreference) => {
    const url = `${FHIR_BASE}/DocumentReference?context=${myreference}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.total > 0 : false,
        data: response ? response.total > 0 ? response.entry[0].resource : null : null
    };
}
const getOrganization = async () => {
    const url = `${FHIR_BASE}/Organization`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.total > 0 : false,
        data: response ? response.entry.length > 0 ? response.entry : null : null
    };
}


const getOrganizationByQueryId = async (id) => {
    const url = `${FHIR_BASE}/Organization?_id=${id}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    return {
        success: response ? response.total > 0 : false,
        data: response ? response.entry.length > 0 ? response.entry[0].resource : null : null
    };
}

const getOrganizationById = async (id) => {
    const url = `${FHIR_BASE}/Organization/${id}`;
    API_HEADERS.Authorization = localStorage.getItem('token');
    const response = await useGet(url, API_HEADERS);
    const success = response ? response.issue && response.issue.length > 0 && response.issue[0].severity === "error" ? false : true : false;
    return {
        success: success,
        data: success ? response : null
    };
}

const uploadFileToStorage = async (file) => {
    let formdata = new FormData();
    formdata.append("FileDetails", file, file.name);

    const url = `https://example.com/api/Files/PostSingleFile`;
    const response = await usePost(url, {}, formdata);
    const success = response.isSuccess ? true : false;
    const attachment = success ? response.message : null;
    return {
        success: success,
        msg: success ? "上傳成功" : "上傳失敗",
        data: attachment
    };
}

const myuuid = async () => {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  

