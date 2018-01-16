export function confirmDialog(message) {

    var deferred = $.defer();
    $('<div class="noTitle genDialog">' + message + '</div>').dialog({
        modal: true,
        buttons: {
            'Ok': function () {
                deferred.resolve(true);
                $(this).dialog("close");
            },
          'Annuler': function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $(this).dialog("destroy").remove();
            
            if (deferred.promise.isPending()) {
                deferred.resolve(false);
            }
        }
    });

    return deferred.promise;
}
