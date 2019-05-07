const replaceString = (origin, from, offset, str) => {
  const head = origin.substring(0, from);
  const tail = origin.substring(from + offset, origin.length);

  return head.concat(str).concat(tail);
};

const changeUnderscoreToCamel = (str) => {
  return str.split('_').map((item, index) => {
    return index < 1 ? item : `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
  }).join('');
};

const extract = {
  chunkMap: {},
  setChunkMap(chunkMap) {
    this.chunkMap = chunkMap;
  },
  children(c) {
    return c.children.map((child) => {
      if (child.name === 'paragraph') {
        return this[child.name](child);
      }

      return this.children(child);
    });
  },
  paragraph(p) {
    const chunk = (p.children && p.children.length > 0) ? this[p.children[0].name](p.children[0]) : {};

    chunk.style = p.style ? Object.keys(p.style).reduce((styles, name) => {
      const stylesClone = styles;
      if (typeof p.style[name] === 'string' && p.style[name].trim()) {
        stylesClone[name] = p.style[name];
      }
      return stylesClone;
    }, {}) : {};

    return chunk;
  },
  chunk_ref(c) {
    const chunk = this.chunkMap[c.chunk_id];
    let text = chunk[c.type].trim();

    if (c.children) {
      for (const child of c.children) {
        if (child.name === 'segment' && child.data) {
          for (const style of child.data.styles) {
            switch (style) {
              case 'blank':
                text = replaceString(text, child.data.begin, child.data.offset, `---${child.order}---`);
                break;
              default:
            }
          }
        }
      }
    }

    return {
      text,
    };
  },
  extractQuestion(questions) {
    const result = [];

    for (const question of questions) {
      const extracted = {};
      extracted.correctAnswer = question.correct_answer;

      if (question.view_tree && question.view_tree.children) {
        for (const child of question.view_tree.children) {
          if (child.name !== 'blank') {
            extracted[changeUnderscoreToCamel(child.name)] = this.children(child);
          }
        }
        result.push(extracted);
      }
    }

    return result;
  },
  extractPassage(passageBox) {
    const result = {
      root: [],
      passages: [],
      passageTranslations: [],
      vocabularies: passageBox.vocabularies,
    };

    const getPassage = (passages) => {
      let result = [];
      for (const passage of passages) {
        if (passage.view_tree && passage.view_tree.children) {
          result = this.children(passage.view_tree);
        }
      }

      return result;
    };

    // passageBox(root)
    if (passageBox.view_tree && passageBox.view_tree.children) {
      result.root = this.children(passageBox.view_tree);
    }

    // passageBox > passages
    if (passageBox.passages) {
      result.passages = getPassage(passageBox.passages);
    }

    // passageBox > passage translations
    if (passageBox.passage_translations) {
      result.passageTranslations = getPassage(passageBox.passage_translations);
    }

    return result;
  },
};

const quizParser = ({ name, type, preview, questions, chunk_map, passage_box }) => {
  extract.setChunkMap(chunk_map);

  return {
    name,
    type,
    preview,
    questions: questions ? extract.extractQuestion(questions) : [],
    passageBox: passage_box ? extract.extractPassage(passage_box) : [],
  };
};

export default quizParser;
