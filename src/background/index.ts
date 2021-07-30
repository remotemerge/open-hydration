chrome.notifications.create('Hello', {
  title: 'Drink Water',
  contextMessage: 'Keep you hydrated!',
  message: "Happiness is not the absence of problems, it's the ability to deal with them.",
  iconUrl: '/icons/128.png',
  type: 'basic',
  buttons: [{ title: 'Done' }, { title: 'Cancel' }],
});
