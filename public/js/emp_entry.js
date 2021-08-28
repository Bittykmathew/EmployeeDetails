jQuery(document).ready(function () {

	$("#submit").click(function () {
		jQuery("#empEntryForm").validate({
			rules: {
				empid: 'required',
				fname: 'required',
				username: 'required',
				place: 'required'
			},
			messages: {
				empid: 'This field is required',
				fname: 'This field is required',
				username: 'This field is required',
				place: 'This field is required'
			},

			submitHandler: function (form) {
				form.submit();
				$('#empEntryForm').attr('action', '/addEmp');
			}
		});
	});

	// $.ajax({
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	url: 'http://localhost:8080/getEmpList',
	// 	headers: {
	// 		'X-AT-SessionToken': localStorage.sessionToken
	// 	}
	// }).done(function (response) {

	// 	if ($("#table-form tbody").length == 0) {
	// 		$("#table-form").append("<tbody></tbody>");
	// 	}

	// 	$.each(response, function (i, item) {
	// 		var row = '<tr>';
	// 		row += '<td>' + item.emp_id + '</td>';
	// 		row += '<td>' + item.emp_name + '</td>';
	// 		row += '<td>' + item.user_name + '</td>';
	// 		row += '<td>' + item.place + '</td>';
	// 		row += '<td></td>';
	// 		row += '</tr>';
	// 		$('#table-form tbody').append(row);
	// 	});

	var dataTableOption = {
		dom: 'Bfrtip', //'<"top-filters-3"lBf><"table-body"rt><"bottom-filters-2"ip>', //'Bfrtip',
		buttons: [
			{ "extend": 'copy' },
			{ "extend": 'csv' },
			{ "extend": 'print' },
			{ "extend": 'excel', "title": 'emp' },
			{
				"extend": 'pdfHtml5',
				"orientation": 'landscape',
				"pageSize": 'A3'
			}
		],
		scrollY: '20vh',
		scrollCollapse: true,
		paging: false,
		order: [[0, "asc"]],
		columns: [
			{ "data": "emp_id" },
			{ "data": "emp_name" },
			{ "data": "user_name" },
			{ "data": "place" }
		]
	}

	$('#table-form').DataTable({
		"ajax": {
			"type": 'GET',
			"dataType": 'json',
			"url": 'http://localhost:8080/getEmpList',
			"dataSrc": "response"
		},
		"dom": '<"top-filters-3"lBf><"table-body"rt><"bottom-filters-2"ip>',
		"buttons": [
			$.extend(true, {}, {}, { extend: 'copy' }),
			$.extend(true, {}, {}, {
				extend: 'excelHtml5',
				title: 'Emp'
			})
		],
		"scrollY": '20vh',
		"scrollCollapse": true,
		"columns": [
			{ "data": "emp_id" },
			{ "data": "emp_name" },
			{ "data": "user_name" },
			{ "data": "place" },
			{
				"data": "emp_id", "orderable": false, "render": function (data, type, full, meta) {
					let buttons = '';
					buttons += '<button ' + '" data-emp_id="' + full.emp_id + '" class="edit">Edit</button> &nbsp;';
					return buttons;
				}
			}
		]
	});
	$('#table-form').DataTable(dataTableOption);
	$('#table-form').on('click', '.edit', function (e) {
		e.preventDefault();
		var ele = $(this);
		var id = ele.data('emp_id');

		$.ajax({
			type: 'GET',
			url: 'http://localhost:8080/getEmpDet/' + id
		}).done(function (response) {
			$('#empEntryForm').attr('action', '/updateEmp');
			$('#empEntryForm').attr('method', 'PUT');
			if (response.success === true) {
				$('#empid').val(response.emp.emp_id);
				$('#fname').val(response.emp.emp_name);
				$('#username').val(response.emp.user_name);
				$('#place').val(response.emp.place);
			} else {
				alert(response.message || response.error);
			}
		});
	});

});