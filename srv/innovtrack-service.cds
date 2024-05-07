using innovapte.innovtrack as innovtrack from '../db/data-model';

type updatedevice {
    Code   : Integer;
    Msgtxt : String(250);
    Msgty  : String(1);
}

// service InnvotrackService @(requires : 'authenenticated-user'){
service InnvotrackService {
    action insertData(data : String, tableName : String) returns String;
    action triggerMail();
    // entity TiveHenkel as projection on innovtrack.Tive_Henkel;
    entity TiveData as projection on innovtrack.TiveData;
    action UpdateDeviceData() returns array of updatedevice;
    entity Delivery as select distinct key Delivery from innovtrack.Delivery;

    entity Device   as
        select distinct
            key DeviceName,
                Delivery
        from innovtrack.Device;
}


annotate InnvotrackService.TiveData with {
    delivery    @title: '{i18n>delivery}';
    deviceId    @title: '{i18n>deviceId}';
    date        @title: '{i18n>date}';
    time        @title: '{i18n>time}';
    latitude    @title: '{i18n>latitude}';
    longitude   @title: '{i18n>longitude}';
    location    @title: '{i18n>location}';
    temperature @title: '{i18n>temperature}';
    dewPoint    @title: '{i18n>dewPoint}';
    battery     @title: '{i18n>battery}';
    humidity    @title: '{i18n>humidity}';

    delivery    @(Common: {
        ValueListWithFixedValues: true,
        ValueList               : {
            Label         : '{i18n>delivery}',
            CollectionPath: 'Delivery',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: delivery,
                ValueListProperty: 'Delivery'
            }]
        }
    });

    deviceId    @(Common.ValueList: {
        Label         : '{i18n>deviceId}',
        CollectionPath: 'Device',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: delivery,
                ValueListProperty: 'Delivery'
            },
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: deviceId,
                ValueListProperty: 'DeviceName'
            }
        ]
    });
}

annotate InnvotrackService.TiveData with @(UI: {
    SelectionFields: [
        delivery,
        deviceId
    ],
    LineItem       : [
        {Value: delivery},
        {Value: deviceId},
        {Value: date},
        {Value: time},
        {Value: latitude},
        {Value: longitude},
        {Value: location},
        {Value: temperature},
        {Value: dewPoint},
        {Value: battery},
        {Value: humidity}
    ]
});
