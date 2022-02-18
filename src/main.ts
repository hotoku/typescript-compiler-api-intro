import * as ts from "typescript";
const program = ts.createProgram(["src/test.ts"], {});
const source = program.getSourceFile("src/test.ts");
if (!source) {
  process.exit(1);
}

export interface IIndexable {
  [key: string]: any;
}

const indent = (n: number, cum: string): string => {
  if (n === 0) return cum;
  return indent(n - 1, cum + "    ");
};

const dfs = (
  obj: IIndexable,
  name: string,
  set: Set<object>,
  depth: number
) => {
  const output = `${name}: ${typeof obj}`;
  set.add(obj);
  switch (typeof obj) {
    case "number":
    case "string":
    case "undefined":
    case "boolean":
      console.log(indent(depth, "") + `${output} = ${obj}`);
      break;
    case "function":
      console.log(indent(depth, "") + `${output}`);
      break;
    default:
      console.log(indent(depth, "") + `${output}`);
      for (let n in obj) {
        const child = obj[n];
        if (!set.has(child)) {
          dfs(child, n, set, depth + 1);
        }
      }
  }
};

for (let i in source.statements) {
  const set = new Set<object>();
  const root = source.statements[i];
  dfs(root, `statements[${i}]`, set, 0);
}
