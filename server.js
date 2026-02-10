// ===== ПРОДВИНУТЫЙ БОТ: TELEGRAM + VK =====
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const axios = require('axios');

const app = express();

// ===== КОНСТАНТЫ =====
const SITE_URL = 'https://ai-toolkit.ru';
const TG_MAIN_CHANNEL = '@ai_hub_2024';
const TG_PARTNER_CHANNEL = '@ai_toolkit_partner09';
const TG_BOT = '@NeuraAI_Assistant_bot';
const SUPPORT_USER = '@Ivancherem';
const SUPPORT_EMAIL = 'support@ai-toolkit.ru';
const VK_GROUP = 'vk.com/ai_cherem7';

// ===== TELEGRAM БОТ =====
const tgToken = process.env.BOT_TOKEN || '8116434805:AAEpp2Vsm0qy8DBwqBqacxGoKZgWBrFjyys';
const tgBot = new TelegramBot(tgToken);

// Меню команд Telegram
tgBot.setMyCommands([
  { command: 'start', description: '🚀 Запустить бота' },
  { command: 'help', description: '📋 Помощь и инструкции' },
  { command: 'links', description: '🔗 Полезные ссылки' },
  { command: 'channels', description: '📢 Наши каналы' },
  { command: 'money', description: '💳 Оплата и тарифы' },
  { command: 'support', description: '🛠 Техническая поддержка' },
  { command: 'tools', description: '🛠️ Все инструменты AI' },
  { command: 'promo', description: '🎁 Актуальные промокоды' },
  { command: 'vk', description: '📱 Наше сообщество VK' }
]);

// ===== TELEGRAM КОМАНДЫ =====

// /start
tgBot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'Пользователь';
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '🌐 Наш сайт', url: SITE_URL },
        { text: '📢 Наш канал', url: `https://t.me/${TG_MAIN_CHANNEL.replace('@', '')}` }
      ],
      [
        { text: '🤝 Партнёрский канал', url: `https://t.me/${TG_PARTNER_CHANNEL.replace('@', '')}` },
        { text: '📱 Сообщество VK', url: `https://${VK_GROUP}` }
      ],
      [
        { text: '🛠 Все инструменты', callback_data: 'tools' },
        { text: '🎁 Промокоды', callback_data: 'promo' }
      ],
      [
        { text: '💳 Тарифы', callback_data: 'money' },
        { text: '🛠 Поддержка', callback_data: 'support' }
      ],
      [
        { text: '📢 Все каналы', callback_data: 'channels' },
        { text: '🔗 Все ссылки', callback_data: 'links' }
      ]
    ]
  };

  tgBot.sendMessage(chatId,
    `🤖 *Привет, ${userName}! Я Neura AI Assistant*\n\n` +
    `📢 *Теперь я работаю и в VK тоже!*\n` +
    `Сообщество: ${VK_GROUP}\n\n` +
    `📋 *Основные команды:*\n` +
    `• /start - это меню\n` +
    `• /help - помощь и FAQ\n` +
    `• /links - все наши ресурсы\n` +
    `• /channels - Telegram каналы\n` +
    `• /vk - наше сообщество VK\n` +
    `• /money - тарифы и оплата\n` +
    `• /support - техподдержка\n` +
    `• /tools - каталог AI инструментов\n` +
    `• /promo - актуальные промокоды\n\n` +
    `🔍 *Можете просто спросить меня о:*\n` +
    `• AI инструментах\n` +
    `• Промокодах\n` +
    `• Тарифах\n` +
    `• Техподдержке\n` +
    `• Наших каналах`,
    { 
      parse_mode: 'Markdown',
      reply_markup: keyboard
    }
  );
});

