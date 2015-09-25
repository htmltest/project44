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

        $('input[name="phone"]').val('').mask('+7 (999) 999-99-99');

        $('.login-form form').validate();

    });

    $(window).bind('load resize', function() {
        $('.gallery').each(function() {
            $('.gallery-item').css({'min-height': 0 + 'px'});

            $('.gallery-item').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                $('.gallery-item').each(function() {
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
                $('.detail-text').jScrollPane({
                    autoReinitialise: true
                });
            } else {
                $('.detail-text').jScrollPane({
                    autoReinitialise: true
                });
            }
        }
    });

})(jQuery);