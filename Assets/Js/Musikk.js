import sanger from "../json/Sanger.json" with { "type": "json" }

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const Cover = document.querySelector('.Cover');
    const MusikkSpiller = document.querySelector('.MusikkSpiller');
    const Info = document.querySelector('.Info');
    const sangliste = document.querySelector(".SangListe");
    const RoterendeDisk = document.querySelector('#RoterendeDisk');
    RoterendeDisk.style.display = 'none';
    Cover.appendChild(RoterendeDisk);

    const ShuffleRandom = document.querySelector('#ShuffleRandom');
    ShuffleRandom.textContent = '🎵';
    ShuffleRandom.style.fontSize = '25px';
    ShuffleRandom.style.display = 'inline-block';
    MusikkSpiller.appendChild(ShuffleRandom);

    const Knapp2 = document.querySelector('#Knapp2');
    Knapp2.textContent = '⏮';
    Knapp2.style.fontSize = '25px';
    Knapp2.style.display = 'inline-block';
    MusikkSpiller.appendChild(Knapp2);

    const Knapp1 = document.querySelector('#Knapp1');
    Knapp1.textContent = '⏯';
    Knapp1.style.fontSize = '35px';
    Knapp1.style.display = 'inline-block';
    MusikkSpiller.appendChild(Knapp1);

    const Knapp3 = document.querySelector('#Knapp3');
    Knapp3.textContent = '⏭';
    Knapp3.style.fontSize = '25px';
    Knapp3.style.display = 'inline-block';
    MusikkSpiller.appendChild(Knapp3);


    let currentSong = 0;

    function displaySong(Song) {
        Info.innerHTML = '';  
        Cover.innerHTML = '';
    
        Info.innerHTML += `
            <details>
            <summary id="summary" style="font-family: 'Comic Sans MS', cursive, sans-serif;">Vis mer informasjon</summary>
            <ul style="font-family: 'Comic Sans MS', cursive, sans-serif; max-height: 200px; overflow-y: auto;">
            <li><strong>Tittel:</strong> ${sanger[Song].Tittel}</li>
            <li><strong>Artist:</strong> ${sanger[Song].NavnArtist}</li>
            <li><strong>Kjønn:</strong> ${sanger[Song].Kjønn}</li>
            <li><strong>Alder:</strong> ${sanger[Song].Alder}</li>
            <li><strong>Sjanger:</strong> ${sanger[Song].Sjanger}</li>
            <li><strong>Utgivelsesår:</strong> ${sanger[Song].Utgivelsesår}</li>
            <li><strong>Album:</strong> ${sanger[Song].Album}</li>
            <li><strong>Nasjonalitet:</strong> ${sanger[Song].Nasjonalitet}</li>
            <li><strong>Beskrivelse:</strong> ${sanger[Song].Beskrivelse}</li>
            </ul>
            </details>
        `;
    
        Cover.innerHTML += `<img src="../Img/${sanger[Song].Bilde}" alt="Bilde av ${sanger[Song].NavnArtist}" class="cover-image">`;
        Cover.innerHTML += `<audio id="audioPlayer" controls type="audio/mp3" src="${sanger[Song].Lydfil}"></audio>`;
    
        Cover.appendChild(RoterendeDisk);
    }

    function removeBlur() {
        const coverImage = document.querySelector('.cover-image');
        if (coverImage) {
            coverImage.style.filter = 'none';
        }
    }

    displaySong(currentSong);


    ShuffleRandom.addEventListener('click', () => {
        currentSong = Math.floor(Math.random() * sanger.length);
        displaySong(currentSong);
        const audioElement = document.querySelector('#audioPlayer');
        if (audioElement) {
            audioElement.play();
            RoterendeDisk.style.display = 'block';
            removeBlur();
            audioElement.addEventListener('ended', playNextRandomSong);
        }
    });

    function playNextRandomSong() {
        currentSong = Math.floor(Math.random() * sanger.length);
        displaySong(currentSong);
        const audioElement = document.querySelector('#audioPlayer');
        if (audioElement) {
            audioElement.play();
            RoterendeDisk.style.display = 'block';
            removeBlur();
            audioElement.addEventListener('ended', playNextRandomSong); //Dette blir da på en måte en loop som bare fortsetter for alltid. 
        }
    }

    Knapp3.addEventListener('click', () => {
        currentSong = (currentSong + 1) % sanger.length;
        displaySong(currentSong);
        const audioElement = document.querySelector('#audioPlayer');
        if (audioElement) {
            if (audioElement.paused) {
                audioElement.play();
                RoterendeDisk.style.display = 'block';
            } else {
                audioElement.pause();
            }
        }
        RoterendeDisk.style.display = 'block';
        removeBlur();
    });

    Knapp2.addEventListener('click', () => {
        currentSong = (currentSong - 1 + sanger.length) % sanger.length;
        displaySong(currentSong);
        const audioElement = document.querySelector('#audioPlayer');
        if (audioElement) {
            if (audioElement.paused) {
                audioElement.play();
                RoterendeDisk.style.display = 'block';
            } else {
                audioElement.pause();
            }
        }
        RoterendeDisk.style.display = 'block';
        removeBlur();
    });

    Knapp1.addEventListener('click', () => {
        const audioElement = document.querySelector('#audioPlayer');
        if (audioElement) {
            if (audioElement.paused) {
                audioElement.play();
                RoterendeDisk.style.display = 'block';
                removeBlur();
            } else {
                audioElement.pause();
            }
        }
        if (audioElement.paused) {
            RoterendeDisk.style.animationPlayState = 'paused';
        } else {
            RoterendeDisk.style.animationPlayState = 'running';
        }
    });





    console.log(sanger);
});