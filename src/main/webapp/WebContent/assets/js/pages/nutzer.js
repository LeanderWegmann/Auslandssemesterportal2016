$(document).ready(function () {
    // Click-Listener für Userverwaltung User anzeigen lassen
    $('.btnUser').on('click', function () {
        var id = $(this).attr('id');

        var rolle = 0;
        var typ = '';
        if (id === 'userStudShow') {
            rolle = 3;
            typ = "Studierende";
        } else if (id === 'userMaShow') {
            rolle = 2;
            typ = "Auslandsmitarbeiter";
        } else if (id == 'userSGLShow'){
        	rolle = 4;
        	typ = "Studiengangsleiter";
        }
        $.ajax({
            type: "GET", 
            url: baseUrl + "/getUser",
            data: {
                rolle: rolle,
            },
            success: function (result) {
                var auslesen = result.data;
                if (rolle === 2) {
                    var tabelle = '<h2>Registrierte ' + typ +
                        '</h2><table id="userTable" class="table table-striped table-bordered"> <thead><tr class="titleRow"><th>Vorname</th><th>Nachname</th><th>Email</th><th>Telefonnummer</th><th>Mobilfunknummer</th><th></th><th></th></tr></thead>';
                    for (var i = 0; i < auslesen.length; i++) {
                        var row = auslesen[i];

                        tabelle = tabelle +
                            '<tr id="row' + i +
                            '"><td class="vorname">' +
                            row.vorname +
                            '</td><td class="nachname">' +
                            row.nachname +
                            '</td><td class="email">' +
                            row.email +
                            '</td><td class="telnummer">' +
                            row.tel +
                            '</td><td class="mobil">' +
                            row.mobil +
                            '</td><td><span class="btn glyphicon glyphicon-edit useredit-button" id="edit' + i +
                            '" title="Bearbeiten" data-toggle="modal" href="#userEdit"> </span></td>' +
                            '<td><span class="btn glyphicon glyphicon-trash deleteAAA-button" data-mail="' +
                            row.email +
                            '" id="delete' + i +
                            '" title="Löschen"></span></td></tr>';
                    }
                } else if (rolle === 3) {
                    var tabelle = '<h2>Registrierte ' +
                        typ +
                        '</h2><table id="userTable" class="table table-striped table-bordered"><thead><tr class="titleRow"><th>Vorname</th><th>Nachname</th><th>Email</th><th>DHBW Standort</th><th>Studiengang</th><th>Kurs</th><th>Matrikelnummer</th><th></th><th></th></tr></thead>';

                    for (var i = 0; i < auslesen.length; i++) {
                        var row = auslesen[i];
                        tabelle = tabelle +
                            '<tr id="row' + i +
                            '"><td class="vorname">' +
                            row.vorname +
                            '</td><td class="nachname">' +
                            row.nachname +
                            '</td><td class="email">' +
                            row.email +
                            '</td><td>' +
                            row.standort +
                            '<td class="studgang">' +
                            row.studiengang +
                            '</td><td class="kurs">' +
                            row.kurs +
                            '</td><td class="matrikelnr">' +
                            row.matrikelnummer +
                            '</td><td><span class="btn glyphicon glyphicon-edit useredit-button" id="edit' +
                            i +
                            '" title="Bearbeiten" data-toggle="modal" href="#userEdit"> </span></td><td><span class="btn glyphicon glyphicon-trash delete-button" data-matrikel="' + row.matrikelnummer + '" id="delete' +
                            i +
                            '" title="Löschen"></span></td></tr>';
                    }
                }
                else if (rolle === 4) {
                    var tabelle = '<h2>Registrierte ' +
                        typ +
                        '</h2><table id="userTable" class="table table-striped table-bordered"><thead><tr class="titleRow"><th>Vorname</th><th>Nachname</th><th>Email</th><th>DHBW Standort</th><th>Studiengang</th><th>Kurs</th><th>Matrikelnummer</th><th></th><th></th></tr></thead>';

                    for (var i = 0; i < auslesen.length; i++) {
                        var row = auslesen[i];
                        tabelle = tabelle +
                            '<tr id="row' + i +
                            '"><td class="vorname">' +
                            row.vorname +
                            '</td><td class="nachname">' +
                            row.nachname +
                            '</td><td class="email">' +
                            row.email +
                            '</td><td>' +
                            row.standort +
                            '<td class="studgang">' +
                            row.studiengang +
                            '</td><td class="kurs">' +
                            row.kurs +
                            '</td><td><span class="btn glyphicon glyphicon-edit useredit-button" id="edit' +
                            i +
                            '" title="Bearbeiten" data-toggle="modal" href="#userEdit"> </span></td><td><span class="btn glyphicon glyphicon-trash delete-button" data-matrikel="' + row.matrikelnummer + '" id="delete' +
                            i +
                            '" title="Löschen"></span></td></tr>';
                    }
                }    
                tabelle = tabelle + '</table>';
                $('#userTabelle').html(tabelle)
                var nonSortable = (rolle == 3 ? [7, 8] : [5, 6]);

                var setClickListeners = function () {
                    $('.delete-button').click(function () {
                        var self = $(this);

                        swal({
                            title: "Bist du sicher?",
                            text: "Der User kann nicht wiederhergestellt werden!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Löschen!"
                        }).then((result) => {
                            if (result.value) {
                                alert("Du hast auf Löschen gedrückt");
                            	swal({
                                    title: 'Lösche User'
                                });
                                swal.showLoading();
                                $.ajax({
                                    type: "GET",
                                    url: baseUrl + "/user/delete",
                                    data: {
                                        matrikelnummer: self.data('matrikel')
                                    },
                                    success: function (result) {
                                        swal.close();
                                        $('#userStudShow').click();
                                        swal('Gelöscht!', 'Der User wurde erfolgreich gelöscht.', 'success');
                                    },
                                    error: function (result) {
                                        swal.close();
                                        swal('Fehler', 'Der User konnte nicht gelöscht werden', 'error');
                                    }
                                });
                            }
                        });

                    });

                    $('.deleteAAA-button').click(function () {

                        var self = $(this);

                        swal({
                            title: "Bist du sicher?",
                            text: "Der User kann nicht wiederhergestellt werden!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Löschen!"
                        }).then((result) => {
                            if (result.value) {
                                swal({
                                    title: 'Lösche User'
                                });
                                swal.showLoading();
                                $.ajax({
                                    type: "POST",
                                    url: baseUrl + "/user/deleteAAA",
                                    data: {
                                        mail: self.data('mail')
                                    },
                                    success: function (result) {
                                        swal.close();
                                        $('#userMaShow').click();
                                        swal('Gelöscht!', 'Der User wurde erfolgreich gelöscht.', 'success');
                                    },
                                    error: function (result) {
                                        swal.close();
                                        swal('Fehler', 'Der User konnte nicht gelöscht werden', 'error');
                                    }
                                });
                            }
                        });

                    });

                    $('.useredit-button').click(function () {
                        var id = $(this).attr('id');
                        var laenge = id.length;
                        if (laenge === 5) {
                            id = id.substring(4, 5);
                        } else {
                            id = id.substring(4, 6);
                        }
                        $('#inEditVorname').val($('#row' + id).children('.vorname').text().trim());
                        $('#inEditVorname').attr('data-value', $('#inEditVorname').val());
                        $('#inEditNachname').val($('#row' + id).children('.nachname').text().trim());
                        $('#inEditNachname').attr('data-value', $('#inEditNachname').val());
                        $('#inEditEmail').val($('#row' + id).children('.email').text().trim());
                        $('#inEditEmail').attr('data-value', $('#inEditEmail').val());
                        $('#inEditEmail').attr('data-role', rolle);
                        $('#inEditTel').val($('#row' + id).children('.telnummer').text().trim());
                        $('#inEditTel').attr('data-value', $('#inEditTel').val());
                        $('#inEditMobil').val($('#row' + id).children('.mobil').text().trim());
                        $('#inEditMobil').attr('data-value', $('#inEditMobil').val());
                        $('#inEditStudgang').val($('#row' + id).children('.studgang').text().trim());
                        $('#inEditStudgang').attr('data-value', $('#inEditStudgang').val());
                        $('#inEditKurs').val($('#row' + id).children('.kurs').text().trim());
                        $('#inEditKurs').attr('data-value', $('#inEditKurs').val());
                        $('#inEditMatnr').val($('#row' + id).children('.matrikelnr').text().trim());
                        $('#inEditMatnr').attr('data-value', $('#inEditMatnr').val());
                        if (rolle === 2) {
                            $('#inEditTel').show();
                            $('#inEditMobil').show();
                            $('#inEditStudgang').hide();
                            $('#inEditKurs').hide();
                            $('#inEditMatnr').hide();
                        } else {
                            $('#inEditTel').hide();
                            $('#inEditMobil').hide();
                            $('#inEditStudgang').show();
                            $('#inEditKurs').show();
                            $('#inEditMatnr').show();
                        }
                        $('.nutzerBearbeiten').show();
                    });
                };

                $('#userTable').DataTable({
                    "columnDefs": [{
                        "orderable": false,
                        "targets": nonSortable
                    }],
                    "drawCallback": function (settings) {
                        setClickListeners();
                    }
                });
            },
            error: function (result) {
                swal({
                    title: "Serverfehler",
                    text: "Die Serververbindung wurde unterbrochen. Bitte laden Sie die Seite erneut",
                    type: "error",
                    confirmButtonText: "OK"
                });
            }
        });

    });

    $('#AAACreateForm').submit(function (event) {
        var email = $('#AAAMail').val();
        var vname = $('#AAAVorname').val();
        var nname = $('#AAANachname').val();
        var phone = $('#AAAPhone').val();
        var mobil = $('#AAAMobile').val();
        swal({
            title: 'Speichere Änderungen'
        });
        swal.showLoading();
        $.ajax({
            type: "POST",
            url: baseUrl + "/createAAA",
            data: {
                email: email,
                vorname: vname,
                nachname: nname,
                phone: phone,
                mobil: mobil
            },
            success: function (data) {
                swal.close();
                if (data == "mailError") {

                    swal({
                        title: "Fehler!",
                        text: "Ein Account mit dieser Mail existiert bereits! Bitte benutzen Sie eine andere.",
                        type: "error",
                        confirmButtonText: "OK"
                    });

                } else if (data == "No account registered for this email adress") {
                    swal({
                        title: "Fehler!",
                        text: "Es ist ein Fehler beim Erstellen des Accounts aufgetreten. Versuchen Sie es später erneut.",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                } else if (data == "registerError") {
                    swal({
                        title: "Fehler!",
                        text: "Es ist ein Fehler beim Erstellen des Accounts aufgetreten. Versuchen Sie es später erneut.",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                } else {
                    swal({
                        title: "Account erfolgreich erstellt",
                        text: "An die Mailadresse wurde ein Link zum setzen des Passwords geschickt.",
                        type: "success",
                        confirmButtonText: "OK"
                    });

                }
                $('#AAACreate').modal('hide');
                $('#userMaShow').click();
            }

        });

        event.preventDefault();
    });
    
    $('#SGLCreateForm').submit(function (event) {
        var email = $('#SGLMail').val();
        var vname = $('#SGLVorname').val();
        var nname = $('#SGLNachname').val();
        var studiengang = $('#SGLStudiengang').val();
        var phone = $('#SGLPhone').val();
        var mobil = $('#SGLMobile').val();
        swal({
            title: 'Speichere Änderungen'
        });
        swal.showLoading();
        $.ajax({
            type: "POST",
            url: baseUrl + "/createSGL",
            data: {
                email: email,
                vorname: vname,
                nachname: nname,
                phone: phone,
                mobil: mobil
            },
            success: function (data) {
                swal.close();
                if (data == "mailError") {

                    swal({
                        title: "Fehler!",
                        text: "Ein Account mit dieser Mail existiert bereits! Bitte benutzen Sie eine andere.",
                        type: "error",
                        confirmButtonText: "OK"
                    });

                } else if (data == "No account registered for this email adress") {
                    swal({
                        title: "Fehler!",
                        text: "Es ist ein Fehler beim Erstellen des Accounts aufgetreten. Versuchen Sie es später erneut.",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                } else if (data == "registerError") {
                    swal({
                        title: "Fehler!",
                        text: "Es ist ein Fehler beim Erstellen des Accounts aufgetreten. Versuchen Sie es später erneut.",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                } else {
                    swal({
                        title: "Account erfolgreich erstellt",
                        text: "An die Mailadresse wurde ein Link zum setzen des Passwords geschickt.",
                        type: "success",
                        confirmButtonText: "OK"
                    });

                }
                $('#SGLCreate').modal('hide');
                $('#userSGLShow').click();
            }

        });

        event.preventDefault();
    });
    

    
    $('#btnUserEditSave').click(function () {
		var dataMail = $('#inEditEmail').val();
		var dataOldMail = "0";
		var dataRole = $('#inEditEmail').attr('data-role');
		var dataNewVorname = $('#inEditVorname').val();
		var dataNewNachaname = $('#inEditNachname').val();
		var dataNewTel = $('#inEditTel').val();
		var dataNewMobil = $('#inEditMobil').val();
		var dataNewStudgang = $('#inEditStudgang').val();
		var dataNewKurs = $('#inEditKurs').val();
		var dataNewMatnr = $('#inEditMatnr').val();
		if ($('#inEditEmail').attr('data-value') != $('#inEditEmail').val()) {
			var dataOldMail = $('#inEditEmail').attr('data-value');
		}
		swal({
			title: 'Speichere Änderungen'
		});
		swal.showLoading();
		if (dataRole == "2") {
			$.ajax({
				type: "POST",
				url: baseUrl + "/user/update",
				data: {
					email: dataMail,
					oldmail: dataOldMail,
					vorname: dataNewVorname,
					nachname: dataNewNachaname,
					tel: dataNewTel,
					mobil: dataNewMobil,
					role: "2"
				},
				success: function (result) {
					swal.close();
					swal('Erfolgreich geändert.', 'Die Mitarbeiterdaten wurden aktualisiert.', 'success');
					$('#userEdit .close').click();

					$('#userMaShow').click();


				},
				error: function (result) {
					swal.close();
					swal('Fehler', 'Es ist ein Fehler beim Aktualisieren aufgetreten. Überprüfen Sie die Eingaben.', 'error');
				}
			});
		} else {
			$.ajax({
				type: "POST",
				url: baseUrl + "/user/update",
				data: {
					email: dataMail,
					oldmail: dataOldMail,
					vorname: dataNewVorname,
					nachname: dataNewNachaname,
					studgang: dataNewStudgang,
					kurs: dataNewKurs,
					matnr: dataNewMatnr,
					role: "3"
				},
				success: function (result) {
					swal.close();
					swal('Erfolgreich geändert.', 'Die Benutzerdaten wurden aktualisiert.', 'success');
					$('#userEdit .close').click();
					$('#userStudShow').click();


				},
				error: function (result) {
					swal.close();
					swal('Fehler', 'Es ist ein Fehler beim Aktualisieren aufgetreten. Überprüfen Sie die Eingaben.', 'error');
				}
			});
		}

	});
});