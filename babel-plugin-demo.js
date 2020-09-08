module.exports = function ({ types: t }) {
  return {
    name: 'babel-plugin-demo',
    visitor: {
      ImportDeclaration (path, source) {
        const { opts: { libraryName, libraryDirectory = "lib", style = "css" } } = source;
        let node = path.node;
        if (node.source.value !== 'antd') {
          return;
        }
        let newImports = [];
        path.node.specifiers.forEach((item) => {
          newImports.push(t.importDeclaration([t.importDefaultSpecifier(item.local)],
            t.StringLiteral(`${libraryName}/${libraryDirectory}/${item.local.name}`)));
          newImports.push(t.importDeclaration([],t.StringLiteral(`${libraryName}/${libraryDirectory}/style.${style}`)))
        });
        path.replaceWithMultiple(newImports);
      }
      // Identifier(path, state) {
      //   if (path.node.name === 'a') {
      //     path.node.name = 'babel';
      //   }
      // }
    }
  }
}