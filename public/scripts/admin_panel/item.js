
const params = new URLSearchParams(window.location.search);

let id = params.get('id') || '';
let url = `/api/games?id=${id}`
let game = null
let game_json = null

if (id === '') {
    window.location.replace("/404.html");
}

fetch(url)
    .then(response => response.json())
    .then( data =>{

        game = data;

        game_json = JSON.stringify(game, null, 2);

        
        let text = document.getElementById('text');

        const lines_number = game_json.split('\n').length;
        text.rows = lines_number;
        text.textContent = JSON.stringify(game, null, 2);

        document.getElementById('game_text').textContent = `EDITING GAME: ID=${game._id['$oid']}`
    })
    .catch(error => {
        console.log(error);
        window.location.replace("/404.html");
    });



function update_game(){

    let text = document.getElementById('game_text').textContent;
    let url = `/api/games/update?id=${game._id['$oid']}&body=${text}`
    fetch(
        url
    .then(response => {
        console.log(response.text());
        alert("Game updated!");
    })
    .catch(error => console.log(error)));
    
}

function delete_game() {
    let url = `/api/games/delete?id=${game._id['$oid']}`
    fetch(url)
    .then(response => {
        console.log(response.text())
        alert("Game deleted!");
        window.location.replace("/admin/panel.html");
    })
    .catch(error => console.log(error));
}

function back() {
    window.location.replace("/admin/panel.html");
}