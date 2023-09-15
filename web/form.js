import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content") //resumo
const transcriptionElement = document.querySelector("#transcription");//transcrição

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  transcriptionElement.classList.add("placeholder");

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    (content.textContent = "URL inválida. Não é vídeo de shorts.")
    (transcriptionElement.textContent = "URL inválida. Não é vídeo de shorts.")
    return 
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo a transcrição do áudio..." //resumo
  transcriptionElement.textContent = "Obtendo a transcrição do áudio..." //transcrição texto

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..." //resumo texto
  transcriptionElement.textContent = "Realizando a transcrição..." //transcrição texto

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result //resumo texto
  content.classList.remove("placeholder") //resumo texto

  transcriptionElement.textContent = transcription.data.result; //transcrição texto
  transcriptionElement.classList.remove("placeholder"); //transcrição texto

})
