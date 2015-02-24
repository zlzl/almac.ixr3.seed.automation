var require = patchRequire(require);

var supplyStrategyUrl = uriHome + 'SupplyStrategies/Search';

exports.openSupplyStrategyPage = function()
{
	casper.then(function() 
	{
		this.open(supplyStrategyUrl);
		this.waitForUrl(supplyStrategyUrl);
	});
}

exports.createSupplyStrategy = function(strategyName, country) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(supplyStrategyUrl) < 0)
		{
			exports.openSupplyStrategyPage();
		}
	});

	casper.waitForSelector('a[data-object-id="Create_Strategy"]');
	casper.then(function()
	{
		this.clickLabel('Create Strategy', 'a');
	});
	
	casper.waitForSelector('#Name');
	casper.thenEvaluate(function(strategyName, country) 
	{
		document.querySelector('#Name').setAttribute('value', strategyName);
		
		$('select[ng-model="newCountry"] option').filter(function() { return $(this).text() == country; }).prop('selected', true);
		$('select[ng-model="newCountry"] option').change();
		
	}, strategyName, country);
	
	casper.then(function()
	{
		this.clickLabel('Add Country', 'a');
	});
	
	casper.thenEvaluate(function() 
	{ 
		document.forms[0].submit(); 
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Created Supply Strategy " + strategyName + " - " + country);
	});
};