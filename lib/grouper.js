'use babel';

import partial from 'partial-any';

const isBlock = (separator, str) => str.indexOf(separator) === -1;

function notInTheTree(needle, pile) {
  return needle.name !== pile.name && pile.children.every(partial(notInTheTree, needle));
}

exports.group = function(json) {
  const _isBlock = partial(isBlock, atom.config.get('html-to-css.bem-separator'));
  let list = json
    .filter((candidate) => _isBlock(candidate.name))
    .map((block) => {
      block.children = block.children.concat(json
        .filter((candidate) => !_isBlock(candidate.name))
        .filter((element) => element.name.startsWith(block.name)))
        return block;
    });

  return list.concat(json
    .filter((el) => {
      return list.every(partial(notInTheTree, el));
    }));
}
