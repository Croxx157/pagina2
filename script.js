const btn = document.getElementById("hablarBtn");
const textoUsuario = document.getElementById("textoUsuario");
const respuestaGPT = document.getElementById("respuestaGPT");

const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
reconocimiento.lang = "es-ES";
reconocimiento.interimResults = false;

btn.addEventListener("click", () => {
  reconocimiento.start();
});

reconocimiento.onresult = async (event) => {
  const texto = event.results[0][0].transcript;
  textoUsuario.textContent = "Tú: " + texto;

  const respuesta = await obtenerRespuestaDeGPT(texto);
  respuestaGPT.textContent = "GPT: " + respuesta;

  const utterance = new SpeechSynthesisUtterance(respuesta);
  utterance.lang = "es-ES";
  speechSynthesis.speak(utterance);
};

async function obtenerRespuestaDeGPT(pregunta) {
  // Simulación local (puedes reemplazar por tu API real)
  return `Dijiste: "${pregunta}". Esta es una respuesta simulada.`;
  
  // Para usar con la API real:
  /*
  const apiKey = "TU_API_KEY_AQUI";
  const respuesta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: pregunta }],
    })
  });
  const data = await respuesta.json();
  return data.choices[0].message.content.trim();
  */
}

