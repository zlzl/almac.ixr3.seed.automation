var require = patchRequire(require);

var acknowledgeReceiptUrl = uriHome + 'AcknowledgeReceipt/Index';
var acknowledgeOrderUrl = uriHome + 'ShipmentStatus/AcknowledgeOrder';

exports.openAcknowledgeReceiptPage = function()
{
	casper.then(function() 
	{
		this.open(acknowledgeReceiptUrl);
		this.waitForUrl(acknowledgeReceiptUrl);
	});
}

exports.acknowledgeReceiptOfShipment = function(shipmentNumber) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(acknowledgeReceiptUrl) < 0)
		{
			exports.openAcknowledgeReceiptPage();
		}
	});

	casper.thenEvaluate(function(shipmentNumber) 
	{
		document.querySelector('input[data-object-id="Shipment_Number"]').setAttribute('value', shipmentNumber);

	}, shipmentNumber);
	
	// this is a hack to wait for the order to process.
	// the better solution is to keep trying the acknowledge until the order is ready.  
	// but ain't nobody got time for that...
	var acknowledgeButton = 'input[data-object-id="Acknowledge"]';
	casper.wait(10000, function() 
	{ 
		this.click(acknowledgeButton);
	});
	
	casper.waitForSelector('#Complete_and_Uncompromised');
	casper.then(function() 
	{
		this.click('#Complete_and_Uncompromised'); 
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Acknowledged Shipment " + shipmentNumber);
	});
};