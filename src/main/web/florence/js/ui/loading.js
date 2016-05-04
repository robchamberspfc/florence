/**
 * Loading animations reused through Florence
 *
 */

// Add loading icon to a button
function loadingBtn(selector) {
    var loadingHTML = $(templates.loadingAnimation()).css('top', '-3px'); // -3px to get animation in centre of button

    selector
        .width(selector.width()).height(selector.height()) // make btn keep width & height with loading icon
        .empty() // remove button text
        .append(loadingHTML); // Load loading animation template into button
}
