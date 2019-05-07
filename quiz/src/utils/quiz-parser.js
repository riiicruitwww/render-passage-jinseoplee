const replaceString = (origin, from, offset, str) => {
  const head = origin.substring(0, from);
  const tail = origin.substring(from + offset, origin.length);
  return head.concat(str).concat(tail);
};

const extract = {
  chunkMap: {},
  question_area(qa) {
    const paragraphArray = [];
    if (qa.children) {
      for (const child of qa.children) {
        paragraphArray.push(this[child.name](child));
      }
    }
    return paragraphArray;
  },
  choice_area(ca) {
    const choiceArray = [];
    if (ca.children) {
      for (const child of ca.children) {
        choiceArray.push(this[child.name](child));
      }
    }
    return choiceArray;
  },
  choice(c) {
    const paragraphArray = [];
    if (c.children) {
      for (const child of c.children) {
        paragraphArray.push(this[child.name](child));
      }
    }
    return paragraphArray;
  },
  setChunkMap(chunkMap) {
    this.chunkMap = chunkMap;
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
        if (child.name === 'segment') {
          const s = child;
          if (s.data) {
            for (const style of s.data.styles) {
              switch (style) {
                case 'blank':
                  text = replaceString(text, s.data.begin, s.data.offset, `---${child.order}---`);
                  break;
                default:
              }
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
          if (child.name === 'question_area') {
            extracted.questionArea = this[child.name](child);
          } else if (child.name === 'choice_area') {
            extracted.choiceArea = this[child.name](child);
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

    // passageBox(root)
    if (passageBox.view_tree && passageBox.view_tree.children) {
      for (const child of passageBox.view_tree.children) {
        const root = this[child.name](child);
        root.id = `root${result.root.length}`;
        result.root.push(this[child.name](child));
      }
    }

    // passageBox > passages
    if (passageBox.passages) {
      for (const passage of passageBox.passages) {
        if (passage.view_tree && passage.view_tree.children) {
          for (const child of passage.view_tree.children) {
            const passageParagraph = this[child.name](child);
            passageParagraph.id = `passage${result.passages.length}`;
            result.passages.push(passageParagraph);
          }
        }
      }
    }

    // passageBox > passage translations
    if (passageBox.passage_translations) {
      for (const passage of passageBox.passage_translations) {
        if (passage.view_tree && passage.view_tree.children) {
          for (const child of passage.view_tree.children) {
            const passageTranslationsParagraph = this[child.name](child);
            passageTranslationsParagraph.id = `passageTranslations${result.passageTranslations.length}`;
            result.passageTranslations.push(passageTranslationsParagraph);
          }
        }
      }
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
