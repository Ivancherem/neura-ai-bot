// ===== ПРОДВИНУТЫЙ ТЕЛЕГРАМ БОТ =====
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const token = process.env.BOT_TOKEN || '8116434805:AAEpp2Vsm0qy8DBwqBqacxGoKZgWBrFjyys';
const bot = new TelegramBot(token);

// ===== КОНСТАНТЫ ДЛЯ ССЫЛОК =====
const SITE_URL = 'https://ai-toolkit.ru';
const MAIN_CHANNEL = 'https://t.me/ai_hub_2024';
const PARTNER_CHANNEL = 'https://t.me/ai_toolkit_partner09';  // Ваш новый канал
const SUPPORT_USER = '@Ivancherem';  // Замените на ваш username
const SUPPORT_EMAIL = 'support@ai-toolkit.ru';

// ===== 1. МЕНЮ КОМАНД ТЕЛЕГРАМ =====
bot.setMyCommands([
  { command: 'start', description: '🚀 Запустить бота' },
  { command: 'help', description: '📋 Помощь и инструкции' },
  { command: 'links', description: '🔗 Полезные ссылки' },
  { command: 'money', description: '💳 Оплата и тарифы' },
  { command: 'support', description: '🛠 Техническая поддержка' },
  { command: 'tools', description: '🛠️ Все инструменты AI' },
  { command: 'promo', description: '🎁 Актуальные промокоды' },
  { command: 'channels', description: '📢 Наши каналы' }  // Новая команда
]);

// ===== 2. КОМАНДА /START =====
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'Пользователь';
  
  // Кнопки под сообщением
  const keyboard = {
    inline_keyboard: [
      [
        { text: '🌐 Наш сайт', url: SITE_URL },
        { text: '📢 Основной канал', url: MAIN_CHANNEL }
      ],
      [
        { text: '🤝 Партнёрский канал', url: PARTNER_CHANNEL },
        { text: '🛠 Все инструменты', callback_data: 'tools' }
      ],
      [
        { text: '🎁 Промокоды', callback_data: 'promo' },
        { text: '💳 Тарифы', callback_data: 'money' }
      ],
      [
        { text: '🛠 Поддержка', callback_data: 'support' },
        { text: '📢 Все каналы', callback_data: 'channels' }
      ]
    ]
  };

  bot.sendMessage(chatId,
    `🤖 *Привет, ${userName}! Я Neura AI Assistant*\n\n` +
    `Я помогу вам с выбором AI инструментов, промокодами и ответами на вопросы.\n\n` +
    `📋 *Основные команды:*\n` +
    `• /start - это меню\n` +
    `• /help - помощь и FAQ\n` +
    `• /links - все наши ресурсы\n` +
    `• /channels - наши Telegram каналы\n` +
    `• /money - тарифы и оплата\n` +
    `• /support - техподдержка\n` +
    `• /tools - каталог AI инструментов\n` +
    `• /promo - актуальные промокоды\n\n` +
    `📢 *Наши каналы:*\n` +
    `• @ai_hub_2024 - основной\n` +
    `• @ai_toolkit_partner09 - партнёрский\n\n` +
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
  
  console.log(`👤 ${userName} запустил бота (ID: ${chatId})`);
});

// ===== 3. КОМАНДА /HELP =====
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId,
    `🆘 *Центр помощи Neura AI Bot*\n\n` +
    `*Частые вопросы:*\n\n` +
    `❓ *Где взять промокод?*\n` +
    `В наших Telegram каналах:\n` +
    `• @ai_hub_2024 (основной)\n` +
    `• @ai_toolkit_partner09 (партнёрский)\n\n` +
    `❓ *Как оплатить подписку?*\n` +
    `На сайте ${SITE_URL} в разделе "Тарифы"\n\n` +
    `❓ *Не работает инструмент?*\n` +
    `Напишите в поддержку: ${SUPPORT_USER}\n\n` +
    `❓ *Где все AI инструменты?*\n` +
    `На сайте в каталоге или команда /tools\n\n` +
    `❓ *Зачем два канала?*\n` +
    `• @ai_hub_2024 - новости, промокоды\n` +
    `• @ai_toolkit_partner09 - партнёрские материалы\n\n` +
    `📞 *Контакты:*\n` +
    `• Сайт: ${SITE_URL}\n` +
    `• Каналы: @ai_hub_2024 и @ai_toolkit_partner09\n` +
    `• Поддержка: ${SUPPORT_USER}`,
    { parse_mode: 'Markdown' }
  );
});

