// Lista de perguntas do Quiz Junino
const perguntas = [
    {
        pergunta: "Qual é a bebida quente típica feita com gengibre, cravos, canela e cachaça ou vinho?",
        alternativas: ["Quentão", "Chocolate Quente", "Suco de Milho", "Chá de Capim-Santo"],
        correta: 0
    },
    {
        pergunta: "Qual dança tradicional de origem francesa é indispensável na Festa Junina?",
        alternativas: ["Samba de Roda", "Quadrilha", "Frevo", "Forró Pé de Serra"],
        correta: 1
    },
    {
        pergunta: "Qual destes santos NÃO é comemorado nas festas juninas de junho?",
        alternativas: ["Santo Antônio", "São João", "São Pedro", "São Nicolau"],
        correta: 3
    },
    {
        pergunta: "Qual é a brincadeira onde as pessoas usam uma vara com anzol para pegar peixes de plástico?",
        alternativas: ["Jogo das Argolas", "Boca do Palhaço", "Pescaria", "Correio Elegante"],
        correta: 2
    },
    {
        pergunta: "Qual ingrediente principal é usado na produção do bolo de pamonha, canjica e pipoca?",
        alternativas: ["Trigo", "Milho", "Mandioca", "Arroz"],
        correta: 1
    }
];

// Elementos da página
const caixaInicio = document.querySelector('.caixa-inicio');
const caixaConteudoQuiz = document.querySelector('.caixa-conteudo-quiz');
const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');
const contadorElemento = document.getElementById('contador');

const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Variáveis de controle
let indiceAtual = 0;
let pontuacao = 0;

// Eventos de clique nos botões principais
btnIniciar.addEventListener('click', iniciarQuiz);
btnReiniciar.addEventListener('click', reiniciarQuiz);

function iniciarQuiz() {
    caixaInicio.classList.add('esconder');
    caixaResultado.classList.add('esconder');
    caixaConteudoQuiz.classList.remove('esconder');
    
    indiceAtual = 0;
    pontuacao = 0;
    mostrarPergunta();
}

function mostrarPergunta() {
    // Limpa alternativas anteriores
    caixaAlternativas.innerHTML = '';

    const perguntaAtual = perguntas[indiceAtual];
    
    // Atualiza contador e título da pergunta
    contadorElemento.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
    caixaPerguntas.textContent = perguntaAtual.pergunta;

    // Criar botões para cada opção de resposta
    perguntaAtual.alternativas.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.classList.add('btn-opcao');
        botao.textContent = opcao;
        botao.addEventListener('click', () => selecionarResposta(index));
        caixaAlternativas.appendChild(botao);
    });
}

function selecionarResposta(indiceSelecionado) {
    const perguntaAtual = perguntas[indiceAtual];

    if (indiceSelecionado === perguntaAtual.correta) {
        pontuacao++;
    }

    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        exibirResultado();
    }
}

function exibirResultado() {
    caixaConteudoQuiz.classList.add('esconder');
    caixaResultado.classList.remove('esconder');

    const total = perguntas.length;
    let mensagem = "";

    if (pontuacao === total) {
        mensagem = `Caramba, você é o Rei/Rainha do Milho! 👑🌽<br>Você acertou <strong>${pontuacao}</strong> de <strong>${total}</strong> perguntas!`;
    } else if (pontuacao >= 3) {
        mensagem = `Muito bom, cumpadre! 🔥<br>Você acertou <strong>${pontuacao}</strong> de <strong>${total}</strong> perguntas!`;
    } else {
        mensagem = `Eita! Precisa comer mais pamonha e estudar as tradições! 🪗<br>Você acertou <strong>${pontuacao}</strong> de <strong>${total}</strong> perguntas.`;
    }

    textoResultado.innerHTML = mensagem;
}

function reiniciarQuiz() {
    iniciarQuiz();
}