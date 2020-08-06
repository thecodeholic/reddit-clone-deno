import {
  Application,
} from "./deps.ts";
import router from "./router.ts";
import "./database.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

await app.listen({ port: 8080 });
