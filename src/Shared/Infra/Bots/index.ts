import TelegramBot from './Telegram';

class Bots {
  public run(): void {
    const telegramBot = new TelegramBot();

    telegramBot.awake();
  }
}

export default Bots;
