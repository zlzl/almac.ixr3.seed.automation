/* *********************************************************************************** */
// dependencies
//
// nodejs -> http://nodejs.org/
// python -> https://www.python.org/
// casperjs -> http://casperjs.org/
//
// ensure casperjs, nodejs, and python are set in the PATH variable
//

/* *********************************************************************************** */
// execution
//
// > casperjs execute.js

/* *********************************************************************************** */
// casperjs settings

var uriHome = 'http://localhost:62641/';
var loggingLevel = 'error';  // logging levels: debug, info, warning, error 
var logToConsole = true;
var timeoutWait = 50000;
var captureEnabled = true;
var captureSize = { width: 1280, height: 1280 }
var captureIndex = 0;
var capturePath = ".\\Captures\\" + getDateTimeLabel() + "\\";

/* *********************************************************************************** */
// load page modules

acknowledgeReceipt = require("./pages/acknowledgeReceipt.js");
approveSupply = require("./pages/approveSupply.js");
countryStrategy = require("./pages/countryStrategy.js");
depot = require("./pages/depot.js");
kitList = require("./pages/kitList.js");
language = require("./pages/language.js");
lotManagement = require("./pages/lotManagement.js");
randList = require("./pages/randList.js");
releaseSupply = require("./pages/releaseSupply.js");
site = require("./pages/site.js");
studySetting = require("./pages/studySetting.js");
supplyStrategy = require("./pages/supplyStrategy.js");

/* *********************************************************************************** */
// common functions 
// - these functions facilitate logging and screen capture

function saveCapture(fileName)
{
	if (captureEnabled)
	{
		captureIndex++;
		casper.echo(getCurrentDateTime() + ": " + fileName);
		casper.capture(capturePath + pad(captureIndex, 4, '0') + "_" + fileName + ".png");
	}
}

function getCurrentDateTime()
{
	var date = new Date(); 
	var datetime = date.getFullYear() + "/" + pad((date.getMonth()+1), 2) + "/" + pad(date.getDate(), 2) 
					+ " " + pad(date.getHours(), 2) + ":"  + pad(date.getMinutes(), 2) + ":" + pad(date.getSeconds(), 2);
	return datetime;
}

function getDateTimeLabel()
{
	var label = getCurrentDateTime();
	label = replaceAll(label, '/', '.');
	label = replaceAll(label, ' ', '_');
	label = replaceAll(label, ':', '.');
	return label;
}

function pad(value, width, padChar)
{
  padChar = padChar || '0';
  value = value + '';
  return value.length >= width ? value : new Array(width - value.length + 1).join(padChar) + value;
}

function replaceAll(string, find, replace) 
{
	return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) 
{
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

/* *********************************************************************************** */
// test data

var languagePreference = 'ENGUSAM';

var randFile = '.\\ImportFiles\\RandListImport.xlsx';
var kitFile = '.\\ImportFiles\\KitListImport.xlsx';

var kitTypeCodes = ["A", "B", "Needle"];

var doNotCountAtSiteIntervals = ["1", "4", "7"];
var doNotShipToDepotIntervals = ["2", "5", "8"];
var doNotShipToSiteIntervals = ["3", "6", "9"];

var orderQuantities = [10, 10, 10];

var depotName = 'United States Depot';
var depotCode = 'USA';
var depotCountry = 'United States';
var depotTimeZone = 'Eastern Standard Time';

var depotSupplyStrategyName = 'Strategy 1';

var siteName = 'United States Site 001';
var siteCode = 'USA001';
var siteCountry = 'United States';
var siteTimeZone = 'Eastern Standard Time';

var orderingLotNumber = '1L';
var labelLotNumber = 'Label 1';

/* *********************************************************************************** */
// main processing

var casper = require('casper').create(
	{
		verbose: logToConsole,
		logLevel: loggingLevel,
		viewportSize: captureSize,
		waitTimeout: timeoutWait
	});
	
casper.start(uriHome, function () 
{
	casper.then(function() { casper.echo(""); });
	casper.then(function() { casper.echo(getCurrentDateTime() + ": Started"); });
	
	casper.waitForSelector('#Menu_Study');

	// choose a language
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf("CheckForLanguagePreference") > -1)
		{
			language.chooseLanguage(languagePreference);
		}
	});

	// create depot
	casper.then(function() { depot.createDepot(depotName, depotCode, depotCountry, depotTimeZone); });
	
	// create supply strategy
	casper.then(function() { supplyStrategy.createSupplyStrategy(depotSupplyStrategyName, depotCountry); });
	
	// create country strategy
	casper.then(function() { countryStrategy.createCountryStrategy(depotName, depotCountry, depotSupplyStrategyName, kitTypeCodes, doNotCountAtSiteIntervals, doNotShipToDepotIntervals, doNotShipToSiteIntervals); });
	
	// update depot
	casper.then(function() { depot.addMailingAddress(depotCode, 'Mike Smith',  '123 Anywhere Street', 'Suit 104', 'Building 2', 'Philadelphia', 'PA', '19047'); });
	casper.then(function() { depot.addSupplyShipping(depotCode, depotCountry); });
	casper.then(function() { depot.addSupplyReceiving(depotCode); });
	casper.then(function() { depot.addSupplyOrdering(depotCode); });
	
	// enable enrollment
	casper.then(function() { studySetting.enableEnrollment(); });
	
	// import rand list
	casper.then(function() { randList.importList(randFile); });
	
	// import kit list
	casper.then(function() { kitList.importList(kitFile); });
	
	// create site
	casper.then(function() { site.createSite(siteName, siteCode, 'John Doe', 'john.doe@aol.com', siteCountry, siteTimeZone); });
	casper.then(function() { site.addMailingAddress(siteCode, 'Frank Frowner',  '256 Somewhere Road', 'Suit 101', 'Building 3', 'Newtown', 'PA', '18940'); });
	casper.then(function() { site.activateSite(siteCode); });
	casper.then(function() { site.enableTreatmentDispensing(siteCode); });
	casper.then(function() { site.addSupplyShipping(siteCode); });
	casper.then(function() { site.enableSupplyOrdering(siteCode); });
	
	// release supply
	casper.then(function() { releaseSupply.releaseNumberedSupply(depotName, 'A', 43000, 43098, orderingLotNumber, labelLotNumber); });
	casper.then(function() { releaseSupply.releaseNumberedSupply(depotName, 'B', 73099, 73198, orderingLotNumber, labelLotNumber); });
	casper.then(function() { releaseSupply.releaseNonNumberedSupply(depotName, 'Needle', 200, orderingLotNumber, labelLotNumber); });
	
	// approve released supply
	casper.then(function() { approveSupply.approveSupply(orderingLotNumber, 'A'); });
	casper.then(function() { approveSupply.approveSupply(orderingLotNumber, 'B'); });
	casper.then(function() { approveSupply.approveSupply(orderingLotNumber, 'Needle'); });
	
	// update lot details
	casper.then(function() { lotManagement.addLotApprovalCountry(orderingLotNumber, depotCountry, 'Released', '01-Jan-2017'); });
	casper.then(function() { lotManagement.editLotInformation(orderingLotNumber, 'ShippingReleased', '01', 'Jan', '2017'); });
	
	// order supplies
	casper.then(function(){ site.orderSupplies(siteCode, kitTypeCodes, orderQuantities); });
	
	// acknowledge receipt
	casper.then(function() { acknowledgeReceipt.acknowledgeReceiptOfShipment('1'); });
	
	casper.then(function() { casper.echo(getCurrentDateTime() + ": Finished"); });
});

// execute the damn thing...
casper.run();