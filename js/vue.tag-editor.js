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

var demo = new Vue({
  el: '#demo',
  data: {
    tags: ['JavaScript', 'MVVM', 'Vue.js'],
    input: '',
    inputWidth: 0,
    tagRegex: /^(.*)[, ]+$/,
    sepRegex: /[, ]+/m
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
      var val = e.targetVM.input;
      this.insertTag(val.replace(this.sepRegex, ''));
    },
    mayDeleteLastTag: function(e) {
      var val = e.targetVM.input;
      if (!val) {
        this.tags.pop();
      }
    },
    onKeyup: function(e) {
      var val = e.targetVM.input, matches, tags, i, len;
      if (val) {
        matches = this.tagRegex.exec(val);
        if (matches) {
          // We need to split tag text with separators
          // because text pasted from clipboard may contain those.
          tags = matches[1].split(this.sepRegex);
          for (i = 0, len = tags.length; i < len; i++) {
            this.insertTag(tags[i]);
          }
        } else {
          this.adjustInputWidth(val);
        }
      }
    },
    insertTag: function(tag) {
      this.input = '';
      if (tag && this.tags.indexOf(tag) === -1) {
        this.tags.push(tag);
      }
    },
    adjustInputWidth: function(val) {
      var tagMeasure = this.$.tagMeasure;
      tagMeasure.text = val + 'WW';
      this.inputWidth = tagMeasure.$el.clientWidth;
    }
  }
});