// /help
tgBot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  tgBot.sendMessage(chatId,
    `🆘 *Центр помощи Neura AI Bot*\n\n` +
    `*Частые вопросы:*\n\n` +
    `❓ *Где взять промокод?*\n` +
    `В наших Telegram каналах:\n` +
    `• ${TG_MAIN_CHANNEL}\n` +
    `• ${TG_PARTNER_CHANNEL}\n\n` +
    `❓ *Как оплатить подписку?*\n` +
    `На сайте ${SITE_URL} в разделе "Тарифы"\n\n` +
    `❓ *Не работает инструмент?*\n` +
    `Напишите в поддержку: ${SUPPORT_USER}\n\n` +
    `❓ *Где все AI инструменты?*\n` +
    `На сайте в каталоге или команда /tools\n\n` +
    `❓ *Зачем два канала?*\n` +
    `• ${TG_MAIN_CHANNEL} - новости, промокоды\n` +
    `• ${TG_PARTNER_CHANNEL} - партнёрские материалы\n\n` +
    `❓ *Есть ли VK сообщество?*\n` +
    `Да! ${VK_GROUP}\n\n` +
    `📞 *Контакты:*\n` +
    `• Сайт: ${SITE_URL}\n` +
    `• Каналы: ${TG_MAIN_CHANNEL} и ${TG_PARTNER_CHANNEL}\n` +
    `• VK: ${VK_GROUP}\n` +
    `• Поддержка: ${SUPPORT_USER}`,
    { parse_mode: 'Markdown' }
  );
});

// /links
tgBot.onText(/\/links/, (msg) => {
  const chatId = msg.chat.id;
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '🌐 Основной сайт', url: SITE_URL },
        { text: '🛠 Каталог инструментов', url: `${SITE_URL}/#tools` }
      ],
      [
        { text: '📢 Основной канал', url: `https://t.me/${TG_MAIN_CHANNEL.replace('@', '')}` },
        { text: '🤝 Партнёрский канал', url: `https://t.me/${TG_PARTNER_CHANNEL.replace('@', '')}` }
      ],
      [
        { text: '📱 Сообщество VK', url: `https://${VK_GROUP}` },
        { text: '💬 Чат сообщества', url: 'https://t.me/ai_community_chat' }
      ],
      [
        { text: '📚 Документация', url: `${SITE_URL}/docs` },
        { text: '🎥 Видеоуроки', url: 'https://youtube.com/@ai-toolkit' }
      ]
    ]
  };
  
  tgBot.sendMessage(chatId,
    `🔗 *Все полезные ссылки Neura AI*\n\n` +
    `*Основные ресурсы:*\n` +
    `• 🌐 Сайт: ${SITE_URL}\n` +
    `• 📢 Основной канал: ${TG_MAIN_CHANNEL}\n` +
    `• 🤝 Партнёрский канал: ${TG_PARTNER_CHANNEL}\n` +
    `• 📱 Сообщество VK: ${VK_GROUP}\n` +
    `• 🤖 Этот бот: ${TG_BOT}\n\n` +
    `*Дополнительно:*\n` +
    `• 💬 Чат сообщества\n` +
    `• 📚 Документация\n` +
    `• 🎥 Видеоуроки\n` +
    `• 🛠 Каталог 100+ AI инструментов`,
    { 
      parse_mode: 'Markdown',
      reply_markup: keyboard 
    }
  );
});

// /channels
tgBot.onText(/\/channels/, (msg) => {
  const chatId = msg.chat.id;
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '📢 Основной канал', url: `https://t.me/${TG_MAIN_CHANNEL.replace('@', '')}` },
        { text: '🤝 Партнёрский канал', url: `https://t.me/${TG_PARTNER_CHANNEL.replace('@', '')}` }
      ],
      [
        { text: '📱 Сообщество VK', url: `https://${VK_GROUP}` },
        { text: '💬 Чат сообщества', url: 'https://t.me/ai_community_chat' }
      ]
    ]
  };
  
  tgBot.sendMessage(chatId,
    `📢 *Наши сообщества и каналы*\n\n` +
    `*1. Telegram каналы:*\n` +
    `• ${TG_MAIN_CHANNEL} - основной\n` +
    `• ${TG_PARTNER_CHANNEL} - партнёрский\n\n` +
    `*2. Сообщество VK:*\n` +
    `• ${VK_GROUP}\n\n` +
    `*3. Чат сообщества:*\n` +
    `• Обсуждение AI инструментов\n` +
    `• Помощь друг другу\n` +
    `• Обмен опытом\n\n` +
    `✅ *Подписывайтесь на все!*`,
    { 
      parse_mode: 'Markdown',
      reply_markup: keyboard 
    }
  );
});

