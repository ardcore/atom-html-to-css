'use babel';

function applyWhitespace(str) {
  return str.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
}

function saveElement(css, el) {
  const RULELIST_OPEN = applyWhitespace(atom.config.get('html-to-css.rulelist-open'));
  const RULELIST_CLOSE = applyWhitespace(atom.config.get('html-to-css.rulelist-close'));
  const GROUPING_CHAR = applyWhitespace(atom.config.get('html-to-css.grouping-character'));

  css = css + `.${el.name}${RULELIST_OPEN}`;
  if (el.children && el.children.length) {
    el.children.map((ch) => {
      const name = ch.name.replace(el.name, GROUPING_CHAR);
      css = css + `\t${name}${RULELIST_OPEN}\t${RULELIST_CLOSE}`;
    });
  }
  css = css + RULELIST_CLOSE;
  return css.replace(/\t/g, atom.config.get('html-to-css.indent-characters'));
}

exports.format = function(json) {
  const css = "";
  return json.reduce(saveElement, css);
}
