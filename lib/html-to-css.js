'use babel';

import htmlparser from 'htmlparser2';
import { CompositeDisposable } from 'atom';
import { transform } from './transformer';
import { format } from './formatter';
import { group } from './grouper';

export default {

  config: {
    "bem-group": {
      "title": "BEM grouping",
      "type": "boolean",
      "default": false,
      "description": "Nest & group BEM components (.block { &__element })"
    },
    "bem-separator": {
      "title": "BEM separator token",
      "type": "string",
      "default": "__",
      "description": "Character(s) to separate BEM block from element (BLOCK__ELEMENT)"
    },
    "rulelist-open": {
      "title": "Rulelist open token",
      "type": "string",
      "default": " {\\n\\n",
      "description": "Character(s) to output when opening rulelists (including whitespaces)"
    },
    "rulelist-close": {
      "title": "Rulelist close token",
      "type": "string",
      "default": "}\\n\\n",
      "description": "Character(s) to output when closing rulelists (including whitespaces)"
    },
    "grouping-character": {
      "title": "Grouping token",
      "type": "string",
      "default": "&",
      "description": "Character(s) to output when grouping nested definitions"
    },
    "indent-characters": {
      "title": "Indent characters",
      "type": "string",
      "default": "\t",
      "description": "Characters to indent nested code"
    },

  },

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-to-css:generate': () => this.generate()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

  generate() {
    const pane = atom.workspace.getActivePane();
    const editor = pane.getActiveEditor();
    const text = editor.getSelectedText();
    const htmlJson = htmlparser.parseDOM(text);
    let preparedJson = transform(htmlJson);
    if (atom.config.get('html-to-css.bem-group')) {
      preparedJson = group(preparedJson);
    }
    const css = format(preparedJson);
    if (css) {
      atom.clipboard.write(css);
      atom.notifications.addSuccess('CSS boilerplate copied to clipboard.');
    } else {
      atom.notifications.addError('Parsing failed');
    }
  }
};
