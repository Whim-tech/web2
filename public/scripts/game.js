//  TODO: if id is none => 404 redirect
//  TODO: if id not found => 404 redirect

//  TODO: add good genre rendering
//  TODO: add good articles rendering
//  TODO: add good platforms rendering
// let new_genre = genre.cloneNode(true);
// genre.after(new_genre);

// TODO: get dev by http
// TODO: get genres by http
// TODO: get publisher by http
// TODO: get platforms by http


const params = new URLSearchParams(window.location.search);

let id = params.get('id') || '';
let url = `/api/games?id=${id}`
let game = ''

if (id === '') {
  window.location.replace("/404.html");
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    game = data


    let genres = game.genres;
    let genres_elements = document.getElementsByClassName('genres');

    for (let genre_ of genres) {
      let genre_id = genre_['$oid'];

      fetch(`/api/genres?id=${genre_id}`)
        .then(response => response.json())
        .then(data => {
          genre = data;

          for (let genre_group of genres_elements) {
            let genre_template = genre_group.children[0];

            let new_genre = genre_template.cloneNode(true);
            new_genre.href = `catalog.html?genre=${genre._id['$oid']}`;
            new_genre.textContent = genre.name;
            new_genre.style.display = 'block';
            // new_genre.after(genre_template);
            genre_group.insertBefore(new_genre, genre_template);
          }
        });
    }

    let platforms = game.platforms;
    let platforms_elements = document.getElementsByClassName('platforms');

    for (let platform_ of platforms) {
      let platform_id = platform_['$oid'];

      fetch(`/api/platforms?id=${platform_id}`)
        .then(response => response.json())
        .then(data => {
          platform = data;

          for (let platform_group of platforms_elements) {
            let platform_template = platform_group.children[0];

            let new_platform = platform_template.cloneNode(true);
            new_platform.href = `catalog.html?platform=${platform._id['$oid']}`;
            new_platform.textContent = platform.name;
            new_platform.style.display = 'block';

            platform_group.insertBefore(new_platform, platform_template);
          }
        });
    }

    let full_title = document.getElementById('full_title');
    full_title.textContent = game.full_title;

    let short_title = document.getElementById('short_title');
    short_title.textContent = game.short_title;

    let dev_id = game.developer['$oid'];

    fetch(`/api/developers?id=${dev_id}`)
      .then(response => response.json())
      .then(data => {
        dev = data
        let dev_links = document.getElementsByClassName('dev_link');
        for (let dev_link of dev_links) {
          dev_link.textContent = dev.name;
          dev_link.href = `catalog.html?dev=${dev_id}`
        }
      })

    let pub_id = game.publisher['$oid'];

    fetch(`/api/publishers?id=${pub_id}`)
      .then(response => response.json())
      .then(data => {
        pub = data
        let pub_links = document.getElementsByClassName('pub_link');
        for (let pub_link of pub_links) {
          pub_link.textContent = pub.name;
          pub_link.href = `catalog.html?pub=${dev_id}`
        }
      })


    let big_preview = document.getElementById('big_preview');
    big_preview.src = game.description.big_preview;

    let small_preview = document.getElementById('small_preview');
    small_preview.src = game.description.small_preview;

    let short_description = document.getElementById('short_description');
    short_description.textContent = game.description.short_description;


    let long_description = document.getElementById('long_description');
    let text = long_description.children[0];
    let contents = game.description.long_description;

    for (let i = contents.length - 1; i >= 0; i -= 1) {

      let new_text = text.cloneNode(true);
      let new_header = new_text.children[0];
      let new_content = new_text.children[1];

      new_header.textContent = contents[i].header;
      new_content.textContent = contents[i].content;

      text.after(new_text);
    }
    text.style.display = 'none';


  })
  .catch(error => {
    console.log(error);
    window.location.replace("/404.html");
  });

