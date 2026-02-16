export async function hacerAlgo() {
  let codigo = generateCode()
  let prueba = codigo+"";
  let objeto = {
    "code":prueba
  }
  fetch("http://localhost:8083/rooms",{
    method:"post",
    body: JSON.stringify(objeto),
    headers:{
      "Content-Type": "application/json"
    }
  })
}



function generateCode(){
    return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
}