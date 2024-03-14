const toggleButton = document.getElementById('toggleButton');
const element = document.getElementById('element');
let clickCount = 0;

toggleButton.addEventListener('click', function() {
    clickCount++;
    if (clickCount > 9) {
        element.classList.remove('hidden');
        element.classList.add('visible');
    }
});
