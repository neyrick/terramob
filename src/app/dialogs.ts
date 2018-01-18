

export function confirmDialog(message, theme) {

    let promise : Promise<boolean> = new Promise((resolve, reject) => {

        (<any>$('<div class="' + theme + '">' + message + '</div>')).dialog({
            modal: true,
            classes: { "ui-dialog" : "noTitle genDialog", "ui-dialog-buttonset" : theme },    
            minHeight: 20,
            buttons: {
                'Ok': function () {
                    resolve(true);
                    (<any>$(this)).dialog("close");
                },
              'Annuler': function () {
                    reject(true);
                    (<any>$(this)).dialog("close");
                }
            },
            close: function (event, ui) {
                reject(true);
                (<any>$(this)).dialog("destroy").remove();
            }
        });
    });

    return promise;
}

export function alertDialog(message, theme) {

    let promise : Promise<boolean> = new Promise((resolve, reject) => {

        (<any>$('<div class="' + theme + '">' + message + '</div>')).dialog({
            modal: true,
            classes: { "ui-dialog" : "noTitle genDialog", "ui-dialog-buttonset" : theme },    
            minHeight: 20,
            buttons: {
                'Ok': function () {
                    resolve(true);
                    (<any>$(this)).dialog("close");
                 }
            },
            close: function (event, ui) {
                reject(true);
                (<any>$(this)).dialog("destroy").remove();
            }
        });
    });

    return promise;
}
