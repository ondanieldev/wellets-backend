import { Telegraf, Context } from 'telegraf';

import waifus from '../Data/waifus';

class TelegramBot {
  private bot: Telegraf<Context>;

  constructor() {
    this.bot = new Telegraf(process.env.BOT_TELEGRAM_KEY);
  }

  public awake(): void {
    this.bot.start(ctx => {
      const waifu = waifus[Math.floor(Math.random() * waifus.length)];

      return ctx.reply(
        `Welcome to the Wellets! I'm ${waifu.first_name}-chan and I will be your helper today *-*`,
      );
    });

    this.bot.help(ctx => ctx.reply('Lista de comandos:\n/signup'));

    this.bot.command('signup', ctx => {
      ctx.reply('Digite seu email');

      this.bot.on('message', ctx2 => {
        ctx.reply('Agora digite sua senha');

        this.bot.on('message', ctx3 => {
          ctx.reply('Chamar serviço');
        });
      });
    });

    this.bot.launch();
  }
}

export default TelegramBot;
