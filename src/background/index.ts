import browser from 'webextension-polyfill'

// Handle extension installation
browser.runtime.onInstalled.addListener(() => {
  console.log('ChatHub Personal installed')
})

// Handle keyboard shortcut
browser.commands.onCommand.addListener((command) => {
  if (command === 'open-popup') {
    browser.action.openPopup()
  }
})

// Handle context menu for selected text
browser.contextMenus.create({
  id: 'chathub-selected-text',
  title: 'Ask ChatHub about "%s"',
  contexts: ['selection']
})

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'chathub-selected-text' && info.selectionText) {
    // Store selected text for popup to use
    browser.storage.local.set({
      selectedText: info.selectionText,
      selectedTextTimestamp: Date.now()
    })
    
    // Open popup
    browser.action.openPopup()
  }
})

// Clean up old selected text
setInterval(() => {
  browser.storage.local.get(['selectedTextTimestamp']).then((result) => {
    if (result.selectedTextTimestamp && Date.now() - result.selectedTextTimestamp > 60000) {
      browser.storage.local.remove(['selectedText', 'selectedTextTimestamp'])
    }
  })
}, 30000)