// /vk
tgBot.onText(/\/vk/, (msg) => {
  const chatId = msg.chat.id;
  
  tgBot.sendMessage(chatId,
    `📱 *Наше сообщество ВКонтакте*\n\n` +
    `Мы теперь есть и в VK!\n\n` +
    `🔗 Ссылка: ${VK_GROUP}\n\n` +
    `*Что в сообществе:*\n` +
    `• Новости о AI\n` +
    `• Полезные материалы\n` +
    `• Обсуждения\n` +
    `• И свой бот тоже! 🤖\n\n` +
    `*Присоединяйтесь!*`,
    { parse_mode: 'Markdown' }
  );
});

// /money
tgBot.onText(/\/money/, (msg) => {
  const chatId = msg.chat.id;
  
  tgBot.sendMessage(chatId,
    `💳 *Информация об оплате*\n\n` +
    `*Тарифы доступны на сайте:*\n` +
    `${SITE_URL}/#pricing\n\n` +
    `*Способы оплаты:*\n` +
    `✅ Банковские карты (Visa/Mastercard/МИР)\n` +
    `✅ Криптовалюта (BTC, ETH, USDT)\n` +
    `✅ ЮMoney, Qiwi, WebMoney\n` +
    `✅ СБП (быстрый перевод)\n\n` +
    `*Скидки и промокоды:*\n` +
    `🎁 Подпишитесь на каналы:\n` +
    `• ${TG_MAIN_CHANNEL}\n` +
    `• ${TG_PARTNER_CHANNEL}\n` +
    `🎁 Актуальные промокоды там же\n\n` +
    `*Вопросы по оплате?*\n` +
    `Напишите: ${SUPPORT_USER}`,
    { parse_mode: 'Markdown' }
  );
});

// /support
tgBot.onText(/\/support/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.username || msg.from.first_name;
  
  const keyboard = {
    inline_keyboard: [[
      { 
        text: '✉️ Написать в поддержку', 
        url: `https://t.me/${SUPPORT_USER.replace('@', '')}` 
      }
    ]]
  };
  
  tgBot.sendMessage(chatId,
    `🛠 *Техническая поддержка Neura AI*\n\n` +
    `*По вопросам:*\n` +
    `• Работы бота\n` +
    `• Оплаты и промокодов\n` +
    `• Технических проблем\n` +
    `• Предложений по улучшению\n` +
    `• Партнёрства и сотрудничества\n\n` +
    `*Контакты поддержки:*\n` +
    `👤 Менеджер: ${SUPPORT_USER}\n` +
    `📧 Email: ${SUPPORT_EMAIL}\n` +
    `🌐 Форма на сайте: ${SITE_URL}/#contact\n\n` +
    `*Время ответа:*\n` +
    `⏰ Обычно в течение 1-2 часов\n` +
    `⏰ В рабочее время (10:00-20:00 МСК)`,
    { 
      parse_mode: 'Markdown',
      reply_markup: keyboard
    }
  );
});

// /tools
tgBot.onText(/\/tools/, (msg) => {
  const chatId = msg.chat.id;
  
  tgBot.sendMessage(chatId,
    `🛠️ *Каталог AI инструментов*\n\n` +
    `На нашем сайте доступно 100+ AI инструментов:\n\n` +
    `*📝 Текст и контент:*\n` +
    `• ChatGPT, Claude, Gemini\n` +
    `• Нейросети для написания текстов\n` +
    `• Переводчики, рерайтеры\n\n` +
    `*🎨 Изображения и дизайн:*\n` +
    `• Midjourney, DALL-E, Stable Diffusion\n` +
    `• Генераторы логотипов, дизайна\n\n` +
    `*🎵 Аудио и видео:*\n` +
    `• Генераторы голоса, музыки\n` +
    `• Нейросети для монтажа видео\n\n` +
    `*💻 Код и разработка:*\n` +
    `• GitHub Copilot, Tabnine\n` +
    `• Помощники для программирования\n\n` +
    `🔍 *Смотреть все инструменты:*\n` +
    `${SITE_URL}/#tools\n\n` +
    `📢 *Новости об инструментах:*\n` +
    `Следите в наших каналах!`,
    { parse_mode: 'Markdown' }
  );
});

