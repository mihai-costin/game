import Boot from './states/boot';
import Game from './states/game';
import Menu from './states/menu';
import Option from './states/option';
import Credit from './states/credit';
import Preloader from './states/preloader';
import Gameover from './states/gameover';
import ChoosePlay from './states/ChoosePlay';

const game = new Phaser.Game(1024, 768, Phaser.AUTO, 'Space War-Battle Day-game');

game.state.add('boot', new Boot());
game.state.add('game', new Game());
game.state.add('menu', new Menu());
game.state.add('option', new Option());
game.state.add('credit', new Credit());
game.state.add('preloader', new Preloader());
game.state.add('gameover', new Gameover());
game.state.add('choose', new ChoosePlay());

game.state.start('boot');
