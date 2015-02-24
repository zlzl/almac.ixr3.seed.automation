var require = patchRequire(require);

var depotUrl = uriHome + 'Depots/Search';
var depotEditUrl = uriHome + 'Depots/Edit';

exports.openDepotPage = function()
{
	casper.then(function() 
	{
		this.open(depotUrl);
		this.waitForUrl(depotUrl);
	});
}

exports.openDepotEditPage = function(depotCode)
{
	exports.openDepotPage();
	
	casper.then(function() 
	{
		this.clickLabel(depotCode, 'a');
	});
}

exports.createDepot = function(depotName, depotCode, country, timeZone) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(depotUrl) < 0)
		{
			exports.openDepotPage();
		}
	});
	
	casper.waitForSelector('#Create_Depot');
	casper.then(function() 
	{
		this.click('#Create_Depot'); 
	});

	casper.waitForSelector('#Depot_Name');
	casper.thenEvaluate(function(depotName, depotCode, country, timeZone) 
	{
		document.querySelector('#Depot_Name').setAttribute('value', depotName);
		document.querySelector('#Depot_Code').setAttribute('value', depotCode);
		
		$('#Depot_Country option').filter(function() { return $(this).text() == country; }).prop('selected', true);
		$('#Depot_Country option').change();
		
		$('#Depot_Time_Zone option').filter(function() { return $(this).val() == timeZone; }).prop('selected', true);
		$('#Depot_Time_Zone option').change();
		
	}, depotName, depotCode, country, timeZone);
	
	casper.then(function() 
	{
		this.click('#Create_Depot'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Created Depot " + depotCode);
	});
};

exports.addMailingAddress = function(depotCode, attention, addr1, addr2, addr3, city, state, zip) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(depotEditUrl) < 0)
		{
			exports.openDepotEditPage(depotCode);
		}
	});
	
	casper.waitForSelector('#BasicDetails');
	casper.then(function() 
	{
		this.clickLabel('Basic Details', 'a');
	});
	
	casper.waitForSelector('#Add_DepotMailingAddress');
	casper.then(function() 
	{
		this.click('#Add_DepotMailingAddress');
	});
	
	casper.waitForSelector('#Attention');
	casper.then(function() 
	{
		this.fill('form#addressForm', 
		{
			'Attention': 		attention,
			'AddressLine1': 	addr1,
			'AddressLine2': 	addr2,
			'AddressLine3': 	addr3,
			'City':				city,
			'StateOrProvince':	state,
			'PostalCode': 		zip
		}, false);
	});
	
	casper.then(function() 
	{
		this.click('#Save_Depot_Mailing_Address'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Added Depot Mailing Address " + depotCode);
	});
};

exports.addSupplyShipping = function(depotCode, country) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(depotEditUrl) < 0)
		{
			exports.openDepotEditPage(depotCode);
		}
	});
	
	casper.waitForSelector('#SupplyShipping');
	casper.then(function() 
	{
		this.clickLabel('Supply Shipping', 'a');
	});
	
	casper.waitForSelector('#Edit_ShipmentDeliveryIntervals');
	casper.then(function() 
	{
		this.click('#Edit_ShipmentDeliveryIntervals');
	});
	
	casper.waitForSelector('select[ng-model="country"]');
	casper.thenEvaluate(function(country) 
	{
		$('select[ng-model="country"] option').filter(function() { return $(this).text() == country; }).prop('selected', true);
		$('select[ng-model="country"] option').change();
		
	}, country);
	
	casper.then(function() 
	{
		this.clickLabel('Add Country', 'a');
	});
	
	casper.then(function() 
	{
		this.click('#Save_ShipmentDeliveryIntervals'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Added Depot Supply Shipping " + depotCode);
	});
};

exports.addSupplyReceiving = function(depotCode) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(depotEditUrl) < 0)
		{
			exports.openDepotEditPage(depotCode);
		}
	});
	
	casper.waitForSelector('#SupplyReceiving');
	casper.then(function() 
	{
		this.clickLabel('Supply Receiving', 'a');
	});
	
	casper.waitForSelector('#Add_DepotShippingAddress');
	casper.then(function() 
	{
		this.click('#Add_DepotShippingAddress');
	});
	
	casper.waitForSelector('#copyToShippingAddress');
	casper.then(function() 
	{
		this.click('#copyToShippingAddress');
	});
	
	casper.then(function() 
	{
		this.click('#Save_Depot_Shipping_Address'); 
	});
	
	casper.waitForSelector('#Add_DepotDestructionAddress');
	casper.then(function() 
	{
		this.click('#Add_DepotDestructionAddress');
	});
	
	casper.waitForSelector('#copyToDestructionAddress');
	casper.then(function() 
	{
		this.click('#copyToDestructionAddress');
	});
	
	casper.then(function() 
	{
		this.click('#Save_Depot_Destruction_Address'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Added Depot Supply Receiving " + depotCode);
	});
};

exports.addSupplyOrdering = function(depotCode) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(depotEditUrl) < 0)
		{
			exports.openDepotEditPage(depotCode);
		}
	});
	
	casper.waitForSelector('#SupplyRequisitioning');
	casper.then(function() 
	{
		this.clickLabel('Supply Ordering', 'a');
	});
	
	casper.waitForSelector('#Add_DepotScheduledSupplyTimes');
	casper.then(function() 
	{
		this.click('#Add_DepotScheduledSupplyTimes');
	});
	
	casper.waitForSelector('#Day');
	casper.thenEvaluate(function() 
	{
		$('#Day option').filter(function() { return $(this).text() == 'Monday'; }).prop('selected', true);
		$('#Day option').change();
		
	});
	
	casper.then(function() 
	{
		this.click('#btnSave'); 
	});
	
	casper.waitForSelector('#Edit_SupplyTransfers');
	casper.then(function() 
	{
		this.click('#Edit_SupplyTransfers');
	});
	
	casper.waitForSelector('#supplyTransfers-true');
	casper.then(function() 
	{
		this.click('#supplyTransfers-true');
	});
	
	casper.then(function() 
	{
		this.click('#Save'); 
	});
	
	casper.waitForSelector('#Edit_SupplySitesStatus');
	casper.then(function() 
	{
		this.click('#Edit_SupplySitesStatus');
	});
	
	casper.waitForSelector('#SupplySitessIsEnabled');
	casper.then(function() 
	{
		this.click('#SupplySitessIsEnabled');
	});
	
	casper.then(function() 
	{
		this.click('#Save_Depot'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Added Depot Supply Ordering " + depotCode);
	});
};
