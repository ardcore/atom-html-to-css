'use babel';

import htmlparser from 'htmlparser2';
import { CompositeDisposable } from 'atom';
import { transform } from './transformer';
import { format } from './formatter';

export default {

  config: {
    "nest-classless": {
      "type": "boolean",
      "default": true,
      "description": "Nest first-child classless elements (.someClass { p {} }})"
    }
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
    const preparedJson = transform(htmlJson);
    const css = format(preparedJson);
    if (css) {
      atom.clipboard.write(css);
      atom.notifications.addSuccess('CSS boilerplate copied to clipboard.');
    } else {
      atom.notifications.addError('Parsing failed');
    }
  }
};
