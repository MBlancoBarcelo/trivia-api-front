export async function hacerAlgo() {
  try {
    let codigo = generateCode();
    let objeto = {
      code: codigo + ""
    };

    const response = await fetch("http://localhost:8083/rooms", {
      method: "POST",
      body: JSON.stringify(objeto),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    const roomId = data.code;
    const id = data.id;

    const link = `${window.location.origin}/join?code=${roomId}&id=${id}`;

    localStorage.setItem("id", id);

    await navigator.clipboard.writeText(link);

    console.log("Sala creada:", roomId);
    console.log("Link copiado:", link);

    return link;

  } catch (error) {
    console.error("Error creando la sala:", error);
  }
}




function generateCode(){
    return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
}