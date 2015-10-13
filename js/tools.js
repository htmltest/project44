(function($) {

    $(document).ready(function() {

        $('.login-input input').each(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.login-input input').focus(function() {
            $(this).parent().find('span').css({'display': 'none'});
        });

        $('.login-input input').blur(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.login-checkbox input:checked').parent().addClass('checked');
        $('.login-checkbox span').click(function() {
            $(this).toggleClass('checked');
            $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
        });

        $('input.maskPhone').mask('+7 (999) 999-99-99');

        $('.login-form form').validate({
          invalidHandler: function(form, validatorcalc) {
              var errors = validatorcalc.numberOfInvalids();
              if (errors) {
                  $('.text-error').show();
              }
          }
        });
        $('.idea-edit form').validate({
          invalidHandler: function(form, validatorcalc) {
              var errors = validatorcalc.numberOfInvalids();
              if (errors) {
                  $('.text-error').show();
              }
          }
        });
        $('.cabinet-profile-edit-cols').validate({
          invalidHandler: function(form, validatorcalc) {
              var errors = validatorcalc.numberOfInvalids();
              if (errors) {
                  $('.text-error').show();
              }
          }
        });

        $('.idea-type-radio input:checked').parent().addClass('checked');
        $('.idea-type-radio').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.idea-type-radio input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('.idea-edit-img-file input').change(function() {
            $('.idea-edit-preview').show().html($(this).val().replace(/.*(\/|\\)/, ''));
        });

        $('.detail-photo a').fancybox({
            helpers: {
                media: true,
                overlay: {
                    locked: false
                }
            },
            tpl: {
                closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            padding: 0
        });

        $(document).on('click', 'a.gallery-item-rate, a.detail-rate', function(e) {
            var trigger = $(this);
            var idea = trigger.attr('rel');
            $.ajax({
                method: 'POST',
                url: '/ajax/vote.php',
                data: { idea: idea},
                dataType: 'json'
            }).done(function(r) {
                if (r.s == 1) {
                    if (r.c == '+') {
                        trigger.addClass('active');
                        _gaq.push(['_trackEvent', 'ftb_ideas', 'click', 'голос подан']);
                    } else {
                        trigger.removeClass('active');
                        _gaq.push(['_trackEvent', 'ftb_ideas', 'click', 'голос отозван']);
                    }
                    trigger.html(r.v);
                } else {
                    alert(r.m);
                }
            });
            e.preventDefault(e);
        });

        $(document).on('click', '.cabinet-profile-edit-avatar-upload', function(e) {
            $('input[name="newAva"]').click();
            e.preventDefault();
        });

        $('input[name="newAva"]').change(function() {
            var options = {
                success: function(data) {
                    if (data.status == 1) {
                        $('.avaImage').attr('src', data.pic);
                        $('.cabinet-profile-avatar img').attr('src', data.pic);
                    } else {
                        alert(data.message, 'Ошибка');
                    }
                },
                url:        '/ajax/newAvatar.php',
                type:       'post',
                dataType:   'json',
                clearForm:  true,
                resetForm:  true
            };
            $('input[name="newAva"]').parent().ajaxSubmit(options);
        });

        $('.idea-edit-preview a').click(function(e) {
            if (confirm('Вы хотите удалить текущую фотографию?')) {
                $('.idea-edit-preview input').prop('checked', true);
                $('.idea-edit-preview').hide();
            } else {
            }
            e.preventDefault();
        });

        $('.cabinet-profile-edit-avatar').click(function() {
            $('.cabinet-profile-edit-avatar').toggleClass('open');
        });

        $('.gallery-item-ctrl-add').click(function() {
            $(this).toggleClass('open');
        });

        $('.detail-ctrl-add').click(function() {
            $(this).toggleClass('open');
        });

    });

    $(window).bind('load resize', function() {
        $('.gallery').each(function() {
            $('.gallery-item-text').css({'min-height': 0 + 'px'});

            $('.gallery-item-text').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                $('.gallery-item-text').each(function() {
                    var otherBlock = $(this);
                    if (otherBlock.offset().top == curTop) {
                        var newHeight = otherBlock.height();
                        if (newHeight > curHeight) {
                            curBlock.css({'min-height': newHeight + 'px'});
                        } else {
                            otherBlock.css({'min-height': curHeight + 'px'});
                        }
                    }
                });
            });
        });

        if ($('.detail-text').length > 0) {
            var api = $('.detail-text').data('jsp');
            if (api) {
                api.destroy();
                if ($(window).width() > 1200) {
                    $('.detail-text').jScrollPane({
                        autoReinitialise: true
                    });
                }
            } else {
                if ($(window).width() > 1200) {
                    $('.detail-text').jScrollPane({
                        autoReinitialise: true
                    });
                }
            }
        }

        if ($(window).width() <= 640) {
            $('.cabinet-profile-edit-field-input input').each(function() {
                $(this).attr('placeholder', $(this).parents().filter('.cabinet-profile-edit-field').find('.cabinet-profile-edit-field-label').html());
            });
            $('.idea-edit-input input, .idea-edit-input textarea').each(function() {
                $(this).attr('placeholder', $(this).parent().prev().html());
            });
        } else {
            $('.idea-edit-input input, .idea-edit-input textarea').removeAttr('placeholder');
        }
    });

    $(window).load(function() {
        if (!$('body').hasClass('main-page')) {
            $.scrollTo($('.login-title'), 500);
        }
    });

})(jQuery);