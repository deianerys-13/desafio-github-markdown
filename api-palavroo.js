// ============================================
// Integração com API Palavroo
// ============================================

const API_URL = "https://palavroo-api.vercel.app";

// 1️⃣ Pegar UMA palavra aleatória
async function pegarPalavraAleatoria() {
  try {
    const response = await fetch(`${API_URL}/random`);
    const data = await response.json();
    console.log("Palavra:", data.palavra);
    return data.palavra.toUpperCase();
  } catch (error) {
    console.error("Erro ao buscar palavra:", error);
    return "JAVASCRIPT"; // Fallback
  }
}

// 2️⃣ Pegar TODAS as palavras
async function pegarTodasPalavras() {
  try {
    const response = await fetch(`${API_URL}/words`);
    const data = await response.json();
    console.log("Total de palavras:", data.length);
    return data;
  } catch (error) {
    console.error("Erro ao buscar palavras:", error);
    return [];
  }
}

// 3️⃣ Pegar palavra por dificuldade (se a API suporta)
async function pegarPorDificuldade(dificuldade) {
  try {
    const response = await fetch(`${API_URL}/words?difficulty=${dificuldade}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar por dificuldade:", error);
    return [];
  }
}

// 4️⃣ Iniciar um novo jogo
async function iniciarJogo() {
  const palavra = await pegarPalavraAleatoria();
  return {
    palavra: palavra,
    tentativas: 6,
    letrasErradas: [],
    letrasAcertadas: [],
    gameOver: false
  };
}
