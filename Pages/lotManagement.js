var require = patchRequire(require);

var lotManagementUrl = uriHome + 'LotManagement/Search';
var lotManagementEditUrl = uriHome + 'LotManagement/Edit';

exports.openLotManagementPage = function()
{
	casper.then(function() 
	{
		this.open(lotManagementUrl);
		this.waitForUrl(lotManagementUrl);
	});
}

exports.openLotManagementEditPage = function(orderingLotNumber)
{	
	exports.openLotManagementPage();
	
	var releaseId = 'a[data-object-id="Approve_' + orderingLotNumber + '"]';
	casper.waitForSelector(releaseId);
	casper.then(function() 
	{
		this.click(releaseId);
	});
}

exports.addLotApprovalCountry = function(orderingLotNumber, country, lotApprovalStatus, expiry) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(lotManagementEditUrl) < 0)
		{
			exports.openLotManagementEditPage(orderingLotNumber);
		}
	});
	
	casper.waitForSelector('#Edit_LotApproval');
	casper.then(function() 
	{
		this.click('#Edit_LotApproval');
	});
	
	casper.waitForSelector('select[data-object-id="Country_Select"]');
	casper.thenEvaluate(function(country) 
	{
		$('select[data-object-id="Country_Select"] option').filter(function() { return $(this).text() == country; }).prop('selected', true);
		$('select[data-object-id="Country_Select"] option').change();
		
	}, country);
	
	casper.then(function() 
	{
		this.clickLabel('Add Country', 'a');
	});
	
	casper.waitForSelector('#Approvals____index____Status');
	casper.thenEvaluate(function(lotApprovalStatus, expiry) 
	{
		$('#Approvals____index____Status option').filter(function() { return $(this).text() == lotApprovalStatus; }).prop('selected', true);
		$('#Approvals____index____Status option').change();
		
		$('input[data-object-id="Expiry_Date"]').val(expiry);
		$('input[data-object-id="Expiry_Date"]').change();
		
	}, lotApprovalStatus, expiry);
	
	casper.then(function() 
	{
		this.click('#Save');
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Added Lot Approval Country " + orderingLotNumber + " - " + country);
	});
};

exports.editLotInformation = function(orderingLotNumber, lotStatus, expiryDay, expiryMonth, expiryYear) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(lotManagementEditUrl) < 0)
		{
			exports.openLotManagementEditPage(orderingLotNumber);
		}
	});
	
	casper.waitForSelector('#Edit_LotInformation');
	casper.then(function() 
	{
		this.click('#Edit_LotInformation');
	});
	
	casper.waitForSelector('#OrderingLot_Status');
	casper.thenEvaluate(function(lotStatus, expiryDay, expiryMonth, expiryYear) 
	{
		$('#OrderingLot_Status option').filter(function() { return $(this).val() == lotStatus; }).prop('selected', true);
		$('#OrderingLot_Status option').change();
		
		$('select[data-object-id="OrderingLot_ExpiryDate_day"] option').filter(function() { return $(this).val() == expiryDay; }).prop('selected', true);
		$('select[data-object-id="OrderingLot_ExpiryDate_day"] option').change();
		
		$('select[data-object-id="OrderingLot_ExpiryDate_month"] option').filter(function() { return $(this).text() == expiryMonth; }).prop('selected', true);
		$('select[data-object-id="OrderingLot_ExpiryDate_month"] option').change();
		
		$('select[data-object-id="OrderingLot_ExpiryDate_year"] option').filter(function() { return $(this).val() == expiryYear; }).prop('selected', true);
		$('select[data-object-id="OrderingLot_ExpiryDate_year"] option').change();
		
	}, lotStatus, expiryDay, expiryMonth, expiryYear);
	
	casper.then(function() 
	{
		this.click('#Save');
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Edited Lot Information " + orderingLotNumber + " - " + lotStatus);
	});
};