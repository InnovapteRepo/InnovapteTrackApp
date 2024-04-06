
const cds = require('@sap/cds');
const TextBundle = require('@sap/textbundle').TextBundle;
const bundle = new TextBundle('./_i18n/i18n');
const { sendMail } = require('@sap-cloud-sdk/mail-client');
const excelJS = require("exceljs");
const { TiveDevice, TiveData } = cds.entities('innovapte.innovtrack');
const sdk = require('api')('@tive/v3#7poyxh24lqzb8eow');
const moment = require('moment');
const momentzone = require('moment-timezone');


module.exports = cds.service.impl(async function () {

    
    this.on("insertData", async function (req) {
        try {
            let tableData = JSON.parse(req.data.data);
            let tableName = req.data.tableName;
            if (!tableName) {
                return req.error('error');
            }
            for (let i = 0; i < tableData.length; i++) {
                let sDewPoint = tableData[i].Temperature - ((100 - tableData[i].Humidity) / 5);
                tableData[i].DewPoint = sDewPoint.toString();
            }
            const query = INSERT.into(`${tableName}`, tableData);
            let result = await cds.run(query).catch((error) => error);
            let response = '';
            if (result.code) {
                response = { code: 500, message: result.message }
            }
            return JSON.stringify(response);

        } catch (error) {
            return req.error('500');
        }
    });

    this.on("triggerMail", async function (req) {
        sendNotificationMail();
    });

    this.on('READ', "TiveHenkel", async (req) => {
        const date = new Date();
        const toYear = date.getFullYear();
        const toMonth = `0${date.getMonth() + 1}`.slice(-2);
        const toDay = `0${date.getDate()}`.slice(-2);

        const lastWeek = new Date(date.getTime() - 6 * 24 * 60 * 60 * 1000);
        const fromYear = lastWeek.getFullYear();
        const fromMonth = `0${lastWeek.getMonth() + 1}`.slice(-2);
        const fromDay = `0${lastWeek.getDate()}`.slice(-2);

        const toDate = `${toYear}-${toMonth}-${toDay}`;
        const fromDate = `${fromYear}-${fromMonth}-${fromDay}`;
        // let IOTDetails = await cds.read(Tive_Henkel).where({ Date: `${formattedDate}` });
        let IOTDetails = await cds.read(SELECT
            .columns`Device,Date,Time,Latitude,Longitude,Address,Temperature,TempUOM,Humidity,DewPoint,Battery`
            .from(Tive_Henkel).where`Date >= ${fromDate} and Date <= ${toDate}`);
        return IOTDetails;

    });


    let sendNotificationMail = async () => {
        let Attachment = {
            cid: 'inline',
            content: '',
            contentDisposition: 'attachment',
            // contentTransferEncoding: 'base64',
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            filename: 'Henkel'
        };
        let a = exportUser();
        let Attachments = [];
        Attachments.push(Attachment);

        //get value
        const deviceDetail = await cds.run(SELECT
            .from(Tive_Henkel)
            .where`Date = '2023-12-30'`);

        //Body
        let sEmailBody = `<head><style>table, th, td{border: 1px solid black; border-collapse: collapse;} table {width:100%}</style>
        </head>
        <body>
        <table>
        <tr>
          <th>DEVICE</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>LATITUDE</th>
          <th>LONGITUDE</th>
          <th>ADDRESS</th>
          <th>TEMPERATURE</th>
          <th>TEMPUOM</th>
          <th>HUMIDITY</th>
          <th>DEWPOINT</th>
          <th>BATTERY</th>
        </tr>`;

        for (let i = 0; i < deviceDetail.length; i++) {
            let sDewPoint = deviceDetail[i].Temperature - ((100 - deviceDetail[i].Humidity) / 5);
            deviceDetail[i].DewPoint = sDewPoint.toString();
            sEmailBody += `<tr>
            <td>${deviceDetail[i].Device}</td>
            <td>${deviceDetail[i].Date}</td>
            <td>${deviceDetail[i].Time}</td>
            <td>${deviceDetail[i].Latitude}</td>
            <td>${deviceDetail[i].Longitude}</td>
            <td>${deviceDetail[i].Address}</td>
            <td>${deviceDetail[i].Temperature}</td>
            <td>${deviceDetail[i].TempUOM}</td>
            <td>${deviceDetail[i].Humidity}</td>
            <td>${deviceDetail[i].DewPoint}</td>
            <td>${deviceDetail[i].Battery}</td>
            </tr>`;
        }

        sEmailBody += `</table></body>`;

        let mailConfig = {
            attachments: Attachments,
            from: 'batch_admin@innovapte.com',
            to: 'preeti@innovapte.com',
            subject: 'Henkel Report',
            html: sEmailBody
        };
        try {
            let abc = await sendMail({ destinationName: 'SMIR_MAIL' }, [mailConfig]);
            return abc;
        } catch (error) {
            console.log(error);
        }
    }


    const exportUser = async (req, res) => {
        const workbook = new excelJS.Workbook();  // Create a new workbook
        const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
        const path = "./files";  // Path to download excel
        // Column for data in excel. key must match data key
        worksheet.columns = [
            { header: "S no.", key: "s_no", width: 10 },
            { header: "First Name", key: "fname", width: 10 },
            { header: "Last Name", key: "lname", width: 10 },
            { header: "Email Id", key: "email", width: 10 },
            { header: "Gender", key: "gender", width: 10 },
        ];
        // Looping through User data
        let counter = 1;
        User.forEach((user) => {
            user.s_no = counter;
            worksheet.addRow(user); // Add data in worksheet
            counter++;
        });
        // Making first line in excel bold
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    };

    this.on("UpdateDeviceData", async (req) => {
        //get token
        sdk.postPublicV3Authenticate({
            grant_type: 'client_credentials',
            client_id: 'innovapteclientid',
            client_secret: '684da940-c26b-433c-bf1c-4c3f832b5414'
        }).then(token => {
            console.log(token);
            //get list of active shipment
            sdk.auth(token.data.access_token);
            sdk.getShipments({ States: 'Active', 'x-tive-account-id': '2072' })
                .then(async shipment => {
                    console.log(shipment.data.data);
                    for (let i = 0; i < shipment.data.data.length; i++) {
                        //get shipment tracker data
                        if (shipment.data.data.length) {
                            this.shipmentdata = shipment.data.data[i].shipmentId;
                        }
                        let Response = await getShipmentData(shipment.data.data[i].shipmentId);
                        //filter Beacon device data
                        var filterBecon = Response.data.data.filter(object => {
                            return !object.deviceId.startsWith("E");
                        });
                        var filterBecon = filterBecon.filter(object => {
                            return !object.deviceId.startsWith("F");
                        });
                        var filterBecon = filterBecon.filter(object => {
                            return !object.deviceId.startsWith("D");
                        });
                        var filterBecon = filterBecon.filter(object => {
                            return object.locationMethod != 'container';
                        });

                        let deviceId = await cds.read(SELECT
                            .columns`DeviceId,DeviceName`
                            .from(TiveDevice));
                        //format decimal value upto 2
                        let aPayload = [];

                        // filterBecon.forEach(async obj => {
                        for (let j = 0; j < filterBecon.length; j++) {
                            let finalpayload = {};
                            var tivedevicename = deviceId.filter(object => {
                                return object.DeviceId === filterBecon[j].deviceId;
                            });
                            let dateString = filterBecon[j].measurementTime;
                            let date1 = new Date(dateString);
                            let isoStr2 = date1.toISOString();
                            let date = momentzone(isoStr2);
                            let final = date.tz('Europe/Amsterdam').format('YYYY-MM-DD HH:mm:ss');
                            let datetime = final.split(' ');

                            finalpayload.delivery = shipment.data.data[i].shipmentId;
                            finalpayload.deviceId = tivedevicename[0].DeviceName;
                            finalpayload.date = datetime[0];
                            finalpayload.time = datetime[1];
                            if (filterBecon[j].coordinates) {
                                finalpayload.latitude = parseFloat(filterBecon[j].coordinates.latitude).toFixed(2) || '0.00';
                                finalpayload.longitude = parseFloat(filterBecon[j].coordinates.longitude).toFixed(2) || '0.00';
                            }
                            finalpayload.location = filterBecon[j].location;
                            if (filterBecon[j].humidity) {
                                filterBecon[j].humidity = parseFloat(filterBecon[j].humidity).toFixed(2);
                                finalpayload.humidity = filterBecon[j].humidity;
                            } else {
                                finalpayload.humidity = '0.00';
                            }
                            filterBecon[j].humidity = parseFloat(filterBecon[j].temperature).toFixed(2);
                            filterBecon[j].temperature = parseFloat(filterBecon[j].temperature).toFixed(2);
                            //convert temperture UOM from F to C
                            finalpayload.temperature = ((filterBecon[j].temperature - 32) * 5 / 9) ? ((filterBecon[j].temperature - 32) * 5 / 9) : '0.00'; //convert C to F degree              
                            //calculate dewpoint
                            filterBecon[j].dewPoint = 243.04 * (Math.log(filterBecon[j].humidity / 100) + ((17.625 * finalpayload.temperature) / (243.04 + finalpayload.temperature))) / (17.625 - Math.log(filterBecon[j].humidity / 100) - ((17.625 * finalpayload.temperature) / (243.04 + finalpayload.temperature)));
                            finalpayload.dewPoint = filterBecon[j].dewPoint ? filterBecon[j].dewPoint : '0.00';
                            finalpayload.battery = filterBecon[j].battery;

                            aPayload.push(finalpayload);
                        };

                        //Insert in table
                        const query = UPSERT.into(`INNOVAPTE_INNOVTRACK_TIVEDATA`, aPayload);
                        let res = await cds.run(query).catch((error) => error);
                        let response = '';
                        if (res.code) {
                            response = { code: 500, message: res.message }
                        }
                        // return JSON.stringify(response);

                    }//for loop end
                }).catch(err => console.error(err));
        }).catch(err => console.error(err));

        // new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' , hour12: false });
    });

    async function getShipmentData(shipmentId) {
        let resp = await sdk.getPublicV3ShipmentsPublicshipmentidTrackerdata({ publicShipmentId: `${shipmentId}`, 'x-tive-account-id': '2072' })
            .then(async result => {
                console.log(result);
                return result;
            }).catch(err => console.error(err));
        return resp;
    }

    this.on('READ', "Device", async (req) => {
        // let where = req._queryOptions.$filter.replaceAll('eq', '=');
        // let url = `SELECT.columns DeviceName,Delivery.from(TiveDevice).where ${ where }`;
        // let IOTDetails = await cds.read(url);
        let IOTDetails = await cds.read(SELECT
            .columns`DeviceName,Delivery`
            .from(TiveDevice));
        return IOTDetails;
    });
});