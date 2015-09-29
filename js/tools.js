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

        $('.login-form form').validate();
        $('.idea-edit form').validate();

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

    });

    $(window).bind('load resize', function() {
        $('.gallery').each(function() {
            $('.gallery-item-inner').css({'min-height': 0 + 'px'});

            $('.gallery-item-inner').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                $('.gallery-item-inner').each(function() {
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