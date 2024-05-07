using innovapte.innovtrack as innovtrack from '../db/data-model';


service InnvotrackDeviceDataService {
    @odata.draft.enabled
    entity TiveDevice as projection on innovtrack.TiveDevice;
}

// annotate InnvotrackDeviceDataService.TiveDevice with @odata.draft.enabled;
annotate InnvotrackDeviceDataService.TiveDevice with {
    DeviceId    @title: '{i18n>deviceId}';
    DeviceName  @title: '{i18n>deviceName}';
    Delivery    @title: '{i18n>delivery}';
}

annotate InnvotrackDeviceDataService.TiveDevice with @(UI: {
    SelectionFields: [
       
    ],
    LineItem       : [
        {Value: DeviceId},
        {Value: DeviceName},
        {Value: Delivery}
    ]
});
