import path from "path";
import templates from "../src/theme-switch-element/templates/templates-loader";
import { minify } from "html-minifier-terser";

const templatesDir = path.resolve(
  import.meta.dir,
  "..",
  "src/theme-switch-element/templates",
);

const loadTemplate = async (templateName: keyof typeof templates) => {
  const templatePath = path.resolve(templatesDir, templates[templateName]);
  const templateFile = Bun.file(templatePath);
  const exists = await templateFile.exists();
  if (!exists) {
    throw new Error(`Template ${templateName} does not exist`);
  }
  templates[templateName] = await minify(await templateFile.text(), {
    minifyCSS: true,
    minifyJS: true,
    collapseWhitespace: true,
  });
};

const loaderTasks = Object.keys(templates).map((templateName) =>
  loadTemplate(templateName as keyof typeof templates)
);

await Promise.all(loaderTasks);

Bun.write(
  path.resolve(templatesDir, "index.ts"),
  `export default ${JSON.stringify(templates, null, 2)};`,
);
