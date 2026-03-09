export async function joinRoom(codigo,username,id) {
    

    let objeto = {
        "code": codigo,
        "username": username
    }
    fetch(`https://triviaapi.artemrudenko.com/rooms/${id}/players`, {
        method: "POST",

        headers: {
           "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    }).then(response => response.json())
    .then(data => {
        console.log("Jugador unido:", data);
        let token = data.token;
        let idplayer = data.player.id;
        localStorage.setItem("token", token);
        localStorage.setItem("playerId", idplayer);
        window.location.href = `/rooms?id=${id}&code=${codigo}&playerId=${idplayer}`;
    })
    .catch(error => {
        console.error("Error uniendo al jugador:", error);
    });

}