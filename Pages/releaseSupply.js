var require = patchRequire(require);

var releaseSupplyUrl = uriHome + 'SupplyReleasing/Create';

exports.openReleaseSupplyPage = function()
{
	casper.then(function() 
	{
		this.open(releaseSupplyUrl);
		this.waitForUrl(releaseSupplyUrl);
	});
}

exports.releaseNumberedSupply = function(depotName, kitTypeCode, rangeMin, rangeMax, orderingLotNumber, labelLotNumber) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(releaseSupplyUrl) < 0)
		{
			exports.openReleaseSupplyPage();
		}
	});
	
	casper.waitForSelector('#supply_type_numbered');
	casper.then(function() 
	{
		this.click('#supply_type_numbered');
	});
	
	casper.thenEvaluate(function(depotName, kitTypeCode) 
	{
		$('#Specification_ReleaseToDepotId option:contains(' + depotName + ')').prop('selected', true);
		$('#Specification_ReleaseToDepotId option').change();
		
		$('#selectKitType option:contains(' + kitTypeCode + ' - ' + ')').prop('selected', true);
		$('#selectKitType option').change();
		
	}, depotName, kitTypeCode);
	
	casper.then(function() 
	{
		this.click('#AddKitType');
	});
	
	casper.waitForSelector('input[data-object-id="Numbered_Supply_0_From"]');
	casper.thenEvaluate(function(rangeMin, rangeMax, orderingLotNumber, labelLotNumber) 
	{
		$('input[data-object-id="Numbered_Supply_0_From"]').val(rangeMin);
		$('input[data-object-id="Numbered_Supply_0_To"]').val(rangeMax);
		$('#orderingLotNumberBox').val(orderingLotNumber);
		$('#labelLotNumberBox').val(labelLotNumber);
		
	}, rangeMin, rangeMax, orderingLotNumber, labelLotNumber);
	
	casper.then(function() 
	{
		this.click('#btnSubmit');
	});
	
	casper.waitForSelector('#btnSubmit');
	casper.then(function() 
	{
		this.click('#btnSubmit');
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Released Numbered Supply " + depotName + " - " + kitTypeCode);
	});
};

exports.releaseNonNumberedSupply = function(depotName, kitTypeCode, quantity, orderingLotNumber, labelLotNumber) 
{
	casper.waitForSelector('#Menu_Release_Supplies');
	casper.then(function() 
	{
		this.click('#Menu_Release_Supplies'); 
	});
	
	casper.waitForUrl('/SupplyReleasing/Create');
	casper.waitForSelector('#supply_type_nonnumbered');
	casper.then(function() 
	{
		this.click('#supply_type_nonnumbered');
	});
	
	casper.thenEvaluate(function(depotName, kitTypeCode) 
	{
		$('#Specification_ReleaseToDepotId option:contains(' + depotName + ')').prop('selected', true);
		$('#Specification_ReleaseToDepotId option').change();
		
		$('#NonnumberedKitType option:contains(' + kitTypeCode + ' - ' + ')').prop('selected', true);
		$('#NonnumberedKitType option').change();
		
	}, depotName, kitTypeCode);
	
	casper.then(function() 
	{
		this.click('#AddKitType');
	});
	
	casper.waitForSelector('#NonnumberedKitTypeQuantity');
	casper.thenEvaluate(function(quantity, orderingLotNumber, labelLotNumber) 
	{
		$('#NonnumberedKitTypeQuantity').val(quantity);
		$('#orderingLotNumberBox').val(orderingLotNumber);
		$('#labelLotNumberBox').val(labelLotNumber);
		
	}, quantity, orderingLotNumber, labelLotNumber);
	
	casper.then(function() 
	{
		this.click('#btnSubmit');
	});
	
	casper.waitForSelector('#btnSubmit');
	casper.then(function() 
	{
		this.click('#btnSubmit');
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Released NonNumbered Supply " + depotName + " - " + kitTypeCode);
	});
};