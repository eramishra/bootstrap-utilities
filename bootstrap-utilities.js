var UIAlert = {
  alertNode: '<div class="align-center alert fade in" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div>',
  showAlert: function (msg, msgType, msgContainerId, autohide, callback) {
    msgType = msgType || "success";
    msgContainerId = msgContainerId || "alertMsg";
    autohide = autohide || false;
    var alertNode = jQuery(UIHelper.alertNode);
    alertNode.append(msg);
    if (msgType === "success") {
      alertNode.addClass("alert-success");
    } else if (msgType === "error") {
      alertNode.addClass("alert-danger");
    }
    UIHelper.scrollIntoView("#" + msgContainerId);
    jQuery("#" + msgContainerId).html(alertNode);
    if (callback) {
      callback();
    }
    if(autohide) {
      $('#'+msgContainerId+' .alert').delay(8000).hide('fast');
    }
  }
};

var UIConfirm = {
  isActive: false,
  confirmObj: {
                title: 'Confirm Action', 
                body: 'Are you sure you want to continue?', 
                cancelText: 'Cancel', 
                okText: 'OK', 
                boxSize: 'modal-sm', 
                onCancel: '', 
                onOk: '' 
              },
  show: function(confirmObj) {
    if(!UIConfirm.isActive) {
      UIConfirm.isActive = true;
      if(confirmObj) {
        for(var index in UIConfirm.confirmObj) {
          confirmObj[index] = confirmObj[index] || UIConfirm.confirmObj[index];
        }
      } else {
        confirmObj = UIConfirm.confirmObj;
      }
        
      confirmModal = jQuery('<div class="modal fade" id="cfConfirmBox">' +    
                        '<div class="modal-dialog ' + confirmObj.boxSize + '">' +
                          '<div class="modal-content">' +
                            '<div class="modal-header">' +
                              '<a class="close" data-dismiss="modal" >&times;</a>' +
                              '<h4 class="modal-title">' + confirmObj.title +'</h4>' +
                            '</div>' +
                            '<div class="modal-body">' +
                              '<p>' + confirmObj.body + '</p>' +
                            '</div>' +
                            '<div class="modal-footer">' +
                              '<a href="#" class="btn btn-default" id="confirmCancel" data-dismiss="modal">' + 
                                confirmObj.cancelText + 
                              '</a>' +
                              '<a href="#" id="confirmOk" class="btn btn-primary">' + 
                                confirmObj.okText + 
                              '</a>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>');
      
      confirmModal.find('#confirmOk').click(function(event) {
        if(confirmObj.onOk) {
          confirmObj.onOk();
        }
        confirmModal.modal('hide');
        UIConfirm.isActive = false;
      });  
      confirmModal.find('#confirmCancel').click(function(event) {
        if(confirmObj.onCancel) {
          confirmObj.onCancel();
        }
        UIConfirm.isActive = false;
      });
      confirmModal.modal('show'); 
    }
    else {
      console.log('Confirm already open.');
    }
  }
};
