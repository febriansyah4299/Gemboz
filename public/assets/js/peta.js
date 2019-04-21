//Menampilkan peta
var mymap = new L.map('mapid').setView([-7.4462755,112.7162229], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18}).addTo(mymap);

// Menampilkan Lokasi User
mymap.locate({setView: true, Zoom: 16, maxZoom: 18});
function onLocationFound(e) {
    var radius = e.accuracy / 2;
    L.circle(e.latlng, radius).addTo(mymap).bindPopup("Lokasi Anda, Akurasi " + radius + " Meter").openPopup();;
}
mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationerror', onLocationError);

// Menampilkan Marker dan Popup
function findLocation(x,y) {
    //console.log(x,y);
    for (var i = 0; i < places.length; i++){
        if(places[i].lokasi[0]==x && places[i].lokasi[1]==y){
            return i;
        }
    }
    return -1;
}
function showLocation(e) {
    //console.log("you clicked" + e.latlng.lat + "dan" e.latlng.lng);
    let ix = findLocation(e.latlng.lat, e.latlng.lng);
    if (ix >= 0) {
        img.src = places[ix].gambar;
        judul.textContent = places[ix].sponsor;
        alamat.textContent = places[ix].alamat;
        telp.textContent = places[ix].telp;
        buka.textContent = places[ix].buka;
    }
}

let gmb = document.getElementById("gmb");
let rev = document.getElementById("review");
let img = document.createElement('img');
let judul = document.createElement('h5');
let alamat = document.createElement('p');
let telp = document.createElement('p');
let buka = document.createElement('p');

img.classList.add("card-img");
judul.classList.add("card-title");
alamat.classList.add("card-text")

gmb.appendChild(img);
rev.appendChild(judul);
rev.appendChild(alamat);
rev.appendChild(telp);
rev.appendChild(buka);

//let places = null;
const URL = "./assets/data/peta.json";
async function f(URL){
    try{
        const resp = await(fetch("./assets/data/peta.json"));
        const resp2 = await resp.json();
        localStorage.setItem('places', JSON.stringify(resp.places))
        places = resp2.places;
        for (var p of places) {
            var marker = L.marker(p.lokasi).addTo(mymap).bindPopup(p.sponsor);
            marker.on('click', showLocation);
        }
    }
    catch(err){
        console.log(err);
    }
}
f(URL);