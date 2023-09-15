import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")
const transcriptionElement = document.querySelector("#transcription");

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

  content.textContent = "Obtendo a transcrição do áudio..."
  transcriptionElement.textContent = "Obtendo a transcrição do áudio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."
  transcriptionElement.textContent = "Realizando a transcrição..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")

  transcriptionElement.textContent = transcription.data.result;
  transcriptionElement.classList.remove("placeholder");;
})
