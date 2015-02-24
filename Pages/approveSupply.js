var require = patchRequire(require);

var approveSupplyUrl = uriHome + 'SupplyReleases/Search';

exports.openApproveSupplyPage = function()
{
	casper.then(function() 
	{
		this.open(approveSupplyUrl);
		this.waitForUrl(approveSupplyUrl);
	});
}

exports.approveSupply = function(orderingLotNumber, kitTypeCode) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(approveSupplyUrl) < 0)
		{
			exports.openApproveSupplyPage();
		}
	});
	
	var releaseId = 'a[data-object-id="Approve_' + orderingLotNumber + '"]';
	casper.waitForSelector(releaseId);
	casper.then(function() 
	{
		this.click(releaseId);
	});
	
	casper.waitForSelector('#btnApprove');
	casper.then(function() 
	{
		this.click('#btnApprove');
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Approved Supply " + orderingLotNumber + " - " + kitTypeCode);
	});
};
