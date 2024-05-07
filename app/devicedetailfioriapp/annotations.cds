using InnvotrackDeviceDataService as service from '../../srv/devicedata-service';

annotate service.TiveDevice with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : DeviceId,
            },
            {
                $Type : 'UI.DataField',
                Value : DeviceName,
            },
            {
                $Type : 'UI.DataField',
                Value : Delivery,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ]
);

