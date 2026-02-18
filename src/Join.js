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
    })

}