// Show || Hide 'topScroll'.
$(document).ready(() => {
    // Determine Scrolled PX From the Window Object.
    $(window).scroll(() => {
        // If the Window Has A Scroll of 650 Pixels....
        if ($(this).scrollTop() <= 650) {
            // Hide 'topScroll'.
            $('#topScroll').hide();
        } else {
            // Show 'topScroll'.
            $('#topScroll').show();
        }
    });
});