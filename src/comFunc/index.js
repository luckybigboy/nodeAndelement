import MsgTip from './msgTip.vue';
const tip = {};
tip.install = function (vue) {
  vue.component('MsgTip', MsgTip);
}
export default tip;