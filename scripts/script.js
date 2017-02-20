let xhr = new XMLHttpRequest()
let result = null;
const gallery = document.getElementById('gallery');
const button = document.querySelector('button');
const input = document.querySelector('input');
const replies = document.querySelector('.replies');
//const avatar = document.getElementsByClassName('.avatar')

button.addEventListener('click', function(e) {
  let text = input.value.trim()

  let reply = document.createElement('div')
  reply.classList.add('reply')
  reply.innerHTML = '<p>${text}</p>'
  replies.appendChild(reply)
  input.value = null
})

// function get(url) {
//   xhr.onreadystatechange = (e) => {
//     if (xhr.status == 200 & xhr.readyState == 4) {
//
//     }
//   }
//   xhr.open("GET", url, true)
//   xhr.send(null)
// }

// //////////////////

xhr.onreadystatechange = (e) => {
  if (xhr.status == 200 & xhr.readyState == 4) {
    // console.log(JSON.parse(xhr.responseText).photos)
    let photos = JSON.parse(xhr.responseText)

    for (let i = 0; i < photos.length; i++) {
      let photo = document.createElement('div'),
          img = document.createElement('img')

          photo.classList.add('photo')

          img.src = photos[i].url
          photo.appendChild(img)
          gallery.appendChild(photo)
    }

    // start 2-th
    xhr = new XMLHttpRequest()
    xhr.onreadystatechange = (e) => {
      if (xhr.status == 200 & xhr.readyState == 4) {
        let response = JSON.parse(xhr.responseText).results[0]

        let prifile_block = document.getElementById('profile')
        let avatar = prifile_block.getElementsByClassName('avatar')[0]
        let name = prifile_block.getElementsByClassName('name')[0]
        let phone = prifile_block.getElementsByClassName('phone')[0]
        let email = prifile_block.getElementsByClassName('email')[0]

        // console.log("selector:", prifile_block);
        console.log("Avt:", avatar);

        avatar.src = response.picture.large
        name.innerHTML = response.name.first + ' ' + response.name.last
        phone.innerHTML = response.cell
        email.innerHTML = response.email

        // start 3-th
        xhr = new XMLHttpRequest()
        xhr.onreadystatechange = (e) => {
          if (xhr.status == 200 & xhr.readyState == 4) {
            let friends = JSON.parse(xhr.responseText).results

            let target_block = document.getElementById('friends')
            for (let i = 0; i < friends.length; i++) {
              let friend_item = document.createElement('div'),
                  img = document.createElement('img')
                  span = document.createElement('span')

                  friend_item.classList.add('friend')
                  span.classList.add('friend_name')
                  img.src = friends[i].picture.medium
                  span.innerHTML = friends[i].name.first + ' ' + friends[i].name.last

                  friend_item.appendChild(img)
                  friend_item.appendChild(span)
                  target_block.appendChild(friend_item)
            }

          }
        }
        xhr.open("GET", "https://randomuser.me/api/?results=15")
        xhr.send(null)
        // end 3-th
      }
    }
    xhr.open("GET", "https://randomuser.me/api/")
    xhr.send(null)
    // end 2-th
  }
}

xhr.open("GET", "/photo")
xhr.send(null)
// end 1th
