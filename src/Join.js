export async function joinRoom(codigo,username,id) {
    
    console.log("batman")

    let objeto = {
        "code": codigo,
        "username": username
    }
    fetch(`http://localhost:8083/rooms/${id}/players`, {
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
        // Aquí puedes redirigir al usuario a la sala o mostrar un mensaje de éxito
    })
    .catch(error => {
        console.error("Error uniendo al jugador:", error);
        // Aquí puedes mostrar un mensaje de error al usuario
    });

}