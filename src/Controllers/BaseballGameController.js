import BaseballGame from '../Models/BaseballGame.js';
import InputView from '../Views/InputView.js';
import OutputView from '../Views/OutputView.js';
import { validationUtils } from '../utils/validationUtils.js';

export default class BaseballGameController {
  #inputView;
  #outputView;
  #baseballGame;

  constructor(inputView, outputView, baseballGame) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#baseballGame = baseballGame;
  }

  async play() {
    this.#outputView.printStart();
    while (!this.#baseballGame.isGameEnded()) {
      if (this.#baseballGame.isInCommandPhase()) {
        await this.#readCommandInput(this.#baseballGame);
        continue;
      }
      await this.#readNumbersInput(this.#baseballGame);
    }
  }

  async #readNumbersInput(game) {
    const input = await this.#inputView.readUserInputNumbers();
    this.#processNumbers(game, input);
  }

  #processNumbers(game, input) {
    validationUtils.validateNumbers(input);
    const matchResult = game.handleUserPitches(input);
    this.#outputView.printMatchResult(matchResult);
  }

  async #readCommandInput(game) {
    const input = await this.#inputView.readUserInputCommand();
    this.#processCommand(game, input);
  }

  #processCommand(game, input) {
    validationUtils.validateCommand(input);
    game.handleUserCommand(input);
  }
}
