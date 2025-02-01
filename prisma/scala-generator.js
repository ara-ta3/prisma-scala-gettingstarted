#!/usr/bin/env node
const { writeFileSync, mkdirSync } = require("fs");
const path = require("path");

async function main(options) {
  console.log("Prisma Custom Generator: Running...");

  // Prisma から取得したモデルデータを出力
  console.log(
    "Models:",
    JSON.stringify(options.dmmf.datamodel.models, null, 2),
  );

  const outputDir = options.generator.output.value;
  mkdirSync(outputDir, { recursive: true });

  for (const model of options.dmmf.datamodel.models) {
    const className = model.name;
    const fields = model.fields.map((field) => {
      return `    ${field.name}: ${
        mapPrismaTypeToScala(field.type, field.isRequired)
      }`;
    }).join(",\n");

    const scalaClass = `case class ${className}(\n${fields}\n)`;
    const filePath = path.join(outputDir, `${className}.scala`);
    writeFileSync(filePath, scalaClass);
    console.log(`Generated: ${filePath}`);
  }
}

// Prisma の型を Scala の型に変換
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

// ジェネレーターを実行
if (require.main === module) {
  require("@prisma/generator-helper").generatorHandler({
    onManifest: () => ({
      defaultOutput: "./generated",
      prettyName: "Scala Case Class Generator",
    }),
    onGenerate: main,
  });
}
