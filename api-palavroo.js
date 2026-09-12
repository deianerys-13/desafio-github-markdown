// ============================================
// Integração com API Palavroo
// ============================================

const API_URL = "https://palavroo-api.vercel.app";

// Array de palavras como fallback se a API falhar
const palavrasLocal = [
  "JAVASCRIPT",
  "PROGRAMAÇÃO",
  "COMPUTADOR",
  "DESENVOLVEDOR",
  "ALGORITMO",
  "FUNÇÃO",
  "VARIÁVEL",
  "CONSTANTE",
  "ARRAY",
  "OBJETO",
  "MÉTODO",
  "CLASSE",
  "HERANÇA",
  "BANCO",
  "DADOS",
  "SERVIDOR",
  "CLIENTE",
  "REQUISIÇÃO",
  "RESPOSTA",
  "PROTOCOLO",
  "INTERNET",
  "NAVEGADOR",
  "APLICAÇÃO",
  "SOFTWARE",
  "HARDWARE",
  "REDE",
  "SEGURANÇA",
  "CRIPTOGRAFIA",
  "AUTENTICAÇÃO",
  "AUTORIZAÇÃO",
  "SESSÃO",
  "COOKIE",
  "TOKEN",
  "API",
  "FRAMEWORK",
  "BIBLIOTECA",
  "DEPENDÊNCIA",
  "VERSÃO",
  "PACKAGE",
  "MÓDULO",
  "COMPONENTE",
  "ESTADO",
  "PROPS",
  "EVENTO",
  "LISTENER",
  "CALLBACK",
  "PROMISE",
  "ASYNC",
  "AWAIT",
  "ERROR",
  "EXCEÇÃO",
  "DEBUG",
  "TESTE",
  "INTEGRAÇÃO",
  "DEPLOYMENT",
  "COMMIT",
  "BRANCH",
  "MERGE",
  "CONFLITO",
  "REPOSITÓRIO",
  "VERSIONAMENTO",
  "GIT",
  "GITHUB",
  "DOCKER",
  "CONTAINER",
  "VIRTUALIZAÇÃO",
  "CLOUD",
  "HOSPEDAGEM",
  "DOMÍNIO",
  "DNS",
  "SSL",
  "CERTIFICADO",
  "FIREWALL",
  "PROXY",
  "GATEWAY",
  "MIDDLEWARE",
  "ROTEAMENTO",
  "PADRÃO",
  "ARQUITETURA",
  "DESIGN",
  "REFATORAÇÃO",
  "OTIMIZAÇÃO",
  "PERFORMANCE",
  "CACHE",
  "INDEXAÇÃO",
  "QUERY",
  "SQL",
  "NOSQL",
  "RELACIONAL",
  "DOCUMENTO",
  "TRANSAÇÃO",
  "CONSISTÊNCIA",
  "DISPONIBILIDADE",
  "TOLERÂNCIA",
  "DISTRIBUÍDO"
];

// 1️⃣ Pegar palavra aleatória - tenta API, senão usa local
async function pegarPalavraAleatoria() {
  try {
    console.log("🔄 Tentando buscar palavra da API Palavroo...");
    const response = await fetch(`${API_URL}/random`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro da API: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("✅ Palavra da API:", data.palavra);
    return data.palavra.toUpperCase();
  } catch (error) {
    console.warn("⚠️ API indisponível, usando palavras locais:", error);
    // Se a API falhar, pega uma palavra aleatória do array local
    return pegarPalavraLocal();
  }
}

// 2️⃣ Pegar palavra aleatória local
function pegarPalavraLocal() {
  const indiceAleatorio = Math.floor(Math.random() * palavrasLocal.length);
  const palavra = palavrasLocal[indiceAleatorio];
  console.log("📚 Palavra local:", palavra);
  return palavra;
}

// 3️⃣ Pegar TODAS as palavras
async function pegarTodasPalavras() {
  try {
    const response = await fetch(`${API_URL}/words`);
    const data = await response.json();
    console.log("Total de palavras:", data.length);
    return data;
  } catch (error) {
    console.error("Erro ao buscar palavras:", error);
    return palavrasLocal;
  }
}

// 4️⃣ Pegar palavra por dificuldade (se a API suporta)
async function pegarPorDificuldade(dificuldade) {
  try {
    const response = await fetch(`${API_URL}/words?difficulty=${dificuldade}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar por dificuldade:", error);
    return palavrasLocal;
  }
}

// 5️⃣ Iniciar um novo jogo
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
