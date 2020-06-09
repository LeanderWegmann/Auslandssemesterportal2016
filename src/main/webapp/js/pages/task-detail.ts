import {$,baseUrl} from "../config";
import "../app";
import Swal from "sweetalert2";
import "bootstrap";
// @ts-ignore
require("jquery-validation")($);
// @ts-ignore
require("jquery-validation/dist/localization/messages_de.min");

let instanceID : any;
let url;
let typeList : any;
let verify;
let idList : any;
let sendBew : any;
let processDefinition : any;
let step_id;
let stepName;
let visibleStepName;
let validateString : any;
let grund : any;
let resultString : any;
let data : any;
let dis : any;

$(document).ready(function () {
    createEventListeners();
    idList = [];
    typeList = [];
    url = new URL(window.location.href);
    instanceID = url.searchParams.get("instance_id");
    verify = url.searchParams.get("verify");
    sendBew = url.searchParams.get("send_bew");
    let uni = url.searchParams.get("uni");
    if (!(verify === "true")) {
        if (!(sendBew === "true")) {
            $('#saveChanges').hide();
        }
        $('#validate').hide();
        $('#nav2').hide();
    } else {
        $('#saveChanges').hide();
        $('#nav3').hide();
    }
    $('#Sonstige Angaben').hide();
    $('#reason').hide();
    $('#reasonl').hide();
    $('#validateBtn').prop('disabled', true);


    $.ajax({
        type: "GET",
        url: baseUrl + "/currentActivity",
        data: {
            instance_id: instanceID,
            uni: uni
        },
        success: function (result) {
            step_id = result.active;
            processDefinition = result.data;
            parse();
        }
    });
    
});

function manipulateDOM() {
    $("[id='Sonstige Angaben']").hide();
}

function createEventListeners(){
    document.getElementById("saveChanges")?.addEventListener("click", saveChanges);
    document.getElementById("validateBtn")?.addEventListener("click", validateBew);
    $("body").on("change","#validierungErfolgreich",{"param": document.getElementById("validierungErfolgreich")}, (event) => {change(event.data.param)});
    document.getElementById("backbutton")?.addEventListener("click", () => location.href='task_overview.html');
}

function parse() {
    let output = "";
    $.ajax({
        type: "GET",
        url: baseUrl + "/getOverview",
        data: {
            instance_id: instanceID,
            definition: processDefinition
        },
        success: function (result) {
            let steps = result.data;
            output = output +
                '<div class="" id="accordion">';
            for (let k = 0; k < steps.length; k++) {
                data = steps[k].data;
                stepName = steps[k].activity;

                if (data.search("id") != -1) {
                    let innerOutput = "";
                    let json = JSON.parse(decodeURI(data));
                    for (let i = 0; i < json.length; i++) {
                        let type = json[i]["type"];
                        let req;
                        // alert (type);
                        switch (type) {
                            case "form-select":
                                req = "";
                                if (json[i]["data"]["required"] == true) {
                                    req = ' required';
                                    dis = ' disabled';
                                }
                                innerOutput = innerOutput +
                                    '<div class="form-group"><label class="col-sm-2 control-label">' +
                                    json[i]["data"]["label"] +
                                    '</label><div class="col-sm-10"><select class="form-control" id="' +
                                    json[i]["data"]["id"] + '"' + req + dis + ' name="' + json[i]["data"]["id"] + '"' +
                                    '>';
                                for (let j = 0; j < json[i]["data"]["values"].length; j++) {
                                    innerOutput = innerOutput + '<option>' +
                                        json[i]["data"]["values"][j] +
                                        '</option>';
                                }
                                innerOutput = innerOutput + '</select></div></div>';
                                idList.push(json[i]["data"]["id"]);
                                typeList.push("text");
                                break;
                            case "form-text":
                                req = "";
                                if (json[i]["data"]["required"] == true) {
                                    req = ' required';
                                }
                                innerOutput = innerOutput +
                                    '<div class="form-group"><label class="col-sm-2 control-label">' +
                                    json[i]["data"]["label"] +
                                    ' </label><div class="col-sm-10"><input class="form-control" type="' +
                                    json[i]["data"]["type"] +
                                    '" id="' + json[i]["data"]["id"] +
                                    '"' + req + ' name="' + json[i]["data"]["id"] + '"' +'></div></div>';
                                idList.push(json[i]["data"]["id"]);
                                typeList.push(json[i]["data"]["type"]);
                                break;
                            case "form-checkbox":
                                innerOutput = innerOutput +
                                    '<div class="form-group"><div class="col-sm-offset-2 col-sm-10"><div class="checkbox"><label><input type="checkbox" id="' +
                                    json[i]["data"]["id"] +  '" disabled' + ' name="' + json[i]["data"]["id"] + '"' + '> ' +
                                    json[i]["data"]["label"] +
                                    ' </label></div></div></div>';
                                idList.push(json[i]["data"]["id"]);
                                typeList.push("boolean");
                                break;
                            case "form-upload":
                                break;
                        }
                    }

                    if (innerOutput != '') {
                        if (stepName === "datenEingeben") {
                            visibleStepName = "Persönliche Daten";
                        } else if (stepName === "datenEingebenUnt") {
                            visibleStepName = "Partnerunternehmen";
                        } else if (stepName === "Task_1jq3nab") {
                            visibleStepName = "Semesteranschrift";
                        } else if (stepName === "englischNotePruefen") {
                            visibleStepName = "Notenpunkte im Abitur";
                        } else {
                            visibleStepName = "Sonstige Angaben";
                        }

                        output = output +
                            '<div class="card" id="'+visibleStepName+'"><div class="card-header"><h4 class="card-title"><a data-toggle="collapse" href="#collapse' +
                            k + '">' + visibleStepName + '</a></h4></div>'; // Header
                        // des
                        // Accordions
                        output = output +
                            ' <div id="collapse' +
                            k +
                            '" class="collapse show"><div class="card-body">'
                        output = output + innerOutput;
                        output = output + '</div></div></div><br>';
                    }
                }
            }

            output = output + '<div class="card"><div class="card-header"><h4 class="card-title"><a data-toggle="collapse" href="#collapse-downloads">Dateien</a></h4></div>'; // Header
            output = output +
                ' <div id="collapse-downloads" class="collapse show"><div class="card-body" id="downloadsBody">'
            output = output + '</div></div></div><br>';

            output = output + '</div>';
            document.getElementById("taskDetails")!.innerHTML = output;

            for (let k = 0; k < steps.length; k++) {
                data = steps[k].data;
                stepName = steps[k].activity;
                if (data.search("id") != -1) {
                    let json = JSON.parse(decodeURI(data));
                    for (let i = 0; i < json.length; i++) {
                        let type = json[i]["type"];
                        switch (type) {
                            case "form-upload":
                                let file = json[i];
                                getAccordionFile(file);
                                break;
                        }
                    }
                }
            }
            getData();
            manipulateDOM();

            // @ts-ignore
            $("#taskDetails").validate({
                debug: true
            });
        },
        error: function (result) {
            alert('Ein Fehler ist aufgetreten. Aktiver Schritt konnte nicht abgerufen werden.');
        }
    });
}

