//  TODO: make pages work


const page_size = 24;
let current_page = 1;
const params = new URLSearchParams(window.location.search);
let q = params.get('q') || '';
let offset = 0;

let url = `/api/games?limit=${page_size}&offset=${offset}&q=${q}`

fetch(url)
    .then(response => response.json())
    .then(data => {

        games = data;
        games_len = games.length;

        if (games_len == 0) {
            console.log(games_len);

            document.getElementById('not_found').style.display = 'block';
            document.getElementById('content').style.display = 'none';
            return;
        }

        let game_card = document.getElementById('catalog').children[0];

        for (let i = 0; i < games_len; i += 1) {
            let new_card = game_card.cloneNode(true);


            let game = games[i];
            const link = `/game.html?id=${game._id['$oid']}`;

            let age = game_card.querySelector('#card_age');
            age.textContent = game.release_date;

            let title = game_card.querySelector('#card_full_title');
            title.href = link;
            title.textContent = game.short_title;

            let img_link = game_card.querySelector('#card_img_link');
            img_link.href = link;

            let img = game_card.querySelector('#card_img');
            img.src = game.image_preview;

            game_card.after(new_card);
            game_card = new_card;
        }
        game_card.style.display = 'none';

    }
    )
    .catch(error => {
        console.log(error);
        document.getElementById('error').style.display = 'block';
        document.getElementById('content').style.display = 'none';
    });


function reload_catalog(page) {

    current_page = page;
    offset = page_size * (current_page - 1);
    let url = `/api/games?limit=${page_size}&offset=${offset}&q=${q}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            games = data;
            games_len = games.length;

            if (games_len == 0) {
                console.log(games_len);

                document.getElementById('not_found').style.display = 'block';
                document.getElementById('content').style.display = 'none';
                return;
            } else {
                document.getElementById('not_found').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            }

            let catalog = document.getElementById('catalog');

            for (let i = 0; i < catalog.children.length; i += 1) {
                let card = catalog.children[i];

                if (i >= games_len) {
                    card.style.display = 'none';    
                    continue;
                } else {
                    card.style.display = 'block';  
                }

                let game = games[i];
                const link = `/game.html?id=${game._id['$oid']}`;

                let age = card.querySelector('#card_age');
                age.textContent = game.release_date;

                let title = card.querySelector('#card_full_title');
                title.href = link;
                title.textContent = game.short_title;

                let img_link = card.querySelector('#card_img_link');
                img_link.href = link;

                let img = card.querySelector('#card_img');
                img.src = game.image_preview;


            }

        }
        )
        .catch(error => {
            console.log(error);
            document.getElementById('error').style.display = 'block';
            document.getElementById('content').style.display = 'none';
        });
}

function next_page() {
    current_page += 1;
    reload_catalog(current_page);
}

function prev_page() {
    current_page -= 1;
    if (current_page < 1) {
        current_page = 1;
    }
    reload_catalog(current_page);
}