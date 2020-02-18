window.onload = async function() {
  var getjsondata = await getUserAsync();
  console.log(getjsondata.toptracks.track[1].image[1]['#text']);
  var list = [];
  for (user of getjsondata.toptracks.track){
      list.push(
         `<div class="card">
         <img src=${user.image[0]['#text']} alt="Avatar" style="width:100%">
          <div class="container">
          <h4><b>${user.name}</b></h4>
          <p>${user.playcount}</p>
          <a href=${user.url} target="_blank">Visit Audio Link</a>
          </div></div>`);
    }
     document.getElementById("list").innerHTML += list + "<br/>";
}
async function getUserAsync(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=2f88bfdd53048e6731918bd0a1480023&format=json";
    const response= await fetch(proxyurl + url)
    const data = await response.json()
    console.log(data);
    return data;
}
// <li>
// <h1>${user.name}</h1>
// <p>${user.playcount}</p>
// <p>${user.listeners}</p>
// <p>${user.listeners}</p>
// <p>${user.mbid}</p>
// <a href=${user.url} target="_blank">Visit Movie Link</a>
  // </li>
