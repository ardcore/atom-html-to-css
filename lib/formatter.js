function saveElement(css, el) {
  css = css + "." + el.name + " {\n\n";
  if (el.children && el.children.length) {
    el.children.map((ch) => {
      css = css + "\t" + ch + " {\n\n\t}\n";
    });
  }
  css = css + "}\n\n";
  return css;
}

exports.format = function(json) {
  const css = "";
  return json.reduce(saveElement, css);
}
