let mediaRecorder;
let audioChunks = [];

// Pedir acceso al micrófono
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
      audioChunks = [];
      document.getElementById("sendAudio").disabled = false;
      // Guardar en variable global
      window.audioParaEnviar = audioBlob;
    };
  })
  .catch(err => {
    document.getElementById("status").innerText = "❌ No se pudo acceder al micrófono.";
    console.error(err);
  });

// Iniciar grabación
document.getElementById("startRecord").addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state === "inactive") {
    audioChunks = [];
    mediaRecorder.start();
    document.getElementById("status").innerText = "🎙️ Grabando...";

    setTimeout(() => {
      mediaRecorder.stop();
      document.getElementById("status").innerText = "✅ Grabación lista";
    }, 4000); // 4 segundos
  }
});

// Enviar grabación
document.getElementById("sendAudio").addEventListener("click", () => {
  if (!window.audioParaEnviar) return;

  const formData = new FormData();
  formData.append("audio", window.audioParaEnviar, "grabacion.webm");

  fetch("/api/audio", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (response.ok) {
      document.getElementById("status").innerText = "✅ Audio enviado correctamente";
      document.getElementById("sendAudio").disabled = true;
    } else {
      document.getElementById("status").innerText = "❌ Error al enviar el audio";
    }
  })
  .catch(error => {
    console.error("Error al enviar el audio:", error);
    document.getElementById("status").innerText = "❌ Error de conexión";
  });
});

