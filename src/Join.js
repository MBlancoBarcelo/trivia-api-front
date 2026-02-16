export async function joinRoom(codigo,username) {
    let objeto = {
        "code": codigo,
        "username": username
    }
    fetch(`http://localhost:8083/rooms/7/players`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    })
}