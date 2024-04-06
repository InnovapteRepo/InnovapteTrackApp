sap.ui.define([
    "inno/iotdevicereportfioriapp/controller/BaseController",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     */
    function (BaseController, Filter) {
        "use strict";

        return BaseController.extend("inno.iotdevicereportfioriapp.controller.Master", {
            onInit: function () {
                this.fnGetRouter().getRoute("Master").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function (oEvent) {
                this.getView().setModel();
            },
            onPullData: function (oEvent) {
                var that = this;
                let oPayload = {
                    "Request": ''
                }
                return new Promise(function (resolve, reject) {
                    that.getView().getModel().create("/UpdateDeviceData", oPayload, {
                        success: function (oData) {
                            resolve(oData);
                            sap.m.MessageToast.show("Successfully Pulled Data");
                        },
                        error: function (oError) {
                            reject(oError);
                            sap.m.MessageToast.show("Error while Pulling Data");
                        },
                    });
                });
            },
            onFilterChange: function (oEvent) {
                // var delivery = oEvent.getParameters().getParameters().newValue;
                // var oFilter = [];
                // oFilter.push(new Filter("Delivery", "EQ", delivery));

                // var oBinding = oEvent.getParameters("itemsBinding");
                // oBinding.filter(new Filter({filters: oFilter, and: true}));
            }
        });
    });
