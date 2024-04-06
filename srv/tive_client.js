const cfenv = require ('cfenv');
const axios = require('axios');
5
6
const getSAPClientFromDestination = async (suaService, destinationService, destination) → {
try t
const uaa_service = cfenv-getAppEnv() - getService(xsuaaService);
const dest_service = cfenv.getAppEnv() •getService(destinationService);
8
9
const sUaaCredentials = dest_service.credentials. clientid +*: + dest_service.credentials.clientsecret;
10
const getAuthTokenRequest = {
11
12
url: uaa_service.credentials.url + */oauth/token?grant_type=client_credentials&client_id= + dest_service.credentials.clientid, method: 'POST'
13
headers: t
14
'Authorization': 'Basic' + Buffer. from(sUaaCredentials). toString('base64'),
15
'Content-type': 'application/x-ww-form-urlencoded*
16
17
｝；
18
Const authtokenkesponse = avait axios (getAuthfokenRequest)
19
const jwt TokenFromMethod = authTokenResponse.data.access_token;
20
const getDestdetailsRequest = {
21
url: dest_service.credentials.uri + '/destination-configuration/v1/destinations/ + destination,
22
method: 'GET',
23
headers: {
24
'Authorization': 'Bearer' + jwtTokenFromMethod
25
26
27
28
29
30
31
32
} ;
const destDetailsResponse = await axios (getDestdetailsRequest);
const sap_client = destDetailsResponse.data.destinationConfiguration['sap-client']
return sap_client;
} catch (error) {
console. log(error);
return
"Error";