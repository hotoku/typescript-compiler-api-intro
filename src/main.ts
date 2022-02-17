import * as ts from "typescript";
const program = ts.createProgram(["src/test.ts"], {});
const source = program.getSourceFile("src/test.ts");
if (source) {
  console.log(source.statements);
}
