angular.module('datamill')
  .controller('notificationDialogCtrl');

function notificationDialogCtrl(mdPanelRef) {
  $this._mdPanelRef = mdPanelRef;
}

notificationDialogCtrl.prototype.closeDialog = function() {
  $this._mdPanelRef && $this._mdPanelRef.close();
};