// /promo
tgBot.onText(/\/promo/, (msg) => {
  const chatId = msg.chat.id;
  
  tgBot.sendMessage(chatId,
    `🎁 *Актуальные промокоды*\n\n` +
    `*Текущие акции:*\n\n` +
    `🔥 *NEWYEAR25* - 25% скидка\n` +
    `Действует до: 15.02.2026\n` +
    `Для всех тарифов\n\n` +
    `🚀 *AIWEEK* - 15% скидка\n` +
    `Действует до: 28.02.2026\n` +
    `Для тарифов Pro и Business\n\n` +
    `🎯 *FIRSTTIME* - 10% скидка\n` +
    `Действует: всегда\n` +
    `Для новых пользователей\n\n` +
    `*Где искать промокоды:*\n` +
    `1. Основной канал: ${TG_MAIN_CHANNEL}\n` +
    `2. Партнёрский канал: ${TG_PARTNER_CHANNEL}\n` +
    `3. Новые промокоды публикуем каждую неделю\n` +
    `4. Эксклюзивные скидки для подписчиков\n\n` +
    `*Как активировать промокод:*\n` +
    `1. Зайдите на ${SITE_URL}\n` +
    `2. Выберите тариф\n` +
    `3. Введите промокод при оплате`,
    { parse_mode: 'Markdown' }
  );
});

// ===== TELEGRAM CALLBACK КНОПКИ =====
tgBot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  
  if (data === 'tools') {
    tgBot.sendMessage(chatId, `🛠️ *Каталог инструментов:* ${SITE_URL}/#tools\n📢 *Новости в каналах:* ${TG_MAIN_CHANNEL} и ${TG_PARTNER_CHANNEL}`, { parse_mode: 'Markdown' });
  } 
  else if (data === 'promo') {
    tgBot.sendMessage(chatId, `🎁 *Промокоды в каналах:*\n• ${TG_MAIN_CHANNEL} (основной)\n• ${TG_PARTNER_CHANNEL} (партнёрский)`, { parse_mode: 'Markdown' });
  } 
  else if (data === 'money') {
    tgBot.sendMessage(chatId, `💳 *Тарифы:* ${SITE_URL}/#pricing\n🎁 *Промокоды:* ${TG_MAIN_CHANNEL}`, { parse_mode: 'Markdown' });
  } 
  else if (data === 'support') {
    tgBot.sendMessage(chatId, `🛠 *Поддержка:* ${SUPPORT_USER}\n📧 ${SUPPORT_EMAIL}`, { parse_mode: 'Markdown' });
  }
  else if (data === 'channels') {
    tgBot.sendMessage(chatId, 
      `📢 *Наши каналы:*\n\n` +
      `*1. ${TG_MAIN_CHANNEL}* - основной\n` +
      `Новости, промокоды, обзоры\n\n` +
      `*2. ${TG_PARTNER_CHANNEL}* - партнёрский\n` +
      `Партнёрские материалы, спецпредложения\n\n` +
      `*3. ${VK_GROUP}* - сообщество VK\n` +
      `Новости о AI, обсуждения\n\n` +
      `✅ *Подписывайтесь!*`,
      { parse_mode: 'Markdown' }
    );
  }
  else if (data === 'links') {
    tgBot.sendMessage(chatId,
      `🔗 *Все ссылки:*\n\n` +
      `🌐 Сайт: ${SITE_URL}\n` +
      `📢 Telegram: ${TG_MAIN_CHANNEL}\n` +
      `🤝 Партнёрский: ${TG_PARTNER_CHANNEL}\n` +
      `📱 VK: ${VK_GROUP}\n` +
      `🤖 Бот: ${TG_BOT}`,
      { parse_mode: 'Markdown' }
    );
  }
  
  // Подтверждаем нажатие кнопки
  tgBot.answerCallbackQuery(callbackQuery.id);
});

