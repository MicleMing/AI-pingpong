import $ from 'jquery';
import PingPong from './PingPong';

$(document).ready(function () {
  const pingpong = new PingPong();
  pingpong.play();
});
