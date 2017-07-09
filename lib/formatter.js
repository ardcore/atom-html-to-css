'use babel';

var mode = 0 //0: ids and classes, 1: classes, 2: ids

function applyWhitespace(str) {
  return str.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
}

function saveElement(css, el) {
  const RULELIST_OPEN = applyWhitespace(atom.config.get('html-to-css.rulelist-open'));
  const RULELIST_CLOSE = applyWhitespace(atom.config.get('html-to-css.rulelist-close'));
  const GROUPING_CHAR = applyWhitespace(atom.config.get('html-to-css.grouping-character'));

  if(el.type === 'id' && mode !== 1){
    css = css + `#${el.name}${RULELIST_OPEN}`;
  }else if(el.type === 'class' && mode !== 2){
    css = css + `.${el.name}${RULELIST_OPEN}`;
    if (el.children && el.children.length) {
      el.children.map((ch) => {
        const name = ch.name.replace(el.name, GROUPING_CHAR);
        css = css + `\t${name}${RULELIST_OPEN}\t${RULELIST_CLOSE}`;
      });
    }
  }else{
    return css;
  }
  css = css + RULELIST_CLOSE;
  return css;
}

exports.format = function(json, setMode) {
  mode = setMode;
  const css = "";
  return json.reduce(saveElement, css);
}