// ===== TELEGRAM ОБРАБОТКА ЛЮБОГО ТЕКСТА =====
tgBot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    const chatId = msg.chat.id;
    const userText = msg.text.toLowerCase();
    
    if (userText.includes('привет') || userText.includes('здравствуй') || userText.includes('hello')) {
      tgBot.sendMessage(chatId, `👋 Привет! Я Neura AI Assistant. Используйте /help для списка команд.`);
    }
    else if (userText.includes('vk') || userText.includes('вк') || userText.includes('vkontakte')) {
      tgBot.sendMessage(chatId, `📱 *Наше сообщество VK:* ${VK_GROUP}\nИли команда /vk`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('канал') || userText.includes('каналы') || userText.includes('telegram') || userText.includes('тг')) {
      tgBot.sendMessage(chatId, `📢 *Наши каналы:* ${TG_MAIN_CHANNEL} и ${TG_PARTNER_CHANNEL}\nИли команда /channels`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('промокод') || userText.includes('скидк') || userText.includes('акци') || userText.includes('sale')) {
      tgBot.sendMessage(chatId, `🎁 *Промокоды в каналах:* ${TG_MAIN_CHANNEL} и ${TG_PARTNER_CHANNEL}\nИли команда /promo`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('оплат') || userText.includes('тариф') || userText.includes('цен') || userText.includes('price')) {
      tgBot.sendMessage(chatId, `💳 *Тарифы:* ${SITE_URL}/#pricing\nИли команда /money`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('сайт') || userText.includes('ресурс') || userText.includes('ссылка') || userText.includes('site')) {
      tgBot.sendMessage(chatId, `🔗 *Сайт:* ${SITE_URL}\n*Каналы:* ${TG_MAIN_CHANNEL} и ${TG_PARTNER_CHANNEL}\nИли команда /links`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('поддержк') || userText.includes('помощ') || userText.includes('вопрос') || userText.includes('help')) {
      tgBot.sendMessage(chatId, `🛠 *Поддержка:* ${SUPPORT_USER}\nИли команда /support`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('инструмент') || userText.includes('нейросет') || userText.includes('ai') || userText.includes('chatgpt') || userText.includes('midjourney')) {
      tgBot.sendMessage(chatId, `🛠️ *Каталог AI инструментов:* ${SITE_URL}/#tools\nИли команда /tools`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('партнер') || userText.includes('сотруднич') || userText.includes('partner')) {
      tgBot.sendMessage(chatId, `🤝 *Партнёрство:*\nСвяжитесь с ${SUPPORT_USER}\nИли посетите партнёрский канал: ${TG_PARTNER_CHANNEL}`, { parse_mode: 'Markdown' });
    }
  }
});

// Telegram вебхук
app.use(express.json());
app.post('/webhook', (req, res) => {
  tgBot.processUpdate(req.body);
  res.sendStatus(200);
});

// ===== VK BOT (оставляем ваш текущий код VK) =====
const VK_TOKEN = process.env.VK_TOKEN;
const VK_CONFIRMATION = 'neura2024bot';

if (VK_TOKEN) {
  console.log('✅ VK токен найден, настраиваю бота...');
  
  // Обработчик Callback API от VK
  app.post('/vk-callback', (req, res) => {
    const event = req.body;
    
    // 1. Подтверждение сервера
    if (event.type === 'confirmation') {
      console.log('🔐 VK запросил подтверждение');
      return res.send(VK_CONFIRMATION);
    }
    
    // 2. Новое сообщение
    if (event.type === 'message_new') {
      const message = event.object.message;
      const userId = message.from_id;
      const text = (message.text || '').toLowerCase().trim();
      
      console.log(`📩 VK сообщение от ${userId}: "${text}"`);
      
      // Определяем ответ
      let response = '';
      
      if (text === 'привет' || text === 'start' || text === 'старт' || text === 'начать' || text === 'здравствуйте') {
        response = 
          `🤖 *Привет! Я Neura AI Assistant для VКонтактe!*\n\n` +
          `📋 *Доступные команды:*\n` +
          `• сайт - наш основной сайт\n` +
          `• каналы - наши Telegram каналы\n` +
          `• тарифы - информация об оплате\n` +
          `• промокоды - актуальные промокоды\n` +
          `• поддержка - техническая поддержка\n\n` +
          `🌐 *Сайт:* ${SITE_URL}\n` +
          `📢 *Telegram каналы:*\n` +
          `• ${TG_MAIN_CHANNEL} (новости и промокоды)\n` +
          `• ${TG_PARTNER_CHANNEL} (партнёрский)\n\n` +
          `🤖 *Полный функционал в Telegram боте:*\n` +
          `${TG_BOT}\n\n` +
          `💳 *Тарифы:* ${SITE_URL}/#pricing\n` +
          `🛠 *Поддержка:* ${SUPPORT_USER}`;
      }
      else if (text === 'сайт' || text.includes('сайт') || text === 'site') {
        response = 
          `🌐 *Наш сайт:* ${SITE_URL}\n\n` +
          `💳 *Тарифы:* ${SITE_URL}/#pricing\n` +
          `🛠 *Инструменты:* ${SITE_URL}/#tools\n\n` +
          `📢 *Telegram:* ${TG_BOT}`;
      }
      else if (text === 'каналы' || text.includes('канал') || text.includes('telegram') || text.includes('тг')) {
        response = 
          `📢 *Наши Telegram каналы:*\n\n` +
          `*1. ${TG_MAIN_CHANNEL}* - основной\n` +
          `• Новости мира AI\n` +
          `• Эксклюзивные промокоды\n` +
          `• Обзоры инструментов\n\n` +
          `*2. ${TG_PARTNER_CHANNEL}* - партнёрский\n` +
          `• Партнёрские материалы\n` +
          `• Специальные предложения\n\n` +
          `✅ *Подписывайтесь на оба канала!*`;
      }
      else if (text === 'тарифы' || text.includes('тариф') || text.includes('оплат') || text.includes('price') || text.includes('цен')) {
        response = 
          `💳 *Информация об оплате*\n\n` +
          `*Тарифы доступны на сайте:*\n` +
          `${SITE_URL}/#pricing\n\n` +
          `*Способы оплаты:*\n` +
          `✅ Банковские карты (Visa/Mastercard/МИР)\n` +
          `✅ Криптовалюта (BTC, ETH, USDT)\n` +
          `✅ ЮMoney, Qiwi, WebMoney\n` +
          `✅ СБП (быстрый перевод)\n\n` +
          `*Скидки и промокоды:*\n` +
          `🎁 Подпишитесь на каналы:\n` +
          `• ${TG_MAIN_CHANNEL}\n` +
          `• ${TG_PARTNER_CHANNEL}\n` +
          `🎁 Актуальные промокоды там же`;
      }
      else if (text === 'промокоды' || text.includes('промокод') || text.includes('скидк') || text.includes('акци') || text.includes('sale')) {
        response = 
          `🎁 *Промокоды*\n\n` +
          `*Актуальные промокоды в Telegram каналах:*\n` +
          `• ${TG_MAIN_CHANNEL} (основной)\n` +
          `• ${TG_PARTNER_CHANNEL} (партнёрский)\n\n` +
          `*Текущие акции:*\n` +
          `🔥 *NEWYEAR25* - 25% скидка\n` +
          `Действует до: 15.02.2026\n` +
          `Для всех тарифов\n\n` +
          `🚀 *AIWEEK* - 15% скидка\n` +
          `Действует до: 28.02.2026\n` +
          `Для тарифов Pro и Business\n\n` +
          `🎯 *FIRSTTIME* - 10% скидка\n` +
          `Действует: всегда\n` +
          `Для новых пользователей`;
      }
      else if (text === 'поддержка' || text.includes('помощ') || text.includes('help') || text.includes('вопрос') || text.includes('контакт')) {
        response = 
          `🛠 *Техническая поддержка Neura AI*\n\n` +
          `*По вопросам:*\n` +
          `• Работы бота\n` +
          `• Оплаты и промокодов\n` +
          `• Технических проблем\n` +
          `• Предложений по улучшению\n` +
          `• Партнёрства и сотрудничества\n\n` +
          `*Контакты поддержки:*\n` +
          `👤 Менеджер: ${SUPPORT_USER}\n` +
          `📧 Email: ${SUPPORT_EMAIL}\n` +
          `🌐 Форма на сайте: ${SITE_URL}/#contact\n\n` +
          `*Время ответа:*\n` +
          `⏰ Обычно в течение 1-2 часов\n` +
          `⏰ В рабочее время (10:00-20:00 МСК)`;
      }
      else if (text === 'инструменты' || text.includes('инструмент') || text.includes('нейросет') || text.includes('ai') || text.includes('chatgpt')) {
        response = 
          `🛠️ *Каталог AI инструментов*\n\n` +
          `На нашем сайте доступно 100+ AI инструментов:\n\n` +
          `*📝 Текст и контент:*\n` +
          `• ChatGPT, Claude, Gemini\n` +
          `• Нейросети для написания текстов\n\n` +
          `*🎨 Изображения и дизайн:*\n` +
          `• Midjourney, DALL-E, Stable Diffusion\n` +
          `• Генераторы логотипов\n\n` +
          `🔍 *Смотреть все инструменты:*\n` +
          `${SITE_URL}/#tools`;
      }
      else {
        response = 
          `🤖 Я Neura AI Assistant для VK!\n\n` +
          `Напишите одну из команд:\n` +
          `• "сайт" - наш основной сайт\n` +
          `• "каналы" - наши Telegram каналы\n` +
          `• "тарифы" - информация об оплате\n` +
          `• "промокоды" - актуальные промокоды\n` +
          `• "поддержка" - техническая поддержка\n\n` +
          `Или перейдите в Telegram для полного функционала:\n` +
          `${TG_BOT}`;
      }
      
      // Отправляем ответ через VK API
      sendVKMessage(userId, response);
    }
    
    res.send('ok');
  });
  
  // Функция отправки сообщения в VK
  async function sendVKMessage(userId, text) {
    try {
      await axios.post('https://api.vk.com/method/messages.send', {
        user_id: userId,
        message: text,
        random_id: Math.floor(Math.random() * 1000000),
        access_token: VK_TOKEN,
        v: '5.199'
      });
      console.log(`✅ Ответ отправлен в VK пользователю ${userId}`);
    } catch (error) {
      console.error('❌ Ошибка отправки в VK:', error.response?.data?.error_msg || error.message);
    }
  }
  
  console.log('✅ VK бот готов к работе');
} else {
  console.log('⚠️ VK токен не найден. Бот будет работать только для Telegram');
}

// ===== ЗАПУСК СЕРВЕРА =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`🌐 Telegram вебхук: https://neura-ai-bot.onrender.com/webhook`);
  console.log(`🌐 VK Callback: https://neura-ai-bot.onrender.com/vk-callback`);
  
  if (process.env.RENDER_EXTERNAL_URL) {
    // На Render - настраиваем вебхуки
    const renderUrl = process.env.RENDER_EXTERNAL_URL;
    
    // Настраиваем Telegram вебхук
    await tgBot.setWebHook(`${renderUrl}/webhook`);
    console.log(`✅ Telegram вебхук установлен: ${renderUrl}/webhook`);
    
    console.log(`✅ VK Callback URL для настройки: ${renderUrl}/vk-callback`);
    console.log(`🔐 Код подтверждения VK: ${VK_CONFIRMATION}`);
  } else {
    // Локально - polling
    tgBot.startPolling();
    console.log('🔁 Telegram бот в режиме polling');
  }
  
  console.log('📊 Бот готов к работе!');
  console.log('🤖 Telegram: /start /help /links /channels /vk /money /support /tools /promo');
  console.log('📱 VK: привет, сайт, каналы, тарифы, промокоды, поддержка');
});
