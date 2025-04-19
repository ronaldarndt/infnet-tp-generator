import { CodeSandbox, type SandboxInfo } from "@codesandbox/sdk";
import config from "./config.json";
import fs from "fs/promises";
import { mdToPdf } from "md-to-pdf";

async function getUrl({ id, title }: SandboxInfo) {
  const resp = await fetch("https://codesandbox.io/api/v1/sandboxes/" + id);
  const data = await resp.json();

  return {
    url: `https://codesandbox.io/p/sandbox/${data.data.alias}`,
    question: Number(title?.split(".").at(-1))
  };
}

const sdk = new CodeSandbox(config.codesandboxToken);

const { sandboxes } = await sdk.sandbox.list();

const list = sandboxes.filter(x => x.title?.startsWith(`DR${config.dr}`));

const nonPublicSandbox = list.find(x => x.privacy !== "public");

if (nonPublicSandbox) {
  throw new Error(`O projeto ${nonPublicSandbox.title} não é público`);
}

const sandboxesInfo = await Promise.all(list.map(getUrl));

const formattedQuestions = sandboxesInfo
  .sort((a, b) => a.question - b.question)
  .map(x => `- Questão ${x.question}. ${x.url}`)
  .join("\n");

const template = await fs.readFile("./template.md", {
  encoding: "utf8"
});

const replacedTemplate = template
  .replace("{{tp}}", config.tp.toString())
  .replace("{{course}}", config.course)
  .replace("{{subject}}", config.subject)
  .replace("{{name}}", config.name)
  .replace("{{professor}}", config.professor)
  .replace("{{date}}", new Date().toLocaleDateString())
  .replace("{{questions}}", formattedQuestions);

const normalizedName = config.name.replaceAll(" ", "_").toLowerCase();
const fileName = `${normalizedName}_DR${config.dr}_TP${config.tp}.pdf`;

await mdToPdf(
  { content: replacedTemplate },
  { dest: fileName, stylesheet: ["./styles.css"] }
);
