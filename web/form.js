const form = document.querySelector('#form');
const input = document.querySelector('#url');
const content = document.querySelector('#content');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const videoURL = input.value;
  
  if(!videoURL.includes('shorts')) {
    content.textContent = 'URL inválida! Não é um vídeo shorts';
    return
  }

  const params = videoURL.split('/shorts/')[1];
  const videoID = params.split('?si')[0];

  content.textContent = "Obtendo o texto do áudio do vídeo";
})

