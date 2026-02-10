// ===== ПРОСТОЙ ТЕЛЕГРАМ БОТ =====
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const token = process.env.BOT_TOKEN || '8116434805:AAEpp2Vsm0qy8DBwqBqacxGoKZgWBrFjyys';
const bot = new TelegramBot(token);

// Команды бота
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 
    '🤖 *Neura AI Bot работает на Render!*\n\n' +
    '📋 *Команды:*\n' +
    '/start - запуск\n' +
    '/help - помощь\n' +
    '/links - ссылки\n' +
    '/money - оплата\n' +
    '/support - поддержка\n\n' +
    '🔗 Сайт: https://ai-toolkit.ru',
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Используйте команды из меню');
});

bot.onText(/\/links/, (msg) => {
  bot.sendMessage(msg.chat.id, '🔗 https://ai-toolkit.ru\n📢 Канал: @ai_hub_2024');
});

bot.onText(/\/money/, (msg) => {
  bot.sendMessage(msg.chat.id, '💳 Тарифы на сайте\n🎁 Промокоды в канале');
});

bot.onText(/\/support/, (msg) => {
  bot.sendMessage(msg.chat.id, '🛠 Напишите в поддержку: @ваш_аккаунт');
});

// Вебхук для Telegram
app.use(express.json());
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  
  if (process.env.RENDER_EXTERNAL_URL) {
    // На Render - используем вебхук
    const webhookUrl = `${process.env.RENDER_EXTERNAL_URL}/webhook`;
    await bot.setWebHook(webhookUrl);
    console.log(`✅ Вебхук установлен: ${webhookUrl}`);
  } else {
    // Локально - polling
    bot.startPolling();
    console.log('🔁 Бот работает через polling (локально)');
  }
});
