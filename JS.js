// Load Live2D model March 7th
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  transparent: true,
  width: 400,
  height: 600
});

PIXI.live2d.Live2DModel.from("March7/March7.model3.json").then(model => {
  model.scale.set(0.3);
  model.x = 100;
  model.y = 400;
  app.stage.addChild(model);
});

// Chatbot logic
async function ask() {
  const input = document.getElementById("input");
  const chatBox = document.getElementById("chat");
  const q = input.value.trim();

  if (!q) return;

  chatBox.innerHTML += "<b>You:</b> " + q + "<br>";

  try {
    const response = await fetch("https://im-snowy.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: q })
    });

    if (!response.ok) {
      throw new Error("API call failed: " + response.status);
    }

    const data = await response.json();
    const ans = data.reply || "Error: No reply from AI";

    chatBox.innerHTML += "<b>March 7th:</b> " + ans + "<br>";
  } catch (err) {
    console.error(err);
    chatBox.innerHTML += "<b>March 7th (error):</b> Could not reach AI<br>";
  }

  input.value = "";
}
