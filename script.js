// Lista de palavras simples
const palavras = ["JAVASCRIPT", "GITHUB", "CODIGO", "TECLADO", "BROWSER"];

let palavraSorteada = "";
let palavraOculta = [];
let tentativas = 6;
let letrasUsadas = [];

// Função que inicia ou reseta o jogo
function iniciarJogo() {
  // Sorteia uma palavra
  const indice = Math.floor(Math.random() * palavras.length);
  palavraSorteada = palavras[indice];

  // Cria os tracinhos de acordo com o tamanho da palavra
  palavraOculta = [];
  for (let i = 0; i < palavraSorteada.length; i++) {
    palavraOculta.push("_");
  }

  // Reseta as variáveis
  tentativas = 6;
  letrasUsadas = [];

  // Atualiza a tela
  document.getElementById("palavra").innerText = palavraOculta.join(" ");
  document.getElementById("tentativas").innerText = tentativas;
  document.getElementById("letrasUsadas").innerText = "";
  document.getElementById("mensagem").innerText = "";
  document.getElementById("btnReiniciar").style.display = "none";
  document.getElementById("letraInput").disabled = false;
  document.getElementById("btnChutar").disabled = false;
  document.getElementById("letraInput").value = "";
  document.getElementById("letraInput").focus();
}

// Função executada ao clicar no botão "Chutar"
function chutarLetra() {
  const input = document.getElementById("letraInput");
  const letra = input.value.toUpperCase();
  input.value = "";
  input.focus();

  // Validação: não aceitar campo vazio
  if (!letra) {
    return;
  }

  // Verifica se a letra já foi usada antes
  if (letrasUsadas.includes(letra)) {
    document.getElementById("mensagem").innerText = "Você já tentou essa letra!";
    return;
  }

  letrasUsadas.push(letra);
  document.getElementById("letrasUsadas").innerText = letrasUsadas.join(", ");

  // Checa se a letra existe na palavra sorteada
  if (palavraSorteada.includes(letra)) {
    for (let i = 0; i < palavraSorteada.length; i++) {
      if (palavraSorteada[i] === letra) {
        palavraOculta[i] = letra;
      }
    }
    document.getElementById("mensagem").innerText = "Boa! Letra correta.";
  } else {
    tentativas--;
    document.getElementById("tentativas").innerText = tentativas;
    document.getElementById("mensagem").innerText = "Errou!";
  }

  // Atualiza os tracinhos na tela
  document.getElementById("palavra").innerText = palavraOculta.join(" ");

  // Verifica se ganhou ou perdeu
  verificarFimDeJogo();
}

function verificarFimDeJogo() {
  // Ganhou
  if (!palavraOculta.includes("_")) {
    document.getElementById("mensagem").innerText = "🎉 Parabéns! Você ganhou!";
    finalizar();
  } 
  // Perdeu
  else if (tentativas <= 0) {
    document.getElementById("mensagem").innerText = "💀 Fim de jogo! A palavra era: " + palavraSorteada;
    finalizar();
  }
}

function finalizar() {
  document.getElementById("letraInput").disabled = true;
  document.getElementById("btnChutar").disabled = true;
  document.getElementById("btnReiniciar").style.display = "inline-block";
}

// Inicia o jogo assim que a página carrega
iniciarJogo();