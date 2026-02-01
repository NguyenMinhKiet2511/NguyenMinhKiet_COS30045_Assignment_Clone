const btnHome = document.getElementById('btn-home');
const btnDataStory = document.getElementById('btn-data-story');
const btnTv = document.getElementById('btn-tv');
const btnAbout = document.getElementById('btn-about');


const sectionHome = document.getElementById('home');
const sectionDataStory = document.getElementById('data-story');
const sectionTv = document.getElementById('televisions');
const sectionAbout = document.getElementById('about');

function switchPage(activeSection, activeBtn) {
    
    sectionHome.classList.add('hidden');
    sectionDataStory.classList.add('hidden');
    sectionTv.classList.add('hidden');
    sectionAbout.classList.add('hidden');

    btnHome.classList.remove('active');
    btnDataStory.classList.remove('active');
    btnTv.classList.remove('active');
    btnAbout.classList.remove('active');

    activeSection.classList.remove('hidden');

    activeBtn.classList.add('active');
}

btnHome.addEventListener('click', function(event) {
    event.preventDefault(); 
    switchPage(sectionHome, btnHome); 
});

btnDataStory.addEventListener('click', function(event) {
    event.preventDefault();
    switchPage(sectionDataStory, btnDataStory);
});

btnTv.addEventListener('click', function(event) {
    event.preventDefault();
    switchPage(sectionTv, btnTv);
});

btnAbout.addEventListener('click', function(event) {
    event.preventDefault();
    switchPage(sectionAbout, btnAbout);
});

const logo = document.querySelector('.logo');

logo.addEventListener('click', function() {
    switchPage(sectionHome, btnHome);
});