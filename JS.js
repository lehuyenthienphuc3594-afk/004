// ============================
// Load Live2D model March 7th
// ============================
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  transparent: true,
  width: 400,
  height: 600,
});

let live2dModel = null;

PIXI.live2d.Live2DModel.from("March7/March7.model3.json").then(model => {
  model.scale.set(0.3);
  model.x = 100;
  model.y = 400;
  app.stage.addChild(model);
  live2dModel = model;
});

// ============================
// Chatbot logic
// ============================
async function ask() {
  const inputBox = document.getElementById("input");
  const chatBox = document.getElementById("chat");
  const q = inputBox.value.trim();

  if (!q) return;

  // Hiện câu hỏi người dùng
  chatBox.innerHTML += `<b>You:</b> ${q}<br>`;

  try {
    const response = await fetch("https://forth-one.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: q })
    });

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();
    const ans = data.reply || "(No reply)";

    // Hiện câu trả lời của March 7th
    chatBox.innerHTML += `<b>March 7th:</b> ${ans}<br>`;
    inputBox.value = "";

    // Nếu model có animation thì trigger
    if (live2dModel && live2dModel.motion) {
      live2dModel.motion("TapBody");
    }

  } catch (err) {
    console.error("Error:", err);
    chatBox.innerHTML += `<b>March 7th (error):</b> Could not reach AI<br>`;
  }
}
