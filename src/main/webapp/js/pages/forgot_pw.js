$(document).ready(function() {
	$(document).on('click', '#resetPassword', function() {
		resetpw();
	})
});

function resetpw() {
	var mail = $('#mail').val();
	$.ajax({
		type : "POST",
		url : baseUrl + "/resetPassword",
		data : {
			email: mail
		},
		success : function(result) {
			Swal.fire({
				title : "Kennwort zurückgesetzt",
				text : "Falls diese Mailadresse uns bekannt ist, erhalten Sie eine Mail mit einem Link zum zurücksetzen des Passworts",
				icon : "success",
				confirmButtonText : "Ok"
			}).then(function(result) {
				location.href = 'index.jsp';
			});
		},
		error : function(result) {
			Swal.fire('Diese Mailadresse ist uns nicht bekannt');
		}
	});
}