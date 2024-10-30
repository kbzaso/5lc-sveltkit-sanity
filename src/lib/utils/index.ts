export * from "./preview-cookies";

export let LocaleConfig: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  timeZone: "America/Santiago",
  month: "short",
  day: "numeric",
};

// Función para obtener el id de un video de YouTube
export function extractYouTubeId(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function convertNewlinesToBreaks(text) {
  return text.replace(/\n/g, "<br>");
}