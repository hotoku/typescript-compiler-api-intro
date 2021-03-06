import * as ts from "typescript";
const program = ts.createProgram(["src/program.ts"], {});
const source = program.getSourceFile("src/program.ts");
if (!source) {
  process.exit(1);
}

const findFunction = (source: ts.SourceFile) => {
  const route = {
    SourceFile: (node: ts.SourceFile) => {
      const st = node.statements;
      for (let ch of st) {
        switch (ch.kind) {
          case ts.SyntaxKind.VariableStatement:
            route.VariableStatement(ch as ts.VariableStatement);
            break;
        }
      }
    },
    VariableStatement: (node: ts.VariableStatement) => {
      const dlist = node.declarationList.declarations;
      for (let ch of dlist) {
        switch (ch.kind) {
          case ts.SyntaxKind.VariableDeclaration:
            route.VariableDeclaration(ch as ts.VariableDeclaration);
            break;
        }
      }
    },
    VariableDeclaration: (node: ts.VariableDeclaration) => {
      const name = node.name;
      switch (name.kind) {
        case ts.SyntaxKind.Identifier:
          route.Identifier(name as ts.Identifier);
      }
    },
    Identifier: (node: ts.Identifier) => {
      const name = node.escapedText;
      console.log(`name=${name}`);
    },
  };
  route.SourceFile(source);
};

findFunction(source);