function getAccordionFile(file : any) {
    $.ajax({
        type: "HEAD",
        url: baseUrl + "/getProcessFile",
        data: {
            instance_id: instanceID,
            key: file["data"]["id"]
        },
        success: function (result) {
            $('#downloadsBody').append('<a href="' + baseUrl + '/getProcessFile?instance_id=' + instanceID + '&key=' +
                file["data"]["id"] + '" target="blank">' + file["data"]["filename"] + '</a><br />');
        }
    });
}

function getData() {
    let keyString = "";
    for (let l = 0; l < idList.length; l++) {
        keyString = keyString + idList[l] + "|";
    }
    keyString = keyString.substr(0, keyString.length - 1);

    $.ajax({
        type: "GET",
        url: baseUrl + "/getVariables",
        data: {
            instance_id: instanceID,
            key: keyString
        },
        success: function (result) {
            $.each(result, function (key : string, value : any) {
                $('#' + key).val(value);
                if(key === 'muttersprache' || key === 'semesteradresseAnders'){
                	$('#' + key).prop("checked", value);
//                	variableEnglishAndSemesteranschrift(key,value);
                }
                if (!(sendBew === "true")) {
                    $("#" + key).prop('readonly', true);
                }
            });
        },
        error: function (result) {
            alert('Ein Fehler ist aufgetreten');
        }
    });
}

function variableEnglishAndSemesteranschrift(key : string, value : any){
	if(key === 'muttersprache' && value === true){
		document.getElementById("Englischnote im Abitur in Punkten")?.remove();
	}else if(key === 'semesteradresseAnders' && value === false){
		document.getElementById("Semesteranschrift")?.remove();
	}
	
}

