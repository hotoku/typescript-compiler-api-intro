import * as ts from "typescript";
const program = ts.createProgram(["src/program.ts"], {});
const source = program.getSourceFile("src/program.ts");
if (!source) {
  process.exit(1);
}

console.log(source.statements);
