sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'inno/devicedetailfioriapp/test/integration/FirstJourney',
		'inno/devicedetailfioriapp/test/integration/pages/TiveDeviceList',
		'inno/devicedetailfioriapp/test/integration/pages/TiveDeviceObjectPage'
    ],
    function(JourneyRunner, opaJourney, TiveDeviceList, TiveDeviceObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('inno/devicedetailfioriapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTiveDeviceList: TiveDeviceList,
					onTheTiveDeviceObjectPage: TiveDeviceObjectPage
                }
            },
            opaJourney.run
        );
    }
);