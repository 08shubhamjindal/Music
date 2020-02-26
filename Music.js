$(document).ready(function(){
    $('.topnav a').click(function(){
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
});
window.onload = async function() {
     getsearchKeyWord("");
}
async function getsearchKeyWord(){
  var searchKeyWord = document.getElementById("setsearchkeyword").value;
  var getIdofAcitveClass = $(".topnav a.active").attr('id');
  console.log(getIdofAcitveClass);
  var getjsondata;
  var list = [];
  document.getElementById("list").innerHTML = "";
  if(searchKeyWord=="" && getIdofAcitveClass==="home"){
        getjsondata =  await gettoptracks("");
        getjsondata = getjsondata.toptracks.track;
  }else if(searchKeyWord!="" && getIdofAcitveClass==="home"){
        getjsondata =  await gettoptracks(searchKeyWord);
        getjsondata = getjsondata.toptracks.track;
  }else if(searchKeyWord=="" && getIdofAcitveClass==="gettopalbums") {
        getjsondata =  await gettopalbums("");
        getjsondata = getjsondata.topalbums.album;
  }else if(searchKeyWord!="" && getIdofAcitveClass==="gettopalbums"){
        getjsondata =  await gettopalbums(searchKeyWord);
        getjsondata = getjsondata.topalbums.album;
  }else if(searchKeyWord=="" && getIdofAcitveClass==="gettoptracksByLocation") {
        getjsondata =  await gettoptracksByLocation("");
        getjsondata = getjsondata.tracks.track;
  }else if(searchKeyWord!="" && getIdofAcitveClass==="gettoptracksByLocation"){
        getjsondata =  await gettoptracksByLocation(searchKeyWord);
        getjsondata = getjsondata.tracks.track;
  }
  for (user of getjsondata){
      list.push(`<ul class="cards">
      <li class="cards__item">
      <div class="card">
      <div class="card__image card__image--fence"></div>
      <div class="card__content">
        <div class="card__title">${user.name}</div>
        <img src=${user.image[1]['#text']} alt="Avatar" style="width:100%">
        <a href=${user.url} target="_blank">Visit Audio Link</a>
        <button class="btn btn--block card__btn">Button</button>
      </div>
    </div>
  </li>
</ul>`);
    }
    document.getElementById("list").innerHTML += list + "<br/>";
}

async function gettopalbums(searchKeyWord){
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  var url;
  if(searchKeyWord==""){
     url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=2f88bfdd53048e6731918bd0a1480023&format=json";
  }else{
     url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+searchKeyWord+"&api_key=2f88bfdd53048e6731918bd0a1480023&format=json";
  }
  const response= await fetch(proxyurl + url)
  const data = await response.json()
  console.log(data);
  return data;
}

async function gettoptracks(searchKeyWord){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url;
    if(searchKeyWord==""){
       url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=2f88bfdd53048e6731918bd0a1480023&format=json";
    }else{
       url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="+searchKeyWord+"&api_key=2f88bfdd53048e6731918bd0a1480023&format=json";
    }
    const response= await fetch(proxyurl + url)
    const data = await response.json()
    console.log(data);
    return data;
}

async function gettoptracksByLocation(searchKeyWord){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url;
    if(searchKeyWord==""){
       url = "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=india&api_key=2f88bfdd53048e6731918bd0a1480023&format=json";
    }else{
       url = "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country="+searchKeyWord+"&api_key=2f88bfdd53048e6731918bd0a1480023&format=json";
    }
    const response= await fetch(proxyurl + url)
    const data = await response.json()
    console.log(data);
    return data;
}
