#!/usr/bin/env node
const { writeFileSync, mkdirSync } = require("fs");
const path = require("path");
const { generatorHandler } = require("@prisma/generator-helper");

generatorHandler({
  onManifest: () => ({}),

  onGenerate: async (options) => {
    console.log("Prisma Custom Generator: Running...");

    const outputDir = options.generator.output.value;
    mkdirSync(outputDir, { recursive: true });

    for (const model of options.dmmf.datamodel.models) {
      const className = toPascalCase(model.name);
      const fileName = className + ".scala";

      const fields = model.fields.map((field) => {
        return `    ${field.name}: ${
          mapPrismaTypeToScala(field.type, field.isRequired)
        }`;
      }).join(",\n");

      const scalaClass = `case class ${className}(\n${fields}\n)`;

      const filePath = path.join(outputDir, fileName);
      writeFileSync(filePath, scalaClass);
      console.log(`Generated: ${filePath}`);
    }
  },
});

function mapPrismaTypeToScala(prismaType, isRequired) {
  const typeMapping = {
    Int: "Int",
    String: "String",
    Boolean: "Boolean",
    DateTime: "java.time.LocalDateTime",
    Float: "Double",
    Decimal: "BigDecimal",
  };

  const scalaType = typeMapping[prismaType] || "String";
  return isRequired ? scalaType : `Option[${scalaType}]`;
}

function toPascalCase(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

if (require.main === module) {
  require("@prisma/generator-helper").generatorHandler({
    onGenerate: main,
  });
}