// ===== 4. КОМАНДА /LINKS =====
bot.onText(/\/links/, (msg) => {
  const chatId = msg.chat.id;
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '🌐 Основной сайт', url: SITE_URL },
        { text: '🛠 Каталог инструментов', url: `${SITE_URL}/#tools` }
      ],
      [
        { text: '📢 Основной канал', url: MAIN_CHANNEL },
        { text: '🤝 Партнёрский канал', url: PARTNER_CHANNEL }
      ],
      [
        { text: '💬 Чат сообщества', url: 'https://t.me/ai_community_chat' },
        { text: '📚 Документация', url: `${SITE_URL}/docs` }
      ],
      [
        { text: '🎥 Видеоуроки', url: 'https://youtube.com/@ai-toolkit' },
        { text: '📢 Все каналы', callback_data: 'channels' }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    `🔗 *Все полезные ссылки Neura AI*\n\n` +
    `*Основные ресурсы:*\n` +
    `• 🌐 Сайт: ${SITE_URL}\n` +
    `• 📢 Основной канал: @ai_hub_2024\n` +
    `• 🤝 Партнёрский канал: @ai_toolkit_partner09\n` +
    `• 🤖 Этот бот: @NeuraAI_Assistant_bot\n\n` +
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

// ===== 5. КОМАНДА /CHANNELS (НОВАЯ) =====
bot.onText(/\/channels/, (msg) => {
  const chatId = msg.chat.id;
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '📢 Основной канал', url: MAIN_CHANNEL },
        { text: '🤝 Партнёрский канал', url: PARTNER_CHANNEL }
      ],
      [
        { text: '💬 Чат сообщества', url: 'https://t.me/ai_community_chat' },
        { text: '🌐 Наш сайт', url: SITE_URL }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    `📢 *Наши Telegram каналы*\n\n` +
    `*1. Основной канал (@ai_hub_2024):*\n` +
    `• Новости мира AI\n` +
    `• Эксклюзивные промокоды\n` +
    `• Обзоры инструментов\n` +
    `• Вакансии в AI\n` +
    `• Акции и скидки\n\n` +
    `*2. Партнёрский канал (@ai_toolkit_partner09):*\n` +
    `• Партнёрские материалы\n` +
    `• Совместные проекты\n` +
    `• Дополнительные промокоды\n` +
    `• Специальные предложения\n\n` +
    `*3. Чат сообщества:*\n` +
    `• Обсуждение AI инструментов\n` +
    `• Помощь друг другу\n` +
    `• Обмен опытом\n\n` +
    `✅ *Рекомендуем подписаться на оба канала!*`,
    { 
      parse_mode: 'Markdown',
      reply_markup: keyboard 
    }
  );
});

// ===== 6. КОМАНДА /MONEY =====
bot.onText(/\/money/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId,
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
    `• @ai_hub_2024\n` +
    `• @ai_toolkit_partner09\n` +
    `🎁 Актуальные промокоды там же\n\n` +
    `*Вопросы по оплате?*\n` +
    `Напишите: ${SUPPORT_USER}`,
    { parse_mode: 'Markdown' }
  );
});

// ===== 7. КОМАНДА /SUPPORT =====
bot.onText(/\/support/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.username || msg.from.first_name;
  
  // Кнопка "Написать в поддержку"
  const keyboard = {
    inline_keyboard: [[
      { 
        text: '✉️ Написать в поддержку', 
        url: `https://t.me/${SUPPORT_USER.replace('@', '')}` 
      }
    ]]
  };
  
  bot.sendMessage(chatId,
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
  
  console.log(`🆘 ${userName} запросил поддержку (ID: ${chatId})`);
});

// ===== 8. КОМАНДА /TOOLS =====
bot.onText(/\/tools/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId,
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

// ===== 9. КОМАНДА /PROMO =====
bot.onText(/\/promo/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId,
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
    `1. Основной канал: @ai_hub_2024\n` +
    `2. Партнёрский канал: @ai_toolkit_partner09\n` +
    `3. Новые промокоды публикуем каждую неделю\n` +
    `4. Эксклюзивные скидки для подписчиков\n\n` +
    `*Как активировать промокод:*\n` +
    `1. Зайдите на ${SITE_URL}\n` +
    `2. Выберите тариф\n` +
    `3. Введите промокод при оплате`,
    { parse_mode: 'Markdown' }
  );
});

// ===== 10. ОБРАБОТКА КНОПОК (CALLBACK) =====
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  
  if (data === 'tools') {
    bot.sendMessage(chatId, `🛠️ *Каталог инструментов:* ${SITE_URL}/#tools\n📢 *Новости в каналах:* @ai_hub_2024 и @ai_toolkit_partner09`, { parse_mode: 'Markdown' });
  } 
  else if (data === 'promo') {
    bot.sendMessage(chatId, '🎁 *Промокоды в каналах:*\n• @ai_hub_2024 (основной)\n• @ai_toolkit_partner09 (партнёрский)', { parse_mode: 'Markdown' });
  } 
  else if (data === 'money') {
    bot.sendMessage(chatId, `💳 *Тарифы:* ${SITE_URL}/#pricing\n🎁 *Промокоды:* @ai_hub_2024`, { parse_mode: 'Markdown' });
  } 
  else if (data === 'support') {
    bot.sendMessage(chatId, `🛠 *Поддержка:* ${SUPPORT_USER}\n📧 ${SUPPORT_EMAIL}`, { parse_mode: 'Markdown' });
  }
  else if (data === 'channels') {
    bot.sendMessage(chatId, 
      `📢 *Наши каналы:*\n\n` +
      `*1. @ai_hub_2024* - основной\n` +
      `Новости, промокоды, обзоры\n\n` +
      `*2. @ai_toolkit_partner09* - партнёрский\n` +
      `Партнёрские материалы, спецпредложения\n\n` +
      `✅ *Подписывайтесь на оба!*`,
      { parse_mode: 'Markdown' }
    );
  }
  
  // Подтверждаем нажатие кнопки
  bot.answerCallbackQuery(callbackQuery.id);
});

