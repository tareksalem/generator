// Get Index.php Page [Onload];
$(document).ready(function () {
    // Joined Companies
    function get_file(file_name, set_in) {
        $.ajax({
            "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': file_name,
            },
            success: function (response) {
                $(set_in).html(response);
            }
        });
    }
    $(document).on('click', '.create_brand', function () {
        loading(true, '.swiper-container-companys', true);
        $.ajax({
            "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'create_brand',
                brand_name: $('.brand_name').val(),
                brand_sort: $('.brand_sort').val(),
            },
            success: function (response) {
                $('.create_brand_res').html(response);
                loading(false, '.swiper-container-companys');

                def_alert(response ,1500);
                setTimeout(function () {
                    window.location = window.location;
                }, 1500);

                // get_file('joined_companies', '.joined_companies_rows');
                // console.log(response);

            }
        });
    });


    if ($(".invites_users_rows").length) {
        $.ajax({
            "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'invites_members',
                brand_id: $('.invites_users_rows').data('brand_id'),
            },
            success: function (response) {
                $('.invites_users_rows').html(response);
            }
        });
    }

    if ($(".all_request_from_brand").length) {
        $.ajax({
            "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'all_request_from_brand',
                brand_id: $('.brand_member_rows').data('brand_id'),
            },
            success: function (response) {
                $('.all_request_from_brand').html(response);
            }
        });
    }

    // Get one member data in brand

    $(document).on('click', '[data-get_member_data = "true"]', function () {
        $('.get_member_info').html('');
        loading('.get_member_info', true);
        $.ajax({
            "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'member_info',
                brand_id: $(this).data('brand_id'),
                user_id: $(this).data('user_id'),
            },
            success: function (response) {
                $('.get_member_info').html(response);
                loading('.get_member_info', false);
            }
        });

    });

    $(document).on('click', '[data-cancel_invitation = "true"]', function () {
        $(this).parents('.invitation_parent').fadeOut();
        $.ajax({
            "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'cancel_invitation',
                brand_id: $(this).data('brand_id'),
                invite_id: $(this).data('invite_id'),
            },
            success: function (response) {
                def_alert(response ,1500);
                setTimeout(function () {
                    window.location = window.location;
                }, 100);

            }
        });

    });




    $(document).on('click', '.register', function () {

        $.ajax({
             "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'register',
                reg_full_name: $('.reg_full_name').val(),
                reg_email: $('.reg_email').val(),
                reg_phone: $('.reg_phone').val(),
                reg_password: $('.reg_password').val(),
            },
            success: function (response) {
                def_alert(response ,1500);

            }
        });

    });
    $(document).on('click', '.sign_in', function () {
        $.ajax({
             "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'sign_in',
                sign_email: $('.sign_email').val(),
                sign_password: $('.sign_password').val(),
            },
            success: function (response) {
                def_alert(response ,1500);
            }
        });

    });
    $(document).on('click', '.login_via_cookies', function () {
        $.ajax({
             "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'login_via_cookies',
            },
            success: function (response) {
                def_alert(response ,1500);
            }
        });

    });
    $(document).on('click', '.remove_cookies', function () {
        $('.remove_cookies_section').slideUp();
        $.ajax({
             "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'remove_cookies',
            },
            success: function (response) {
                console.log(response);
            }
        });

    });
    $(document).on('click', '[data-send_getfiles="add_member"]', function () {

        $.ajax({
            "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'add_member',
                brand_id: $(this).data('brand_id'),
                user_email: $('[data-add_member="user_email"]').val(),
                user_jop_title: $('[data-add_member="user_jop_title"]').val(),
            },
            success: function (response) {
                def_alert(response ,1500);
            }
        });
    });

    $(document).on('click', 'li.change_lang', function () {

        if ($(this).hasClass('ar')) {
            var langTo = 'ar';
        } else if ($(this).hasClass('en')) {
            var langTo = 'en';
        } else if ($(this).hasClass('de')) {
            var langTo = 'de';
        } else if ($(this).hasClass('fr')) {
            var langTo = 'fr';
        }
        $.ajax({
            "url": "app/core.php",
            "method": "POST",
            "data": {
                'awesomeLotfyFW': 'change_lang',
                langTo: langTo,
            },
            success: function (response) {
                def_alert(response ,1500);
                setTimeout(function () {
                    window.location = window.location;
                }, 500);
            }
        });
    });




    // End
});