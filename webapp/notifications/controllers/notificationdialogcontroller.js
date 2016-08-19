angular.module('datamill')
  .controller('notificationDialogController');

function notificationDialogController(mdPanelRef) {
  $this._mdPanelRef = mdPanelRef;
}

notificationDialogController.prototype.closeDialog = function() {
  $this._mdPanelRef && $this._mdPanelRef.close();
};
