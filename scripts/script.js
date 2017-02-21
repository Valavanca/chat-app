const gallery = document.getElementById('gallery');
const button = document.querySelector('button');
const input = document.querySelector('input');
const replies = document.querySelector('.replies');

// send msg
button.addEventListener('click', addReply);
input.addEventListener('keydown', (e) => {
    if (e.which == 13) { // press enter
        addReply();
    }
});

function addReply() {
    const text = input.value.trim();
    if (!text.length) {
        return;
    }
    const reply = document.createElement('div');
    reply.classList.add('reply');
    reply.innerHTML = `<p>${text}</p>`;
    replies.appendChild(reply);
    input.value = null;
}

// render photos
function drawPhotos(photos) {
    const gallery = document.getElementById('gallery');
    photos.forEach(addPhoto);

    function addPhoto(photo) {
        const container = document.createElement('div');
        const img = document.createElement('img');

        container.classList.add('photo');
        img.src = photo.url;

        container.appendChild(img);
        gallery.appendChild(container);
    }
}

// render profile info
function drawProfile(profile) {
    const avatar = document.querySelector('.avatar');
    const name = document.querySelector('.name');
    const phone = document.querySelector('.phone');
    const email = document.querySelector('.email');

    avatar.src = profile.picture.large;
    name.textContent = `${profile.name.first} ${profile.name.last}`;
    phone.textContent = profile.cell;
    email.textContent = profile.email;
}

// render frends block
function drawFriends(friendList) {
    const targetBlock = document.getElementById('friends');

    friendList.forEach((friend) => {
        let friendItem = document.createElement('div'),
            img = document.createElement('img'),
            span = document.createElement('span');

        friendItem.classList.add('friend')
        span.classList.add('friend_name')
        img.src = friend.picture.medium
        span.innerHTML = friend.name.first + ' ' + friend.name.last

        friendItem.appendChild(img)
        friendItem.appendChild(span)
        targetBlock.appendChild(friendItem)
    });
}

/////////////////////////    GET    /////////////////////////////
function get(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };

    xhr.open('GET', url, true);
    xhr.send(null);
}

get('/photos', (response) => {
    drawPhotos(response);
    get('https://randomuser.me/api/', (response) => {
        drawProfile(response.results[0]);
        get('https://randomuser.me/api/?results=15', (response) => {
            drawFriends(response.results);
        });
    });
});
