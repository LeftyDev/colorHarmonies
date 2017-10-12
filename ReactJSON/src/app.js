fetch("data/data.json").then((response) => {
    //if we actually got something
    if (response.ok) {
        //then return the text we loaded
        return response.text();
    }
}).then((text) => {
    let json = JSON.parse(text);
    let dom = document.getElementById("theMusicInMyJson");

    let x = 0;
    while (x < (json.music).length) {
        if (x < (json.music).length) {

            dom.append(json.music[x].artist + ", " + json.music[x].album_name + ", " + (json.music[x].tracks).length + " tracks: ");

            let i = 0;
            while (i < (json.music[x].tracks).length) {
                let track = json.music[x].tracks[i].name;
                if (i < ((json.music[x].tracks).length - 1)) {
                    dom.append(track + ", ");
                } else {
                    dom.append(track + ".");
                }
                i++;
            }

            dom.innerHTML += "<br>";
        }

        x++;
    }
});