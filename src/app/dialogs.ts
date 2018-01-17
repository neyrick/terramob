

export function confirmDialog(message, theme) {

    let promise : Promise<boolean> = new Promise((resolve, reject) => {

        $('<div class="' + theme + '">' + message + '</div>').dialog({
            modal: true,
            classes: { "ui-dialog" : "noTitle genDialog", "ui-dialog-buttonset" : theme },    
            minHeight: 20,
            buttons: {
                'Ok': function () {
                    resolve(true);
                    $(this).dialog("close");
                },
              'Annuler': function () {
                    reject(true);
                    $(this).dialog("close");
                }
            },
            close: function (event, ui) {
                reject(true);
                $(this).dialog("destroy").remove();
            }
        });
    });

    return promise;
}

export function alertDialog(message, theme) {

    let promise : Promise<boolean> = new Promise((resolve, reject) => {

        $('<div class="' + theme + '">' + message + '</div>').dialog({
            modal: true,
            classes: { "ui-dialog" : "noTitle genDialog", "ui-dialog-buttonset" : theme },    
            minHeight: 20,
            buttons: {
                'Ok': function () {
                    resolve(true);
                    $(this).dialog("close");
                 }
            },
            close: function (event, ui) {
                reject(true);
                $(this).dialog("destroy").remove();
            }
        });
    });

    return promise;
}
