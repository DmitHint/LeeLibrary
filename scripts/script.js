function truncate(elementId, maxLength) {
    var element = document.getElementById(elementId);

    var pElement = element?.querySelector('p');

    if (pElement) {
        var text = pElement.textContent;

        if (text.length > maxLength) {
            pElement.textContent = text.substring(0, maxLength) + '…';
        }
    }

}

var genres = [
    "drama",
    "dev",
    "poetry",
    "detective",
    "finance",
    "love",
    "child",
];

for (var str of genres) {
    truncate(str, 170);
}