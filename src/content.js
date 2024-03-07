import * as InboxSDK from '@inboxsdk/core';

const writeClipboard = (str) => {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = str;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  document.body.removeChild(copyFrom);
}

InboxSDK.load(2, "sdk_copylinktoemail_ddb5ab4bf2").then((sdk) => {

  // Find the index of the currently logged in user
  var userNumber = 0;
  var matches = window.location.pathname.match(/^\/mail\/u\/(\d+)\/.*/);
  if (matches) {
    userNumber = matches[1];
  }

  // Whenever a message is loaded, add a menu button to the More menu
  sdk.Conversations.registerMessageViewHandler(function (messageView) {
    messageView.addToolbarButton({
      section: "MORE",
      title: 'Copy Link',
      iconUrl: "//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/link_baseline_nv700_20dp.png",
      onClick: function () {
        messageView.getMessageIDAsync().then(messageID => {
          writeClipboard(`https://mail.google.com/mail/#all/${messageID}`)
          sdk.ButterBar.showMessage({ text: "Saved to clipboard" })
        })
      },
      orderHint: 0
    });
  });
});
