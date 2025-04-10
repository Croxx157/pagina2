let mediaRecorder;
let audioChunks = [];

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    document.getElementById("status").innerText = "Micrófono listo 🎧";
    document.getElementById("startRecord").disabled = false;
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      window.audioParaEnviar = audioBlob;
      document.getElementById("sendAudio").disabled = false;
    };
  })
  .catch(() => {
    document.getElementById("status").innerText = "❌ No se pudo acceder al micrófono.";
  });

document.getElementById("startRecord").addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state === "inactive") {
    audioChunks = [];
    mediaRecorder.start();
    document.getElementById("status").innerText = "🎙️ Grabando...";

    setTimeout(() => {
      mediaRecorder.stop();
      document.getElementById("status").innerText = "✅ Grabación lista";
    }, 4000);
  }
});

document.getElementById("sendAudio").addEventListener("click", () => {
  if (!window.audioParaEnviar) return;

  const formData = new FormData();
  formData.append("audio", window.audioParaEnviar, "grabacion.webm");

  fetch("http://localhost:5000/api/audio", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("respuesta").innerText = "🧠 Cortana: " + data.respuesta;
  })
  .catch(() => {
    document.getElementById("respuesta").innerText = "❌ Error al enviar el audio";
  });
});

