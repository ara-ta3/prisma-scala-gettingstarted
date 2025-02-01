const { writeFileSync, mkdirSync } = require("fs");
const path = require("path");

/**
 * Prisma カスタムジェネレーター: Scala case class を生成
 */
module.exports = async function (options) {
  const outputDir = options.generator.output.value;

  // 出力ディレクトリを作成（存在しない場合）
  mkdirSync(outputDir, { recursive: true });

  // モデルごとに case class を生成
  for (const model of options.dmmf.datamodel.models) {
    const className = model.name;
    const fields = model.fields.map((field) => {
      return `    ${field.name}: ${
        mapPrismaTypeToScala(field.type, field.isRequired)
      }`;
    }).join(",\n");

    // case class のコード生成
    const scalaClass = `case class ${className}(\n${fields}\n)`;

    // ファイルへ書き出し
    const filePath = path.join(outputDir, `${className}.scala`);
    writeFileSync(filePath, scalaClass);
    console.log(`Generated: ${filePath}`);
  }
};

/**
 * Prisma の型を Scala の型へマッピング
 */
function mapPrismaTypeToScala(prismaType, isRequired) {
  const typeMapping = {
    Int: "Int",
    String: "String",
    Boolean: "Boolean",
    DateTime: "java.time.LocalDateTime",
    Float: "Double",
    Decimal: "BigDecimal",
  };

  const scalaType = typeMapping[prismaType] || "String"; // デフォルト String
  return isRequired ? scalaType : `Option[${scalaType}]`; // NULL なら Option 型
}
