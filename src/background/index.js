chrome.notifications.create('Hello', {
  title: 'Drink Water',
  message: 'Things may come to those who wait, but only the things left by those who hustle.\n— Abraham Lincoln',
  iconUrl: '/icons/128.png',
  type: 'basic',
  requireInteraction: true,
  buttons: [{ title: 'Next → 12:35 PM' }],
});
