import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) => {
  const videoURL = `https://www.youtube.com/shorts/${videoId}`
  console.log("Downloading...", videoId);

  ytdl(videoURL, {
    quality: "lowestaudio", filter: "audioonly"
  })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new Error("A duração maior que 60 segundos não é permitida")
      }
    }

  ).on("end", () => {
    console.log("Download concluído!");
  })
  .on("error", (err) => {
    console.error("Não foi possível baixar o vídeo", err);
  }).pipe(fs.createWriteStream(`./tmp/${videoId}.mp4`));
}
