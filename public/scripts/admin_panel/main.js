

let url = `/api/games`

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

        let list = document.getElementById('list');
        let template = list.children[0];

        for (let i = 0; i < games_len; i += 1) {
            let card = template.cloneNode(true);

            if (i >= games_len) {
                card.style.display = 'none';
                continue;
            }

            const game = games[i];
            const link = `/admin/item.html?id=${game._id['$oid']}`;

            card.href = link;

            let name = card.querySelector('#game_name');
            name.textContent = `NAME: ${game.full_title}`;

            let id = card.querySelector('#game_id');
            id.textContent = `ID: ${game._id['$oid']},`;

            list.appendChild(card);
        }
        template.style.display = 'none';

    }
    )
    .catch(error => {
        console.log(error);
        document.getElementById('error').style.display = 'block';
        document.getElementById('content').style.display = 'none';
    }

    );

