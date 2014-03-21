var demo = new Vue({
  el: '#demo',
  data: {
    tags: ['JavaScript', 'MVVM', 'Vue.js']
  },
  methods: {
    onClickDelete: function(e) {
      this.tags.splice(e.targetVM.$index, 1);
    },
    onFocus: function(e) {
      console.log('onFocus. e.target', e.target);
      console.log('onFocus. targetVM.$el', e.targetVM.$el);
      console.log('onFocus. this', this);
    },
    onBlur: function(e) {
      console.log('onBlur.', e.targetVM);
    },
    mayDeleteLastTag: function(input, e) {
      console.log('mayDeleteLastTag', input, e);
    },
    onKeydown: function(e) {
//      console.log('onKeydown.', e.targetVM);
    },
    onKeyup: function(e) {
//      console.log('onKeyup.', e.targetVM);
    }
  }
});
