webpackJsonp([1],{0:function(e,t,n){n("j1ja"),e.exports=n("NHnr")},"2P6i":function(e,t){},"5bu0":function(e,t){},Lowc:function(e,t){},Mejc:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),r=n("mtWM"),a=n.n(r),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var c=n("VU/8")({name:"App"},s,!1,function(e){n("Mejc")},null,null).exports,u=n("/ocq"),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"intro"},[t("button",{staticClass:"intro__startBtn",attrs:{type:"button"},on:{click:this.goTraining}},[this._v("START")])])},staticRenderFns:[]};var l=n("VU/8")({name:"Intro",methods:{goTraining:function(){this.$router.push({name:"Training"})}}},o,!1,function(e){n("5bu0")},"data-v-49243dda",null).exports,h=n("BO1k"),v=n.n(h),d=n("Xxa5"),p=n.n(d),f=n("exGp"),_=n.n(f),g=n("Dd8w"),w=n.n(g),z=n("NYxO"),m={name:"Paragraph",props:{data:{type:Object,required:!0}},computed:{text:function(){return this.data.text},styles:function(){return this.data.styles}}},A={render:function(){var e=this.$createElement;return(this._self._c||e)("p",{style:this.styles},[this._v(this._s(this.data.text))])},staticRenderFns:[]},x=n("VU/8")(m,A,!1,null,null,null).exports,y=n("Gu7T"),k=n.n(y),C={name:"QuizNavigation",props:{count:{type:Number,default:0},value:{type:Number,default:0},callback:{type:Function}},computed:{countArray:function(){return[].concat(k()(Array(this.count).keys())).map(function(e){return e})}},methods:{isActive:function(e){return this.value===e?"quizNavigation__item--active":""},naviItemClick:function(e){this.callback&&this.callback(e)}}},q={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"quizNavigation"},e._l(e.countArray,function(t){return n("div",{key:t,staticClass:"quizNavigation__item",class:e.isActive(t),on:{click:function(n){return e.naviItemClick(t)}}},[e._v("\n    "+e._s("Q"+(t+1))+"\n  ")])}),0)},staticRenderFns:[]};var Q=n("VU/8")(C,q,!1,function(e){n("2P6i")},"data-v-5e638e97",null).exports,S={name:"Quiz",components:{Paragraph:x},props:{question:{type:Object,require:!0},quizno:{type:Number,default:0},isCheckedAnswer:{tyoe:Boolean,default:!1}},data:function(){return{choiceValue:""}},computed:w()({},Object(z.c)(["getQuizSolveState"]),{questionArea:function(){return this.question.questionArea},choiceArea:function(){return this.question.choiceArea},correctAnswer:function(){return this.question.correctAnswer}}),watch:{choiceValue:function(){this.UPDATE_QUIZ_SOLVE_STATE({index:this.quizno,value:this.choiceValue})},getQuizSolveState:function(e){this.choiceValue=e[this.quizno].selectedAnswer}},methods:w()({},Object(z.d)(["UPDATE_QUIZ_SOLVE_STATE"]),{indexToAlphabet:function(e){return["a","b","c","d","e"][e]},isCorrectAnswer:function(e){return this.isCheckedAnswer&&this.correctAnswer===e?"isCorrectAnswer":""},clickLabel:function(e){this.isCheckedAnswer&&e.preventDefault()}})},b={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"quiz"},[e._l(e.questionArea,function(t,i){return n("paragraph",{key:"question"+e.quizno+i,staticClass:"quiz__questionArea",attrs:{data:t}})}),e._v(" "),n("ul",{staticClass:"quiz__choiceArea"},e._l(e.choiceArea,function(t,i){return n("li",{key:"choices"+e.quizno+i,staticClass:"quiz__choiceItem"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.choiceValue,expression:"choiceValue"}],attrs:{type:"radio",id:"choiceItem_"+e.quizno+"_"+i,name:"choiceItem_"+e.quizno},domProps:{value:e.indexToAlphabet(i),checked:e._q(e.choiceValue,e.indexToAlphabet(i))},on:{change:function(t){e.choiceValue=e.indexToAlphabet(i)}}}),e._v(" "),n("label",{class:e.isCorrectAnswer(e.indexToAlphabet(i)),attrs:{for:"choiceItem_"+e.quizno+"_"+i},on:{click:e.clickLabel}},[n("p",{staticClass:"quiz__choiceIndex"},[e._v(e._s(i+1))]),e._v(" "),e._l(t,function(t,i){return n("paragraph",{key:"choice"+e.quizno+i,staticClass:"quiz__choiceText",attrs:{data:t}})})],2)])}),0)],2)},staticRenderFns:[]};var T={name:"Training",created:function(){this.init()},components:{Paragraph:x,QuizNavigation:Q,Quiz:n("VU/8")(S,b,!1,function(e){n("YvqL")},"data-v-bf4fd226",null).exports},data:function(){return{isCheckedAnswer:!1,currentQuizIndex:0,showReview:!1}},computed:w()({},Object(z.c)(["getQuiz","getQuizSolveState"]),{roots:function(){return this.getQuiz.passageBox.root.filter(function(e){return e.text&&e.text.trim()})},toiecType:function(){return this.getQuiz.type},passages:function(){return this.getQuiz.passageBox.passages.filter(function(e){return e.text&&e.text.trim()})},passageTranslations:function(){return this.getQuiz.passageBox.passageTranslations.filter(function(e){return e.text&&e.text.trim()})},vocabularies:function(){return this.getQuiz.passageBox.vocabularies},questions:function(){return this.getQuiz.questions.reduce(function(e,t){var n=t.questionArea.filter(function(e){return e.text&&e.text.trim()}),i=t.choiceArea.reduce(function(e,t){return e.push(t.filter(function(e){return e.text&&e.text.trim()})),e},[]),r=t.correctAnswer;return e.push({questionArea:n,choiceArea:i,correctAnswer:r}),e},[])},isCompleted:function(){return this.getQuizSolveState.every(function(e){return e.isCheckedAnswer})}}),watch:{currentQuizIndex:function(e){this.isCheckedAnswer=this.getQuizSolveState[e].isCheckedAnswer},isCheckedAnswer:function(e){this.getQuizSolveState[this.currentQuizIndex].isCheckedAnswer=e}},methods:w()({},Object(z.d)(["RESET_QUIZ_SOLVE_STATE"]),Object(z.b)(["getQuizAPI"]),{init:function(){var e=this;return _()(p.a.mark(function t(){return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.getQuizAPI();case 3:t.next=8;break;case 5:throw t.prev=5,t.t0=t.catch(0),new Error(t.t0);case 8:case"end":return t.stop()}},t,e,[[0,5]])}))()},quizNavigationClickCallback:function(e){this.getQuizSolveState[this.currentQuizIndex].isCheckedAnswer?this.currentQuizIndex=e:alert("문제를 풀어주세요.")},isCurrentQuiz:function(e){return this.currentQuizIndex===e},checkAnswer:function(){""!==this.getQuizSolveState[this.currentQuizIndex].selectedAnswer?this.isCheckedAnswer=!0:alert("답을 선택해주세요.")},next:function(){this.getQuizSolveState[this.currentQuizIndex].isCheckedAnswer?this.currentQuizIndex<this.questions.length-1&&(this.currentQuizIndex+=1):alert("문제를 풀어주세요.")},review:function(){this.showReview=!0},restart:function(){this.RESET_QUIZ_SOLVE_STATE(),this.showReview=!1,this.isCompleted=!1,this.currentQuizIndex=0;var e=!0,t=!1,n=void 0;try{for(var i,r=v()(this.getQuizSolveState);!(e=(i=r.next()).done);e=!0){var a=i.value;a.selectedAnswer="",a.isCheckedAnswer=!1}}catch(e){t=!0,n=e}finally{try{!e&&r.return&&r.return()}finally{if(t)throw n}}}})},I={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"training"},[n("article",{staticClass:"training__articleArea"},[e._l(e.roots,function(e,t){return n("paragraph",{key:"root"+t,staticClass:"training__articleHeader",attrs:{data:e}})}),e._v(" "),e._l(e.passages,function(e,t){return n("paragraph",{key:"passage"+t,staticClass:"training__articleBody",attrs:{data:e}})})],2),e._v(" "),n("div",{staticClass:"training__quizArea"},[n("div",{staticClass:"training__quizControl"},[e.isCompleted?e.isCompleted?n("p",{staticClass:"training__restart",on:{click:e.restart}},[e._v("다시 풀기")]):e._e():n("p",{staticClass:"training__checkAnswer",on:{click:e.checkAnswer}},[e._v("정답 확인")]),e._v(" "),e.isCompleted?e.isCompleted?n("p",{staticClass:"training__review",on:{click:e.review}},[e._v("리뷰")]):e._e():n("p",{staticClass:"training__nextQuiz",on:{click:e.next}},[e._v("다음 문제")])]),e._v(" "),e.showReview?e.showReview?n("div",{staticClass:"training__reviewArea"},[n("h2",[e._v("해석")]),e._v(" "),e._l(e.passageTranslations,function(e,t){return n("paragraph",{key:"passageT"+t,staticClass:"reviewArea__translate",attrs:{data:e}})}),e._v(" "),n("h2",[e._v("단어")]),e._v(" "),e._l(e.vocabularies,function(t,i){return n("div",{key:i,staticClass:"reviewArea__voca"},[n("p",{staticClass:"voca__word"},[e._v(e._s(t.word))]),e._v(" "),n("p",{staticClass:"voca__meaning"},[e._v(e._s(t.meaning))])])})],2):e._e():n("div",{staticClass:"training__quiz"},[n("quiz-navigation",{staticClass:"training__quizNavigation",attrs:{count:e.questions.length,callback:e.quizNavigationClickCallback},model:{value:e.currentQuizIndex,callback:function(t){e.currentQuizIndex=t},expression:"currentQuizIndex"}}),e._v(" "),e._l(e.questions,function(t,i){return n("quiz",{directives:[{name:"show",rawName:"v-show",value:e.isCurrentQuiz(i),expression:"isCurrentQuiz(index)"}],key:i,attrs:{question:t,quizno:i,isCheckedAnswer:e.isCheckedAnswer}})})],2)])])},staticRenderFns:[]};var E=n("VU/8")(T,I,!1,function(e){n("Lowc")},"data-v-a80260c4",null).exports;i.a.use(u.a);var V,O=new u.a({mode:"history",routes:[{path:"/",name:"Intro",component:l},{path:"/training",name:"Training",component:E}]}),U=n("bOdI"),N=n.n(U),P="QUIZ",R="QUIZ_SOLVE_STATE",j="UPDATE_QUIZ_SOLVE_STATE",L="RESET_QUIZ_SOLVE_STATE",B=(V={},N()(V,P,function(e,t){for(var n in t)({}).hasOwnProperty.call(t,n)&&(e.QuizState.quiz[n]=t[n])}),N()(V,R,function(e,t){var n;(n=e.QuizState.quizSolveState).push.apply(n,k()(t))}),N()(V,j,function(e,t){var n=t.index,i=t.value;e.QuizState.quizSolveState[n].selectedAnswer=i}),N()(V,L,function(e){console.log("!!!HERE!!!"),e.QuizState.quizSolveState=e.QuizState.quiz.questions.reduce(function(e){return e.push({selectedAnswer:"",isCheckedAnswer:!1}),e},[])}),V),M=function(){return a.a.get("/api/quiz")},Z=n("fZjL"),$=n.n(Z),F={chunkMap:{},setChunkMap:function(e){this.chunkMap=e},children:function(e){var t=this;return e.children.map(function(e){return"paragraph"===e.name?t[e.name](e):t.children(e)})},paragraph:function(e){var t=e.children&&e.children.length>0?this[e.children[0].name](e.children[0]):{};return t.style=e.style?$()(e.style).reduce(function(t,n){var i=t;return"string"==typeof e.style[n]&&e.style[n].trim()&&(i[n]=e.style[n]),i},{}):{},t},chunk_ref:function(e){var t,n,i,r,a,s,c=this.chunkMap[e.chunk_id][e.type].trim();if(e.children){var u=!0,o=!1,l=void 0;try{for(var h,d=v()(e.children);!(u=(h=d.next()).done);u=!0){var p=h.value;if("segment"===p.name&&p.data){var f=!0,_=!1,g=void 0;try{for(var w,z=v()(p.data.styles);!(f=(w=z.next()).done);f=!0){switch(w.value){case"blank":t=c,n=p.data.begin,i=p.data.offset,r="---"+p.order+"---",a=void 0,void 0,a=t.substring(0,n),s=t.substring(n+i,t.length),c=a.concat(r).concat(s)}}}catch(e){_=!0,g=e}finally{try{!f&&z.return&&z.return()}finally{if(_)throw g}}}}}catch(e){o=!0,l=e}finally{try{!u&&d.return&&d.return()}finally{if(o)throw l}}}return{text:c}},extractQuestion:function(e){var t,n=[],i=!0,r=!1,a=void 0;try{for(var s,c=v()(e);!(i=(s=c.next()).done);i=!0){var u=s.value,o={};if(o.correctAnswer=u.correct_answer,u.view_tree&&u.view_tree.children){var l=!0,h=!1,d=void 0;try{for(var p,f=v()(u.view_tree.children);!(l=(p=f.next()).done);l=!0){var _=p.value;"blank"!==_.name&&(o[(t=_.name,t.split("_").map(function(e,t){return t<1?e:""+e.charAt(0).toUpperCase()+e.slice(1)}).join(""))]=this.children(_))}}catch(e){h=!0,d=e}finally{try{!l&&f.return&&f.return()}finally{if(h)throw d}}n.push(o)}}}catch(e){r=!0,a=e}finally{try{!i&&c.return&&c.return()}finally{if(r)throw a}}return n},extractPassage:function(e){var t=this,n={root:[],passages:[],passageTranslations:[],vocabularies:e.vocabularies},i=function(e){var n=[],i=!0,r=!1,a=void 0;try{for(var s,c=v()(e);!(i=(s=c.next()).done);i=!0){var u=s.value;u.view_tree&&u.view_tree.children&&(n=t.children(u.view_tree))}}catch(e){r=!0,a=e}finally{try{!i&&c.return&&c.return()}finally{if(r)throw a}}return n};return e.view_tree&&e.view_tree.children&&(n.root=this.children(e.view_tree)),e.passages&&(n.passages=i(e.passages)),e.passage_translations&&(n.passageTranslations=i(e.passage_translations)),n}},D=function(e){var t=e.name,n=e.type,i=e.preview,r=e.questions,a=e.chunk_map,s=e.passage_box;return F.setChunkMap(a),{name:t,type:n,preview:i,questions:r?F.extractQuestion(r):[],passageBox:s?F.extractPassage(s):[]}},H={getQuizAPI:function(e){var t=this;return _()(p.a.mark(function n(){var i,r,a;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,M();case 3:i=t.sent,r=D(i.data),e.commit(P,r),a=r.questions.reduce(function(e){return e.push({selectedAnswer:"",isCheckedAnswer:!1}),e},[]),e.commit(R,a),t.next=13;break;case 10:throw t.prev=10,t.t0=t.catch(0),new Error(t.t0);case 13:case"end":return t.stop()}},n,t,[[0,10]])}))()}};i.a.use(z.a);var Y=new z.a.Store({state:{QuizState:{quiz:{type:"",preview:"",name:"",passageBox:{passageTranslations:[],passages:[],root:[],vocabularies:[]},questions:[]},quizSolveState:[]}},getters:{getQuiz:function(e){return e.QuizState.quiz},getQuizSolveState:function(e){return e.QuizState.quizSolveState}},mutations:B,actions:H});i.a.config.productionTip=!1,i.a.prototype.$http=a.a,new i.a({el:"#app",router:O,components:{App:c},template:"<App/>",store:Y})},YvqL:function(e,t){}},[0]);
//# sourceMappingURL=app.99638872e2a5a51eb793.js.map