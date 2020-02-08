function hideTabs() {
    let tabContent = document.getElementsByClassName('tab-content');

    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }
}

function changeTab(event, tabName) {

    hideTabs();

    let tabLinks = document.getElementsByClassName('tab-link');

    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

document.getElementById('speech-to-text-input').addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        let src = event.target.value.replace('watch?v=', 'embed/');
        console.log(src);
        if (src.includes("youtube")) {
            document.getElementById('speech-to-text-iframe').src = src;
        }
    }
});


document.getElementById('text-to-speech-input').addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        let src = event.target.value.replace('watch?v=', 'embed/');
        console.log(src);
        if (src.includes("youtube")) {
            document.getElementById('text-to-speech-iframe').src = src;
        }
    }
});