// ===== 11. ОБРАБОТКА ЛЮБОГО ТЕКСТА =====
bot.on('message', (msg) => {
  // Если это команда (начинается с /) - игнорируем
  if (msg.text && msg.text.startsWith('/')) return;
  
  if (msg.text) {
    const chatId = msg.chat.id;
    const userText = msg.text.toLowerCase();
    
    // Анализ текста пользователя
    if (userText.includes('привет') || userText.includes('здравствуй') || userText.includes('hello')) {
      bot.sendMessage(chatId, `👋 Привет! Я Neura AI Assistant. Чем могу помочь?\nИспользуйте /help для списка команд.`);
    } 
    else if (userText.includes('канал') || userText.includes('каналы') || userText.includes('telegram') || userText.includes('тг')) {
      bot.sendMessage(chatId, '📢 *Наши каналы:*\n• @ai_hub_2024 (основной)\n• @ai_toolkit_partner09 (партнёрский)\nИли команда /channels', { parse_mode: 'Markdown' });
    }
    else if (userText.includes('промокод') || userText.includes('скидк') || userText.includes('акци') || userText.includes('sale')) {
      bot.sendMessage(chatId, '🎁 *Промокоды в каналах:*\n• @ai_hub_2024\n• @ai_toolkit_partner09\nИли команда /promo', { parse_mode: 'Markdown' });
    }
    else if (userText.includes('оплат') || userText.includes('тариф') || userText.includes('цен') || userText.includes('price')) {
      bot.sendMessage(chatId, `💳 *Тарифы:* ${SITE_URL}/#pricing\nИли команда /money`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('сайт') || userText.includes('ресурс') || userText.includes('ссылка') || userText.includes('site')) {
      bot.sendMessage(chatId, `🔗 *Сайт:* ${SITE_URL}\n*Каналы:* @ai_hub_2024 и @ai_toolkit_partner09\nИли команда /links`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('поддержк') || userText.includes('помощ') || userText.includes('вопрос') || userText.includes('help')) {
      bot.sendMessage(chatId, `🛠 *Поддержка:* ${SUPPORT_USER}\nИли команда /support`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('инструмент') || userText.includes('нейросет') || userText.includes('ai') || userText.includes('chatgpt') || userText.includes('midjourney')) {
      bot.sendMessage(chatId, `🛠️ *Каталог AI инструментов:* ${SITE_URL}/#tools\nИли команда /tools`, { parse_mode: 'Markdown' });
    }
    else if (userText.includes('партнер') || userText.includes('сотруднич') || userText.includes('partner')) {
      bot.sendMessage(chatId, `🤝 *Партнёрство:*\nСвяжитесь с ${SUPPORT_USER}\nИли посетите партнёрский канал: @ai_toolkit_partner09`, { parse_mode: 'Markdown' });
    }
    else {
      bot.sendMessage(chatId, 
        '🤖 Я понимаю команды и ключевые слова. Попробуйте:\n' +
        '• "каналы" - наши Telegram каналы\n' +
        '• "промокод" - акции и скидки\n' +
        '• "тарифы" - информация об оплате\n' +
        '• "сайт" - наши ресурсы\n' +
        '• "поддержка" - техподдержка\n' +
        '• "инструменты" - каталог AI\n' +
        '• Или используйте команды из меню 👇'
      );
    }
  }
});

// ===== 12. НАСТРОЙКА ВЕБ-СЕРВЕРА =====
app.use(express.json());
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ===== 13. ЗАПУСК СЕРВЕРА =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Продвинутый бот запущен на порту ${PORT}`);
  console.log(`📢 Каналы: @ai_hub_2024 и @ai_toolkit_partner09`);
  console.log(`🌐 Сайт: ${SITE_URL}`);
  console.log(`🛠 Поддержка: ${SUPPORT_USER}`);
  
  if (process.env.RENDER_EXTERNAL_URL) {
    // На Render - вебхук
    const webhookUrl = `${process.env.RENDER_EXTERNAL_URL}/webhook`;
    await bot.setWebHook(webhookUrl);
    console.log(`✅ Вебхук установлен: ${webhookUrl}`);
    console.log(`🌐 Ваш бот доступен по: ${process.env.RENDER_EXTERNAL_URL}`);
  } else {
    // Локально - polling
    bot.startPolling();
    console.log('🔁 Режим polling (локальная разработка)');
  }
  
  console.log('📊 Бот готов к работе!');
  console.log('🤖 Команды: /start, /help, /links, /channels, /money, /support, /tools, /promo');
});
