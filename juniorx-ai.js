/* Juniorx AI — curated, button-driven assistant.
   No live model calls: every reply comes from a fixed content tree below.
   Free text is only ever matched against known keywords; anything else
   gets a graceful "can't process that" fallback. Any finance-related
   input (price, cost, quote, discount, payment, refund, budget, etc.)
   is handed straight to Juniorx personally via WhatsApp — this widget
   must never invent or discuss pricing. */
(function () {
  const WHATSAPP_NUMBER = '2347016408514'; // update if this changes — see README
  const EMAIL = 'hello@juniorxconcept.com';
  const CALL_NUMBER = '+2348106567882';

  function waLink(text) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  const NODES = {
    main: {
      title: "Hey, I'm Juniorx AI 👋",
      body: "I can help you explore Juniorx Concept — our services, our work, and how to get started. What are you curious about?",
      options: [
        { label: '🎨 Graphic Design', to: 'graphic-design' },
        { label: '💻 Website Development', to: 'web-dev' },
        { label: '🖨️ Printing Services', to: 'printing' },
        { label: '🎬 Video Editing / Motion Graphics', to: 'motion' },
        { label: '🧊 3D Design', to: 'threed' },
        { label: '🏷️ Branding', to: 'branding' },
        { label: '👀 View Our Work', action: 'scrollWork' },
        { label: '💼 Start a Project', to: 'start-project' },
        { label: 'ℹ️ About Juniorx Concept', to: 'about' },
        { label: '📞 Contact Juniorx', to: 'contact' },
      ],
    },
    'graphic-design': {
      title: '🎨 Graphic Design',
      body: 'We design logos, flyers, posters, social media graphics, adverts and other custom visual content — built to make your brand impossible to scroll past. What would you like to know?',
      options: [
        { label: '👀 See design work', action: 'scrollWork' },
        { label: '💰 Get a Quote', to: 'finance' },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    'web-dev': {
      title: '💻 Website Development',
      body: 'We build responsive websites, landing pages, portfolios, online stores and custom web applications — designed and developed in-house, end to end. What would you like to know?',
      options: [
        { label: '👀 See website work', action: 'scrollWork' },
        { label: '🧭 How we work', to: 'process' },
        { label: '💰 Get a Quote', to: 'finance' },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    process: {
      title: '🧭 How We Work',
      body: 'Five simple stages: You Imagine → We Concept → We Create → We Refine → We Deliver. You bring the idea, even a rough one — we shape it from there.',
      options: [
        { label: '💼 Start a Project', to: 'start-project' },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    printing: {
      title: '🖨️ Printing Services',
      body: 'Juniorx Concept now offers printing services alongside our creative and digital solutions. We can help with flyers, business cards, banners, brochures, stickers, certificates and other custom printing needs. What would you like to know?',
      options: [
        { label: '👀 See print work', action: 'scrollWork' },
        { label: '💰 Get a Quote', to: 'finance' },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    motion: {
      title: '🎬 Video Editing / Motion Graphics',
      body: 'We create motion graphics, animated logos, promo videos and social content built to grab attention and keep people watching. What would you like to know?',
      options: [
        { label: '👀 See motion work', action: 'scrollWork' },
        { label: '💰 Get a Quote', to: 'finance' },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    threed: {
      title: '🧊 3D Design',
      body: 'We create 3D visuals, product renders and design elements that add real depth to a brand or project. What would you like to know?',
      options: [
        { label: '👀 See design work', action: 'scrollWork' },
        { label: '💰 Get a Quote', to: 'finance' },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    branding: {
      title: '🏷️ Branding',
      body: 'We build complete brand identities — logo, colors, typography and guidelines — so your business looks consistent everywhere it shows up. What would you like to know?',
      options: [
        { label: '👀 See branding work', action: 'scrollWork' },
        { label: '💰 Get a Quote', to: 'finance' },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    'start-project': {
      title: '💼 Start a Project',
      body: "Love that. Pick what best matches your project and I'll connect you straight to Juniorx with the details — so you get a real answer, not a guess.",
      options: [
        { label: '🎨 Design / Branding', action: 'wa', text: "Hi Juniorx Concept, I'd like to start a design/branding project." },
        { label: '💻 Website / Web App', action: 'wa', text: "Hi Juniorx Concept, I'd like to start a website/web app project." },
        { label: '🖨️ Printing', action: 'wa', text: "Hi Juniorx Concept, I'd like to start a printing project." },
        { label: '🎬 Video / Motion', action: 'wa', text: "Hi Juniorx Concept, I'd like to start a video/motion graphics project." },
        { label: '🧊 3D Design', action: 'wa', text: "Hi Juniorx Concept, I'd like to start a 3D design project." },
        { label: '✨ Something else', action: 'wa', text: "Hi Juniorx Concept, I have a project idea I'd like to discuss." },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    about: {
      title: 'ℹ️ About Juniorx Concept',
      body: 'Juniorx Concept is a creative studio built around one belief: creativity should have no ceiling. We combine Creative, Digital and Print — design, development, motion and production — so ideas go from concept to something real without splitting across five different people. Where Creativity Knows No Limit.',
      options: [
        { label: '🛠️ See our services', to: 'main' },
        { label: '👀 View our work', action: 'scrollWork' },
        { label: '📞 Contact Juniorx', to: 'contact' },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    contact: {
      title: '📞 Contact Juniorx',
      body: "Here's the fastest way to reach us — pick whichever works for you:",
      options: [
        { label: '💬 WhatsApp', action: 'wa', text: 'Hi Juniorx Concept, I have a question.' },
        { label: '📧 Email', action: 'mailto' },
        { label: '📱 Call', action: 'tel' },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
    finance: {
      title: "💰 Let's get you accurate info",
      body: "That's something Juniorx should handle personally so you get the correct information.\n\nPlease hold on while I connect you with Juniorx. 👨🏽‍💻",
      options: [
        { label: '💬 Connect with Juniorx on WhatsApp', action: 'wa', text: "Hi Juniorx Concept, I'd like to ask about pricing for a project." },
        { label: '⬅ Back to Menu', to: 'main' },
      ],
    },
  };

  const FINANCE_WORDS = ['price', 'prices', 'pricing', 'cost', 'costs', 'quote', 'quotation', 'discount', 'negotiate', 'negotiation', 'payment', 'pay', 'refund', 'budget', 'fee', 'fees', 'rate', 'rates', 'charge', 'charges', 'invoice', 'expensive', 'cheap', 'money'];
  const GREETING_WORDS = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', "what's up"];
  const WORK_WORDS = ['portfolio', 'our work', 'see work', 'examples', 'view work', 'past work', 'sample work'];
  const INTENT_MAP = [
    { key: 'graphic-design', words: ['graphic design', 'logo', 'flyer', 'poster', 'graphics'] },
    { key: 'branding', words: ['brand', 'branding', 'identity'] },
    { key: 'web-dev', words: ['website', 'web app', 'webapp', 'web development', 'web dev', 'landing page', 'ecommerce', 'e-commerce', 'online store'] },
    { key: 'printing', words: ['print', 'printing', 'business card', 'business cards', 'banner', 'brochure', 'sticker'] },
    { key: 'motion', words: ['video', 'motion graphics', 'motion graphic', 'animation', 'editing'] },
    { key: 'threed', words: ['3d', 'three d', 'render', '3-d'] },
    { key: 'start-project', words: ['start a project', 'hire', 'work with you', 'get started'] },
    { key: 'about', words: ['about', 'who are you', 'what do you do', 'what is juniorx'] },
    { key: 'contact', words: ['contact', 'phone number', 'email address', 'reach you'] },
  ];

  function hasWord(text, phrase) {
    const esc = phrase.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    return new RegExp(`\\b${esc}\\b`, 'i').test(text);
  }
  function matchAny(text, arr) {
    return arr.some((p) => hasWord(text, p));
  }
  function matchIntent(raw) {
    const text = raw.toLowerCase();
    if (matchAny(text, FINANCE_WORDS)) return { type: 'node', key: 'finance' };
    if (matchAny(text, WORK_WORDS)) return { type: 'action', key: 'scrollWork' };
    if (matchAny(text, GREETING_WORDS)) return { type: 'greeting' };
    for (const entry of INTENT_MAP) {
      if (matchAny(text, entry.words)) return { type: 'node', key: entry.key };
    }
    return { type: 'fallback' };
  }

  const launcher = document.getElementById('jxAiLauncher');
  const panel = document.getElementById('jxAiPanel');
  const messagesEl = document.getElementById('jxAiMessages');
  const form = document.getElementById('jxAiForm');
  const input = document.getElementById('jxAiInput');
  const closeBtn = document.getElementById('jxAiClose');
  const restartBtn = document.getElementById('jxAiRestart');
  if (!launcher || !panel) return;

  let opened = false;

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addUserBubble(text) {
    const div = document.createElement('div');
    div.className = 'jx-msg jx-msg-user';
    div.textContent = text;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function renderOptions(container, options) {
    const group = document.createElement('div');
    group.className = 'jx-quick-replies';
    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => handleOption(opt, btn, group));
      group.appendChild(btn);
    });
    container.appendChild(group);
  }

  function addBotBubble(title, body, options) {
    showTyping(() => {
      const div = document.createElement('div');
      div.className = 'jx-msg jx-msg-bot';
      if (title) {
        const strong = document.createElement('strong');
        strong.textContent = title;
        div.appendChild(strong);
      }
      const p = document.createElement('p');
      p.style.margin = '0';
      p.style.whiteSpace = 'pre-line';
      p.textContent = body;
      div.appendChild(p);
      messagesEl.appendChild(div);
      if (options && options.length) renderOptions(messagesEl, options);
      scrollToBottom();
    });
  }

  function addBotNode(key) {
    const node = NODES[key];
    if (!node) return;
    addBotBubble(node.title, node.body, node.options);
  }

  function addBotFallback() {
    addBotBubble(
      null,
      "😅 Sorry, I can't process that request yet.\n\nI'm designed to help you explore Juniorx Concept, our services, projects and how to get started.\nPlease select one of the options below.",
      NODES.main.options
    );
  }

  function showTyping(done) {
    const typing = document.createElement('div');
    typing.className = 'jx-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typing);
    scrollToBottom();
    setTimeout(() => {
      typing.remove();
      done();
    }, 500 + Math.random() * 260);
  }

  function performScrollWork() {
    addBotBubble(null, 'Taking you to our portfolio now — scroll down to explore! 👀', null);
    setTimeout(() => {
      closePanel();
      const work = document.getElementById('work');
      if (work) work.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 900);
  }

  function handleOption(opt, btn, group) {
    group.classList.add('jx-answered');
    btn.classList.add('jx-picked');
    addUserBubble(opt.label);

    if (opt.action === 'scrollWork') {
      performScrollWork();
    } else if (opt.action === 'wa') {
      window.open(waLink(opt.text || 'Hi Juniorx Concept, I have a question.'), '_blank', 'noopener');
      addBotBubble(null, 'Opening WhatsApp for you now — talk soon! 👋', null);
    } else if (opt.action === 'mailto') {
      window.location.href = `mailto:${EMAIL}`;
    } else if (opt.action === 'tel') {
      window.location.href = `tel:${CALL_NUMBER}`;
    } else if (opt.to) {
      addBotNode(opt.to);
    }
  }

  function openPanel() {
    panel.classList.add('jx-open');
    panel.setAttribute('aria-hidden', 'false');
    launcher.classList.add('jx-open');
    launcher.setAttribute('aria-expanded', 'true');
    document.body.classList.add('jx-ai-open');
    if (!opened) {
      opened = true;
      addBotNode('main');
    }
    setTimeout(() => input && input.focus(), 320);
  }

  function closePanel() {
    panel.classList.remove('jx-open');
    panel.setAttribute('aria-hidden', 'true');
    launcher.classList.remove('jx-open');
    launcher.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('jx-ai-open');
  }

  function restartChat() {
    messagesEl.innerHTML = '';
    opened = false;
    addBotNode('main');
    opened = true;
  }

  launcher.addEventListener('click', () => {
    if (panel.classList.contains('jx-open')) closePanel();
    else openPanel();
  });
  launcher.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      launcher.click();
    }
  });
  closeBtn && closeBtn.addEventListener('click', closePanel);
  restartBtn && restartBtn.addEventListener('click', restartChat);

  form &&
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      addUserBubble(val);
      input.value = '';
      const intent = matchIntent(val);
      if (intent.type === 'node') addBotNode(intent.key);
      else if (intent.type === 'action' && intent.key === 'scrollWork') performScrollWork();
      else if (intent.type === 'greeting') addBotBubble(null, 'Hey there! 👋 What would you like to explore?', NODES.main.options);
      else addBotFallback();
    });

  // Wire the existing "suggested question" chips + CTA already in the page
  document.querySelectorAll('[data-jx-intent]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-jx-intent');
      const label = btn.textContent.trim();
      const wasOpen = panel.classList.contains('jx-open');
      openPanel();
      setTimeout(() => {
        addUserBubble(label);
        addBotNode(key);
      }, wasOpen ? 60 : 700);
    });
  });

  document.getElementById('jxAiOpenFromSection') &&
    document.getElementById('jxAiOpenFromSection').addEventListener('click', (e) => {
      e.preventDefault();
      openPanel();
    });
})();
