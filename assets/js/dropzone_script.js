$(document).ready(function () {
	//Dropzone Configuration
	// Dropzone.autoDiscover = true;
	temp = '<div class="dropzone_temp h-100 w-auto dz-clickable"><img src="assets/img/icon/attached.svg" class="attached_img" style="max-height: 70%;" alt="Upload File"><h5 class="h5">'+lang('upload_msg')+'</h5></div>';
	
	if ($("form.upload_member_attachments").length) {
		$('form.upload_member_attachments').html(temp);
		window.dp_member_attachments = new Dropzone('form.upload_member_attachments', { // define specific dropzone target
			url: "app/core.php",
			type: 'post',
			paramName: 'file',
			parallelUploads: 6,
			maxFilesize: 30,
			maxFiles: 6,
			uploadMultiple: true,
			acceptedFiles: "image/*,application/pdf,.psd,.docx,.xlsx", //    acceptedFiles: ".png,.jpg,.jpeg,.gif,.pdf",
			autoProcessQueue: false,
			addRemoveLinks: true,
			clickable: ".upload_member_attachments" + ", " + ".upload_member_attachments" +" > *",
			dictDefaultMessage: lang('upload_msg'),
	
			init: function () {
				this.on("successmultiple", function (file, response) {
					$(".dz-remove").fadeOut();
					def_alert(response ,1500);
				});
	
			},
	
		});
		}


	if ($("form.dropzone_brand_img").length) {
		$('form.dropzone_brand_img').html(temp);
		window.dp_brand_img = new Dropzone('form.dropzone_brand_img', { // define specific dropzone target
			url: "app/core.php",
			type: 'post',
			params: {
				'awesomeLotfyFW': "brand_profile_img",
				'brand_id': brand_id,

			},
			paramName: 'file',
			parallelUploads: 1,
			maxFilesize: 6,
			maxFiles: 1,
			// uploadMultiple: true,
			acceptedFiles: "image/jpeg,image/png,image/gif", //    acceptedFiles: ".png,.jpg,.jpeg,.gif,.pdf",
			autoProcessQueue: false,
			enqueueForUpload: false,
			addRemoveLinks: true,
			renderMethod: "prepend",
			clickable: ".dropzone_brand_img" + ", " + ".dropzone_brand_img" +" > *",

			init: function () {
				this.on("success", function (file, response) {
					$(".dz-remove").fadeOut();
					def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);

				});

			},

		});
	}
	
	if ($(".dropzone_attach_request").length) {
		$('.dropzone_attach_request').html(temp);
		window.dp_attach_request = new Dropzone('.dropzone_attach_request', {
			url: "app/core.php",
			type: 'post',
			paramName: 'file',
			parallelUploads: 6,
			maxFilesize: 30,
			maxFiles: 6,
			uploadMultiple: true,
			acceptedFiles: "image/*,application/pdf,.psd,.docx,.xlsx", //    acceptedFiles: ".png,.jpg,.jpeg,.gif,.pdf",
			autoProcessQueue: false,
			addRemoveLinks: true,
			clickable: '.dropzone_attach_request' + ", " + '.dropzone_attach_request' +" > *",
			dictDefaultMessage: lang('upload_msg'),
			init: function () {				
				this.on("successmultiple", function (file, response) {
					$('.dropzone_attach_request'+" .dropzone_temp").fadeOut();
					$(".dz-remove").fadeOut();
					def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);
				});
			},

		});
	}
	if ($("form.dropzone_profile_img").length) {
		$("form.dropzone_profile_img").html(temp);
		window.dp_profile_img = new Dropzone("form.dropzone_profile_img", { // define specific dropzone target
			url: "app/core.php",
			type: 'post',
			params: {
				'awesomeLotfyFW': "profile_img",
			},
			paramName: 'file',
			parallelUploads: 6,
			maxFilesize: 6,
			maxFiles: 1,
			uploadMultiple: false,
			acceptedFiles: "image/jpeg,image/png", //    acceptedFiles: ".png,.jpg,.jpeg,.gif,.pdf",
			autoProcessQueue: false,
			enqueueForUpload: false,
			addRemoveLinks: true,
			renderMethod: "prepend",
			clickable: "form.dropzone_profile_img" + ", " + "form.dropzone_profile_img" +" > *",
			dictDefaultMessage: lang('upload_msg'),
			init: function () {
				this.on("success", function (file, response) {
					$(".dz-remove").fadeOut();
					$("form.dropzone_profile_img"+" .dropzone_temp").fadeOut();
					def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);
				});
			},
		});
	}

	if ($(".attach_all_memebers_excel").length) {
		$(".attach_all_memebers_excel").html(temp);
		window.dp_attach_all_memebers_excel = new Dropzone(".attach_all_memebers_excel", { // define specific dropzone target
			url: "app/core.php",
			paramName: 'file',
			parallelUploads: 6,
			maxFilesize: 30,
			maxFiles: 6,
			uploadMultiple: false,
			acceptedFiles: ".xlsx,.csv", //    acceptedFiles: ".png,.jpg,.jpeg,.gif,.pdf",
			autoProcessQueue: false,
			addRemoveLinks: true,
			clickable: ".attach_all_memebers_excel" + ", " + ".attach_all_memebers_excel" +" > *",
			dictDefaultMessage: lang('upload_msg_onlyFile'),
			init: function () {
				this.on("success", function (file, response) {
					$(".attach_all_memebers_excel"+" .dropzone_temp").fadeOut();
					$(".dz-remove").fadeOut();
						$(".dz-remove").fadeOut();
					$('.get_excel_data_form').html(response);
				});
			},
		});
	}

	if ($(".upload_member_profile_img").length) {
		$(".upload_member_profile_img").html(temp);
		window.dp_member_profile_img = new Dropzone(".upload_member_profile_img", { // define specific dropzone target
			url: "app/core.php",
			type: 'post',
			paramName: 'file',
			parallelUploads: 6,
			maxFilesize: 6,
			maxFiles: 1,
			// uploadMultiple: false,
			acceptedFiles: "image/jpeg,image/png", //    acceptedFiles: ".png,.jpg,.jpeg,.gif,.pdf",
			autoProcessQueue: false,
			enqueueForUpload: false,
			addRemoveLinks: true,
			renderMethod: "prepend",
			clickable: ".upload_member_profile_img" + ", " + ".upload_member_profile_img" +" > *",
			dictDefaultMessage: lang('upload_msg_onlyFile'),
			init: function () {
				this.on("success", function (file, response) {
					console.log(response);
					
					$(".dz-remove").fadeOut();
					def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);
				});
			},
		});
	}


	if ($("form.dropzone_attach_post").length) {
		$("form.dropzone_attach_post").html(temp);
		window.dp_attach_post = new Dropzone("form.dropzone_attach_post", { // define specific dropzone target
			url: "app/core.php",
			type: 'post',
			paramName: 'file',
			parallelUploads: 6,
			maxFilesize: 30,
			maxFiles: 6,
			uploadMultiple: true,
			acceptedFiles: "image/*,application/pdf,.psd,.docx,.xlsx", //    acceptedFiles: ".png,.jpg,.jpeg,.gif,.pdf",
			autoProcessQueue: false,
			addRemoveLinks: true,
			clickable: ".dropzone_attach_post" + ", " + ".dropzone_attach_post" +" > *",
			init: function () {
				this.on("successmultiple", function (file, response) {
					$(".dz-remove").fadeOut();
					def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);
				});

			},

		});
	}


	// On Click
	$(document).on('click', '[data-awesomelotfyfw="attach_all_memebers_excel"]', function () {
		dp_attach_all_memebers_excel.on('sending', function (file, xhr, formData) {
			formData.append('awesomeLotfyFW', 'attach_all_memebers_excel');
			formData.append('brand_id', $('[data-attach_all_memebers_excel="brand_id"]').data('brand_id'));
		});

		dp_attach_all_memebers_excel.processQueue();
	});
	// Profile Img
	$(document).on('click', '.upload_member_profile_img', function () {
		dp_member_profile_img.on('sending', function (file, xhr, formData) {
			formData.append('awesomeLotfyFW', 'upload_member_profile_img');
			formData.append('user_id', $('[data-upload_member_profile_img="user_id"]').val());
			formData.append('brand_id', $('[data-upload_member_profile_img="brand_id"]').val());
		});

		dp_member_profile_img.processQueue();
	});
	$(document).on('click', '.send_request', function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (dp_attach_request.files.length) {
			dp_attach_request.on('sending', function (file, xhr, formData) {
				formData.append('awesomeLotfyFW', 'send_request_data');

				formData.append('request_brand_send', $('.request_brand_send').val());
				formData.append('request_person_send', $('.request_person_send').val().toString());
				formData.append('request_type_Send', $('.request_type_Send').val());
				formData.append('request_status_important_Send', $('.request_status_important_Send').val());
				formData.append('request_title_Send', $('.request_title_Send').val());
				formData.append('request_content_Send', $('.request_content_Send').val());
			});
			dp_attach_request.processQueue();
		} else {
			$.ajax({
				"url": "app/core.php",
				"method": "POST",
				"data": {
					'awesomeLotfyFW': 'send_request_data',

					'request_brand_send': $('.request_brand_send').val(),
					'request_person_send': $('.request_person_send').val().toString(),
					'request_type_Send': $('.request_type_Send').val(),
					'request_status_important_Send': $('.request_status_important_Send').val(),
					'request_title_Send': $('.request_title_Send').val(),
					'request_content_Send': $('.request_content_Send').val(),
				},
				success: function (response) {
					def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);
				}
			});
		}
	});
	// Brand_img
	$(document).on('click', '.upload_brand_profile_img', function () {
		dp_brand_img.processQueue();
	});
	// Attach Post
	$(document).on('click', '.send_post_content', function (e) {
		e.preventDefault();
		e.stopPropagation();

		if (dp_attach_post.files.length) {
			dp_attach_post.on('sending', function (file, xhr, formData) {
				formData.append('awesomeLotfyFW', 'send_post');
				formData.append('brand_id', brand_id);
				formData.append('post_type', $("input[name='post_type']:checked").val());
				formData.append('post_content', $('#add_new_post').children().eq(0).html());
			});
			dp_attach_post.processQueue();
		} else {
			$.ajax({
				"url": "app/core.php",
				"method": "POST",
				"data": {
					'awesomeLotfyFW': 'send_post',
					'brand_id': brand_id,
					'post_type': $("input[name='post_type']:checked").val(),
					'post_content': $('#add_new_post').children().eq(0).html(),
				},
				success: function (response) {
					def_alert(response ,15000);
					console.log(response);
				}
			});
		}
	});
	// member_atttachments
	$(document).on('click', '.upload_member_attachments_action', function (e) {
		e.preventDefault();
		e.stopPropagation();


		if (dp_member_attachments.files.length) {
			dp_member_attachments.on('sending', function (file, xhr, formData) {
				formData.append('awesomeLotfyFW', 'upload_member_attachments');
				formData.append('user_id', $('.upload_member_attachments__user_id').val());
				formData.append('brand_id', $('.upload_member_attachments__brand_id').val());
				formData.append('attachments_content', $('.upload_member_attachments_content').val());
			});
			dp_member_attachments.processQueue();
		} else {
			$.ajax({
				"url": "app/core.php",
				"method": "POST",
				"data": {
					'awesomeLotfyFW': 'upload_member_attachments',
					'user_id': $('.upload_member_attachments__user_id').val(),
					'brand_id': $('.upload_member_attachments__brand_id').val(),
					'attachments_content': $('.upload_member_attachments_content').val(),
				},
				success: function (response) {
					$('#member_details').modal('hide');
					def_alert(response ,1500);
				}
			});
		}
	});
	// Profile Img
	$(document).on('click', '.upload_profile_img', function () {
		dp_profile_img.processQueue();
	});

});