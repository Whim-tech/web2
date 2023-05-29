
const page_size = 18;
let url = `/api/games?limit=${page_size}`

fetch(url)
    .then(response => response.json())
    .then(data => {

        games = data;
        games_len = games.length;

        if (games_len == 0) {
            console.log(games_len);
    
            document.getElementById('error').style.display = 'block';
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
    }

    );


