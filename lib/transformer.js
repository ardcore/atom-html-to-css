'use babel';

import partial from 'partial-any';

function parseArray(arr, tree) {
  return arr.map(partial(parseNode, tree));
}

function splitClasses(classNames) {
  return classNames.split(" ");
}

function storeElement(store, selectorType, selector) {
  const ret = {
    name: selector,
    type: selectorType,
    children: []
  };
  if (!store.find((el) => el.name === ret.name)) store.push(ret);
}

function parseNode(store, node) {
    if (node.type !== 'tag') return;
    if (node.attribs.class || node.attribs.classname) {
      const classes = splitClasses(node.attribs.class || node.attribs.classname);
      classes.map(partial(storeElement, store, 'class'));
    }

    if (node.attribs.id) {
      storeElement(store,'id', node.attribs.id);
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
