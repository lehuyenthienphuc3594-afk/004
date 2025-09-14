// Load Live2D model March 7th
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  transparent: true,
});
PIXI.live2d.Live2DModel.from("March7/March7.model3.json").then(model => {
  model.scale.set(0.3);
  model.x = 100;
  model.y = 400;
  app.stage.addChild(model);
});

// Chatbot logic
async function ask() {
  const q = document.getElementById("input").value;
  if (!q.trim()) return;

  document.getElementById("chat").innerHTML += `<b>You:</b> ${q}<br>`;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: q })
    });

    const data = await response.json();
    const ans = data.reply || "(No reply)";
    document.getElementById("chat").innerHTML += `<b>March 7th:</b> ${ans}<br>`;
  } catch (err) {
    console.error("Chat error:", err);
    document.getElementById("chat").innerHTML += `<b>Error:</b> Could not reach AI<br>`;
  }

  document.getElementById("input").value = "";
}
