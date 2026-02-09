export function hacerAlgo() {


  let code = generateCode()
  return code;

}

function generateCode(){
    return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
}