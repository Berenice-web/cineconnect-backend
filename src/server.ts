import { createServer } from "http";
import { app } from "./app";
import { initWebSocket } from "./websocket";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const PORT = Number(process.env.PORT) || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

const httpServer = createServer(app);
initWebSocket(httpServer);

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend CineConnect démarré sur port ${PORT}`);
});