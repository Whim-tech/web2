
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

        let catalog = document.getElementById('catalog');

        for (let i = 0; i < catalog.children.length; i += 1) {
            let card = catalog.children[i];

            if (i >= games_len) {
                card.style.display = 'none';
                continue;
            }

            const game = games[i];
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
            img.alt = `${game.full_title} preview image`;

        }

    }
    )
    .catch(error => {
        console.log(error);
        document.getElementById('error').style.display = 'block';
        document.getElementById('content').style.display = 'none';
    }

    );


