$(document).ready(function () {
  // Documentation

  //* if value is public u can use
  // <input type="hidden" data-delete_memeber_file="user_id" value="1">
  // <button data-awesomelotfyfw="delete_memeber_file"></button>

  //* if value is specific u must use
  // <button data-user_id="1" data-awesomelotfyfw="delete_memeber_file"></button>

  //* Examples
  //* With data-operation_section [Auto add save btn]
  //* Added To Parent Element
  //* Get all values have data value
  // <div class="form-group" data-operation_section="member_user_full_name">
  //  <input type="hidden" data-member_user_full_name="user_id" value="1">
  //  <input class="form-control" data-member_user_full_name="user_full_name" type="text" value="1">
  // </div>

  //* With data-awesomelotfyfw [Manoul add save btn]
  //* Get all values have data value
  // <div class="form-group">
  //  <input type="hidden" data-member_user_full_name="user_id" value="1">
  //  <input class="form-control" data-member_user_full_name="user_full_name" type="text" value="1">
  //  <button data-awesomelotfyfw="member_user_full_name">save</button>
  // </div>

  //* if u want to add temp [btn - save & close]
  // <div class="form-group" data-operation_section="member_user_full_name"></div>

  function value(operation_name, data_name) {
    return $('[data-' + operation_name + '="' + data_name + '"]').val();

  }

  function send_data(this_data, data) {
    var returnedData = {
      'awesomeLotfyFW': data[0]
    };

    for (let index = 1; index < data.length; index++) {
      if (value(data[0], data[index]) !== undefined) {
        returnedData[data[index]] = value(data[0], data[index]);
      } else {
        returnedData[data[index]] = this_data[data[index]];
      }
    }
    return returnedData
  }
  $(document).on('click focus', '[data-operation_section]', function () {

    if ($(this).data('true')) {
      if ($(this).data('true') == 'hidden') {
        var true_btn = '';
      }else {
        var true_btn = lang($(this).data('true'));
      }
    }else{
      var true_btn = '<button type="button" class="btn btn-success bg-gradient-success btn-sm" data-awesomelotfyfw="' + $(this).data('operation_section') + '">' +  lang("sv") + '</button>';

    }
    if ($(this).data('false')) {

      if ($(this).data('false') == 'hidden') {
        var false_btn = '';
      }else {
        var false_btn = lang($(this).data('false'));
      }

    }else{
      var false_btn = '<button type="button" class="btn btn btn-secondary btn-sm rm_fotter">' + lang("cl") + '</button>';

    }
    
    var input_footer = '<div class="modal-footer_temp d-flex justify-content-between p-0">'+true_btn + false_btn+'</div>';
    if (!$(this).hasClass('have_footer')) {
      $(this).append(input_footer);
      $(this).addClass('have_footer post_border card-frame');
      $(this).addClass('stay_temp');
    }
  });
  $(document).on('click', '.rm_fotter', function (e) {
    e.stopPropagation();
    if ($(this).parents('[data-operation_section]').hasClass('have_footer')) {
      $(this).parents('[data-operation_section]').removeClass('have_footer post_border card-frame');
      $(this).parent('.modal-footer_temp').fadeOut(50, function () {
        $(this).remove();
      });
    }
  });

  $(document).on('click focus', '[data-operation_section]', function () {
    var input_footer = '<div class="modal-footer d-flex justify-content-between p-0 pt-2"><button type="button" class="btn btn-success bg-gradient-success btn-sm" data-awesomelotfyfw="' + $(this).data('operation_section') + '">' + lang("sv") + '</button><button type="button" class="btn btn btn-secondary btn-sm rm_fotter">' + lang("cl") + '</button></div>';
    if (!$(this).hasClass('have_footer')) {
      $(this).append(input_footer);
      $(this).addClass('have_footer py-2 post_border card-frame');
      $(this).addClass('stay_temp');
    }
  });
  // $(document).on('keyup', 'input', function () {
  //   if (event.keyCode === 13) {
  //     $.each( $(this).data(), function( key, value ) {
  //       console.log(  $(this).parent().parent().html()  );
  //       //'[data-operation_section]'
  //       // $( "[data-operation_section]="+key ).click();
  //     });
  //   }
  // });

  $(document).on('click', '[data-awesomelotfyfw]', function (e) {
    e.stopPropagation();

    if ($(this).parents('[data-operation_section]').hasClass('have_footer')) {
      $(this).parents('[data-operation_section]').removeClass('have_footer post_border card-frame');
      $(this).parent('.modal-footer_temp').fadeOut(50, function () {
        $(this).remove();
      });
    }

    if ($(this).data('awesomelotfyfw') == 'update_salary_day') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
        'salary_day',
      ]);
      console.log(data);

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          $('#member_details').modal('hide');

          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'delete_memeber_file') {

      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'file_id',
        'user_id',
        'brand_id',
      ]);

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          $('#member_details').modal('hide');

          def_alert(response ,1500);
        }
      });


    } else if ($(this).data('awesomelotfyfw') == 'memeber_data_from_brand') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id',
        'user_full_name',
        'user_email',
        'user_phone',
        'user_jop_title',
        'user_jop_desc',
        'user_address',
        'user_id_card',
        'passport_no',
        'employment_no',
        'medical_insurance_no',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {

          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'backup_all_user_data') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          console.log(response);
          
          $('#member_details').modal('hide');

          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'member_info') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
      ]);

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          $('.get_member_info').html(response).promise().done(function () {
            loading(false, '.permission_details_swiper');
            $('.member_personal_info_btn').addClass('active').siblings().removeClass('active');
            swiperMemberInfoDataBrand.slideTo($('.member_info_data_page').index());
            $('#member_details').slideUp(0);
            $('#member_details').modal('show');
            $('#member_details').slideDown(600);
            if ($("form.upload_member_attachments").length) {

              member_attachments();
            }

          });

        }

      });

    } else if ($(this).data('awesomelotfyfw') == 'get_request_data') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'request_id',
        'request_type',
      ]);
      var ele = $(this);
      $(this).parents('.allTaskContent').siblings().slideToggle();
      $(this).toggleClass('btn p-0 m-0 mb-2');
      $(this).find('.toggleRows').toggleClass('flex-column small');
      $(this).find('.toggleRows').toggleClass('flex-row');

      if (!$(this).parent().hasClass('done')) {
        loading(true, $(this).parents('.allTaskContent'), true);
        $(this).parent().addClass('done');
        $(this).parents('.allTaskContent').find('.request_sent_data').slideToggle("normall", "swing", function () {
          // swiperTasks.updateAutoHeight(600);
        });
        $.ajax({
          "url": "app/core.php",
          "method": "POST",
          "data": data,
          success: function (response) {
            $(ele).parents('.allTaskContent').find('.request_sent_data').html(response);
            // Dropzone

            loading(false, $(ele).parents('.allTaskContent'));
            // swiperTasks.updateAutoHeight(600);

          }

        });
      } else {
        $(this).parents('.allTaskContent').find('.request_sent_data').slideToggle("normall", "swing", function () {
          // swiperTasks.updateAutoHeight(600);
        });
      }
      $(this).find('.request_Headar').slideToggle();


    } else if ($(this).data('awesomelotfyfw') == 'create_report') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id', 'report_mounth',
      ]);
      data['report_name'] = $("input[name='report_name']:checked").val();
      var ele = $(this);
      loading(true, '.swiper-container-reports', true);
      $('.report_maker').fadeToggle();
      $(this).fadeToggle();

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          $('.report_tabel_result').html(response);
          loading(false, '.swiper-container-reports');
          $('#datatable_brand_report').DataTable({

            dom: 'Bfrtip',
            buttons: [
              'colvis',
              {
                extend: 'copyHtml5',
                exportOptions: {
                  columns: ':visible'
                }
              },
              {
                extend: 'print',
                exportOptions: {
                  columns: ':visible'
                }
              },

              {
                extend: 'csv',
                text: 'Excel - CSV',
                charset: 'utf-8',
                extension: '.csv',
                fieldSeparator: ';',
                fieldBoundary: '',
                filename: 'export',
                exportOptions: {
                  columns: ':visible'
                },
                messageTop: 'PDF created by Buttons for DataTables.',
                bom: true,

              },

            ],

            select: true,
            orderCellsTop: true,
            fixedHeader: true,
            select: true,
            scrollCollapse: true,
            fixedColumns: false,
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            "lengthMenu": [
              [10, 25, 50, -1],
              [10, 25, 50, "All"]
            ],
            pageLength: 10,
            sPaginationType: "full_numbers",
            columnDefs: [{
              targets: -1,
              visible: false
            }],

            "language": {
              "search": lang('search'),
              "paginate": {
                "first": lang('First'),
                "last": lang('Last'),
                "next": lang('Next'),
                "previous": lang('Previous')
              },
              buttons: {
                colvis: lang('change_columns'),
                print: lang('print'),
                copy: lang('copy'),
              },
              "zeroRecords": lang('not_found'),
              "info": lang('Showing') + " _START_ " + lang('to') + " _END_ " + lang('of') + " _TOTAL_ " + lang('entries'),

            },

          });

          swiperReport.slideTo($('.report_result_set_here').index());
          // swiperTasks.updateAutoHeight(600);

        }

      });



    } else if ($(this).data('awesomelotfyfw') == 'stop_allowance_id') {

      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'allowance_id',
        'brand_id',
        'user_id',
        'allowance_type',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          console.log(response);

          $('#member_details').modal('hide');

          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'stop_vacation_id') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'vacation_id',
        'brand_id',
        'user_id',
      ]);

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          console.log(response);

          $('#member_details').modal('hide');

          def_alert(response ,1500);
        }
      });








    } else if ($(this).data('awesomelotfyfw') == 'post_comment') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'request_id',
        'request_type',
      ]);
      var ele = $(this);
      data['comment_content'] = $(this).parents('.comment_content_temp').find('.comment_content').val();
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          $(ele).parents('.comment_content_temp').find('.comment_content').val('');
          $(ele).parents('.request_to_users_temp').find('.all_request_comments').slideUp();

          // setTimeout(function () {
          //   swiperTasks.updateAutoHeight(600);
          // }, 600);

          def_alert(response ,1500);
        }
      });


    } else if ($(this).data('awesomelotfyfw') == 'get_request_comments') {
      var ele = $(this);
      if (!$(this).hasClass('opend')) {
        $(this).addClass('opend');
        var data = send_data($(this).data(), [
          $(this).data('awesomelotfyfw'),
          'request_id',
          'request_type',
        ]);
        $.ajax({
          "url": "app/core.php",
          "method": "POST",
          "data": data,
          success: function (response) {
            $(ele).parents('.allTaskContent').find('.all_request_comments').html(response);
            $(ele).parents('.allTaskContent').find('.all_request_comments').slideToggle();
            // setTimeout(function () {
            //   swiperTasks.updateAutoHeight(600);
            // }, 600);

          }
        });

      } else {
        $(this).removeClass('opend');
        $(ele).parents('.allTaskContent').find('.all_request_comments').slideToggle();
        // setTimeout(function () {
        //   swiperTasks.updateAutoHeight(600);
        // }, 600);

      }









    } else if ($(this).data('awesomelotfyfw') == 'request_response_toggle') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'request_id',
      ]);
      if ($(this).is(':checked')) {
        // active
        console.log('1');
        // set response 1
        data['request_response'] = 1;
      } else {
        // non active
        // set response 0
        console.log('0');
        data['request_response'] = 0;

      }

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'request_approved_toggle') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'request_id',
      ]);
      var ele = $(this);
      loading(true, $(this).parents('.allTaskContent'), true);

      $(this).slideUp();
      $(this).parents('.request_to_users_temp').slideUp();
      $(this).parents('.allTaskContent').removeClass('done');
      $(this).parents('.allTaskContent').siblings().slideToggle();
      // setTimeout(function () {
      //   swiperTasks.updateAutoHeight(600);
      // }, 600);

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          loading(false, $(ele).parents('.allTaskContent'));
          def_alert(response ,1500);
        }
      });



    } else if ($(this).data('awesomelotfyfw') == 'update_member_salary') {
      loading(true, '.member_finance_info_page', true);
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id',
        'user_id',
        'salary_amount',
      ]);

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          $('#member_details').modal('hide');
          loading(false, '.member_finance_info_page');
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'remove_user_as_platform_owner') {
      var ele = $(this);
      loading(true, $(this).parents('.all_users_as_platform_owner'), true);
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          loading(false, $(ele).parents('.all_users_as_platform_owner'));
          $(ele).parents('tr').remove();
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'freeze_toggle_user_as_platform_owner') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });


    } else if ($(this).data('awesomelotfyfw') == 'remove_brand_as_platform_owner') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'freeze_toggle_brand_as_platform_owner') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'finance_long_term') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id',
        'user_id',
        'allowance_name',
        'allowance_amount',
        'allowance_sort',
      ]);
      data['allowances_type'] = $("input[name='allowances_type_long']:checked").val();

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          console.log(response);
          def_alert(response ,1500);
        }
      });
    } else if ($(this).data('awesomelotfyfw') == 'finance_short_term') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id',
        'user_id',
        'allowance_name',
        'allowance_amount',
        'allowance_start',
        'allowance_end',
        'allowance_sort',
      ]);
      data['allowances_type'] = $("input[name='allowances_type_short']:checked").val();

      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          console.log(response);
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'member_user_full_name' 
    || $(this).data('awesomelotfyfw') == 'member_user_name'
    || $(this).data('awesomelotfyfw') == 'member_user_email'
    || $(this).data('awesomelotfyfw') == 'member_user_phone'
    || $(this).data('awesomelotfyfw') == 'member_user_jop_title'
    || $(this).data('awesomelotfyfw') == 'member_user_jop_desc'
    || $(this).data('awesomelotfyfw') == 'member_user_dob'
    || $(this).data('awesomelotfyfw') == 'member_user_address'
    || $(this).data('awesomelotfyfw') == 'member_user_social_fb'
    || $(this).data('awesomelotfyfw') == 'member_user_social_tw'
    || $(this).data('awesomelotfyfw') == 'member_user_social_ws'
    || $(this).data('awesomelotfyfw') == 'member_user_social_linkedIn'
    || $(this).data('awesomelotfyfw') == 'member_jop_title'
    ) {

      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
        $(this).data('awesomelotfyfw'),
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });
    } else if ($(this).data('awesomelotfyfw') == 'employment_no') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
        $(this).data('awesomelotfyfw'),
        'date_of_employment',
        'exp_date_of_employment',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'medical_insurance_no') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
        $(this).data('awesomelotfyfw'),
        'date_of_medical_insurance',
        'exp_date_of_medical_insurance',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'member_user_id_card') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
        $(this).data('awesomelotfyfw'),
        'user_id_card_start',
        'user_id_card_end',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });
    } else if ($(this).data('awesomelotfyfw') == 'member_user_passport_no') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
        $(this).data('awesomelotfyfw'),
        'user_passport_start',
        'user_passport_end',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'set_user_permission') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
      ]);
      data['user_perm'] = $('.detected_permission').val().join();
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'add_new_vacation') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
        'vacation_name',
        'vacation_start_date',
        'vacation_end_date',
        'vacation_comment',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'create_letter') {
      var ele = $(this);
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_id',
        'brand_id',
        'sent_to',
      ]);
      var arr = [];
      $('input.letter_components_input:checkbox:checked').each(function () {arr.push($(this).attr('name'));});
      data['letter_components'] = arr.join();
      if ($('input.share_letter_link').is(':checked')) {
        data['letter_share_online'] = 1;
      }else{
        data['letter_share_online'] = 0;
      }
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
          setTimeout(function () {
						window.location = window.location;
					}, 400);

        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'memebers_data_from_excel') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id',
        'user_full_name',
        'user_email',
        'user_phone',
        'user_jop_title',
        'user_jop_desc',
        'user_address',
        'user_id_card',
        'passport_no',
        'employment_no',
        'medical_insurance_no',
        'file_name',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);

        }
      });


    } else if ($(this).data('awesomelotfyfw') == 'confirm_mail') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'token',
        'request_method',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });


    } else if ($(this).data('awesomelotfyfw') == 'pending_member') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id',
        'user_id',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);
        }
      });
      

    } else if ($(this).data('awesomelotfyfw') == 'confirm_delete_user') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'brand_id',
        'user_id',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'reset_user_passrod') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'token',
        'new_password',
        'confirm_new_password',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
					setTimeout(function () {
						window.location = window.location;
					}, 400);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'toggle_letter') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'letter_id',
        'brand_id',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'forget_passwrd') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
        'user_email',
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'reconfirm_email') {
      var data = send_data($(this).data(), [
        $(this).data('awesomelotfyfw'),
      ]);
      $.ajax({
        "url": "app/core.php",
        "method": "POST",
        "data": data,
        success: function (response) {
          def_alert(response ,1500);
        }
      });

    } else if ($(this).data('awesomelotfyfw') == 'new_FW') {
      
      // End
    }
  });
});