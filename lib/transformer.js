function parseArray(arr, tree) {
  return arr.map((el) => {
    parseNode(tree, el);
  });
}

function splitClasses(classNames) {
  return classNames.split(" ");
}

function storeElement(store, className, obj) {

  const ret = {
    name: className
  };

  let val = false;
  if (obj.children && atom.config.get('html-to-css.nest-classless')) {
    val = obj.children.filter((el) => {
            return el.type === 'tag' && !el.attribs.class
          }).reduce((acc, cur) => {
            return [cur.name, ...acc];
          }, []);
          ret.children = [ ...new Set(val) ];
  }
  if (!store.find((el) => el.name === ret.name)) store.push(ret);
}

function parseNode(store, node) {
    if (node.type !== 'tag') return;
    if (node.attribs.class) {
      const classes = splitClasses(node.attribs.class);
      classes.map((className) => {
        storeElement(store, className, node);
      });
    }
    if (node.children.length) {
      return parseArray(node.children, store);
    } else {
      return store;
    }
}

exports.transform = function(json) {
  const store = [];
  parseArray(json, store);
  return store;
}
