# atom html-to-css package

Generates CSS boilerplate based on the selected HTML.

Early & opinionated version:
 - Only cares about classes, ignores id's/other possible selectors
 - Outputs flat CSS structure
 - ... with optional classless first-child element nesting (turned on by default)
 - Indents with 2 spaces
 - Made primarily to simplify working with BEM methodology

# demo

![atom html to css](http://dracul.kill.pl/~ard/htmltocss.gif)

# key bindings

To avoid conflicts and promote peace, this package doesn't register any keys by default. Do it
yourself, or just paste in `~/.atom/keymap.cson` the following lines:

    'atom-text-editor':
      'alt-x': 'html-to-css:generate'

It'll try to register `alt-x` key shortcut.

# TODO

 - extend it with different transformers/formatters as settings.

 Contributions welcomed.
