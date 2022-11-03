const toggleButtons = document.getElementsByClassName('toggle-close');

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

for (let i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener('click', (event) => {
        let answer = event.target.parentElement.parentElement.querySelector('.answer');
        let heigth = answer.clientHeight;
        answer.style.height = '0px';
        answer.style.zIndex = 'none';
        answer.style.position = 'relative';
        answer.style.opacity = '1';
        for (let px = 0; px < heigth; px++) {
            answer.style.height = `${px}px`;
            sleep(100);
        }
    });
}