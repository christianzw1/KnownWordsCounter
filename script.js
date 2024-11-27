// script.js
const inputWords = document.getElementById('inputWords');
const addWordsButton = document.getElementById('addWordsButton');
const clearWordsButton = document.getElementById('clearWordsButton');
const uniqueWordsList = document.getElementById('uniqueWordsList');
const wordCount = document.querySelector('#wordCount span');

// Armazena as palavras únicas no navegador usando localStorage
let uniqueWordsSet = new Set(JSON.parse(localStorage.getItem('uniqueWords')) || []);

// Função para adicionar palavras únicas
function addUniqueWords() {
  const newWords = inputWords.value
    .toLowerCase()
    .split(/[\s,]+/) // Divide por espaços ou vírgulas
    .filter(word => word.trim() !== ''); // Remove palavras vazias

  newWords.forEach(word => uniqueWordsSet.add(word));
  saveToLocalStorage(); // Salva no localStorage
  renderUniqueWords();  // Atualiza a interface
  inputWords.value = ''; // Limpa o campo de entrada
}

// Função para renderizar palavras únicas na lista
function renderUniqueWords() {
  uniqueWordsList.innerHTML = ''; // Limpa a lista atual
  uniqueWordsSet.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    uniqueWordsList.appendChild(li);
  });
  wordCount.textContent = uniqueWordsSet.size; // Atualiza a contagem
}

// Salva o conjunto de palavras no localStorage
function saveToLocalStorage() {
  localStorage.setItem('uniqueWords', JSON.stringify([...uniqueWordsSet]));
}

// Função para limpar todas as palavras
function clearAllWords() {
  if (confirm('Tem certeza de que deseja limpar todas as palavras?')) {
    uniqueWordsSet.clear();
    saveToLocalStorage();
    renderUniqueWords();
  }
}

// Inicializa a interface ao carregar a página
renderUniqueWords();

// Eventos
addWordsButton.addEventListener('click', addUniqueWords);
clearWordsButton.addEventListener('click', clearAllWords);
