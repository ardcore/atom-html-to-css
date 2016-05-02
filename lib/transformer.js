'use babel';

import partial from 'partial-any';

function parseArray(arr, tree) {
  return arr.map(partial(parseNode, tree));
}

function splitClasses(classNames) {
  return classNames.split(" ");
}

function storeElement(store, className) {
  const ret = {
    name: className,
    children: []
  };
  if (!store.find((el) => el.name === ret.name)) store.push(ret);
}

function parseNode(store, node) {
    if (node.type !== 'tag') return;
    if (node.attribs.class || node.attribs.classname) {
      const classes = splitClasses(node.attribs.class || node.attribs.classname);
      classes.map(partial(storeElement, store));
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