function saveChanges() {
    let form = $('#taskDetails');

    // @ts-ignore
    if (form && !form.valid()) {
        Swal.fire('Bitte füllen sie alle Felder korrekt aus.');
        return;
    }

    let keyString = "";
    let valString = "";
    let typeString = "";
    for (let j = 0; j < idList.length; j++) {
        if ($('#' + idList[j]).attr('type') == 'checkbox') {
            let checkedString = ((<any>document.getElementById(idList[j])).checked) ? 'true' :
                'false';
            keyString = keyString + idList[j] + "|";
            valString = valString + checkedString + "|";
            typeString = typeString + typeList[j] + "|";
        } else {
            keyString = keyString + idList[j] + "|";
            valString = valString + (<any>document.getElementById(idList[j])).value + "|";
            typeString = typeString + typeList[j] + "|";
        }
    }
    keyString = keyString.substr(0, keyString.length - 1);
    valString = valString.substr(0, valString.length - 1);
    typeString = typeString.substr(0, typeString.length - 1);
    Swal.fire({
            title: "Bewerbung absenden",
            text: "Wenn Du die Bewerbung abschickst, kannst Du keine Änderungen mehr vornehmen. Fortfahren?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Bewerbung absenden",
            cancelButtonText: "Abbrechen"
        }).then(function(result) {
        if(result.value) {
            $.ajax({
                type: "POST",
                url: baseUrl + "/sendNewApplicationMail",
                data: {
                    instance_id: instanceID
                },
                success: function (result) {
                    $.ajax({
                        type: "POST",
                        url: baseUrl + "/setVariable",
                        data: {
                            instance_id: instanceID,
                            key: keyString,
                            value: valString,
                            type: typeString
                        },
                        success: function (result) {
                            Swal.fire({
                                title: "Bewerbung eingereicht",
                                text: "Deine Bewerbung wurde eingereicht. Du erhältst möglichst Zeitnah eine Rückmeldung per Email",
                                icon: "success",
                                confirmButtonText: "Ok"
                            }).then(function (result) {
                                location.href = 'bewerbungsportal.html';
                            });
                        },
                        error: function (result) {
                            Swal.fire("Fehler", "Ein Fehler ist aufgetreten", "error");
                        }
                    });
                },
                error: function (result) {
                    console.error(result);
                }
            });
        }else{
            Swal.fire({
                title: "Abgebrochen",
                icon: "info",
                confirmButtonText: "Ok"
            }).then(() => location.href = 'bewerbungsportal.html');
        }
        });
}

function validateBew() {
    let form = $('#taskDetails');

    // @ts-ignore
    if (form && !form.valid()) {
        Swal.fire('Bitte füllen sie alle Felder korrekt aus.');
        return;
    }

    validateString = $('#validierungErfolgreich').val();
    grund = $('#reason').text();
    resultString = "";
    if (validateString === "true") {
        resultString = "bestätigen"
    } else if (validateString === "false"){
        resultString = "ablehnen"
    } else if (validateString === "edit"){
    	resultString = "zur Bearbeitung freigeben"
    }
    if (grund.indexOf("Platzhalter") < 0 ||
        grund.indexOf("--") < 0) {
        Swal.fire({
            title: "Platzhalter",
            text: "Mögliche Platzhalter im Email Text gefunden.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ignorieren",
            cancelButtonText: "Abbrechen"
        });
    } else {
        console.log('In der Nachricht wurden keine Platzhalter gefunden');
    }

    Swal.fire({
        title: "Bewerbung " + resultString,
        text: "Sind Sie sicher? Diese Aktion kann nicht rückgängig gemacht werden.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Bewerbung " + resultString,
        cancelButtonText: "Abbrechen"
    }).then(function (result) {
        if(result.value) {
            // hier mail einfügen -> neue Ajax
            $.ajax({
                type: "POST",
                url: baseUrl + "/setVariable",
                data: {
                    instance_id: instanceID,
                    key: 'validierungErfolgreich|mailText',
                    value: validateString + '|' + grund,
                    type: 'boolean|text'  //bei einem Fehler ersteres evtl. wieder zu boolean umändern.
                },
                success: function (result) {
                    Swal.fire({
                        title: "Bewerbung " + resultString,
                        text: "Gespeichert",
                        icon: "success",
                        confirmButtonText: "Ok"
                    }).then(function (result) {
                        location.href = 'task_overview.html';
                    });
                },
                error: function (result) {
                    alert('Ein Fehler ist aufgetreten');
                }
            });
        }else{
            Swal.fire({
                title: "Abgebrochen",
                icon: "info",
                confirmButtonText: "Ok"
            });
        }
    });

}

function change(obj : any) {
    let selectBox = obj;
    let selected = selectBox.options[selectBox.selectedIndex].value;

    if (selected === '') {
        $('#reason').hide();
        $('#reasonl').hide();
        $('#platzhalterInfo').hide();
        $('#validateBtn').prop('disabled', true);
    } else {
        $.ajax({
            type: "GET",
            url: baseUrl + "/getMailText",
            data: {
                instance_id: instanceID,
                validate: selected
            },
            success: function (result) {
                $('#reason').text(result);
                $('#validateBtn').prop('disabled', false);
                $('#reason').show();
                $('#reasonl').show();
                $('#platzhalterInfo').show();
            },
            error: function (result) {
                alert('Fehler beim Abrufen des Mailtextes');
            }
        });
    }
}