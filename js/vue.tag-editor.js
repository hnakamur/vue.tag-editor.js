Vue.component('tag-editer-tag-measure', {
  data: {
    text: ''
  },
  replace: true,
  template: 
    '<div class="tag-editor-tag tag-editor-measure" v-ref="tagMeasure">' +
    '<div class="tag-editor-text" v-text="text"></div>' +
    '<a class="tag-editor-delete">x</a>' +
    '</div>'
});

Vue.component('tag-editor-field', {
  replace: true,
  template:
    '<div id="{{id}}" class="tag-editor-field" v-on="click: onClick">' +
    '<div v-component="tag-editer-tag-measure"></div>' +
    '<div v-repeat="tags" class="tag-editor-tag"><div class="tag-editor-text">{{$value}}</div><a class="tag-editor-delete" v-on="click: onClickDelete">x</a></div>' +
    '<input class="tag-editor-input" id="{{inputID}}" v-style="width: inputWidth + \'px\'" v-model="inputVal" v-on="' +
    '  blur: onBlur,' +
    '  keydown: mayDeleteLastTag | key 8,' +
    '  keyup: onKeyup' +
    '"></input>' +
    '</div>',
  data: {
    inputVal: '',
    inputWidth: 0,
    sepRegex: /[, ]+/
  },
  computed: {
    inputID: {
      $get: function() {
        return this.$el.id + "-input";
      }
    }
  },
  ready: function() {
    this.adjustInputWidth('');
  },
  methods: {
    onClickDelete: function(e) {
      this.tags.splice(e.targetVM.$index, 1);
    },
    onClick: function(e) {
      document.getElementById(this.inputID).focus();
    },
    onBlur: function(e) {
      this.mayInsertTags();
    },
    mayDeleteLastTag: function(e) {
      if (!this.inputVal) {
        this.tags.pop();
      }
    },
    onKeyup: function(e) {
      var val = this.inputVal;
      if (val && this.sepRegex.test(val)) {
        this.mayInsertTags();
      } else {
        this.adjustInputWidth(val);
      }
    },
    mayInsertTags: function() {
      // We need to split tag text with separators
      // because text pasted from clipboard may contain those.
      var tags = this.inputVal.split(this.sepRegex), i, len, tag;
      this.inputVal = '';
      for (i = 0, len = tags.length; i < len; i++) {
        tag = tags[i];
        if (tag && this.tags.indexOf(tag) === -1) {
          this.tags.push(tag);
        }
      }
      this.adjustInputWidth('');
    },
    adjustInputWidth: function(val) {
      var tagMeasure = this.$.tagMeasure;
      tagMeasure.text = val + 'WW';
      this.inputWidth = tagMeasure.$el.clientWidth;
    }
  }
});
