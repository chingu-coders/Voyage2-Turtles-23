import $ from 'jquery';

export default () => {
    $('[data-action="open"]').click(e => {
        e.preventDefault();
        let target = $(e.target).data('target');
        $(target).addClass('open');
    });

    $('[data-action="close"]').click(e => {
        e.preventDefault();
        let target = $(e.target).data('target');
        $(target).removeClass('open');
    });
}
