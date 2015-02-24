var require = patchRequire(require);

var countryStrategyUrl = uriHome + 'CountryProfile/Countries';

exports.openCountryStrategyPage = function()
{
	casper.then(function() 
	{
		this.open(countryStrategyUrl);
		this.waitForUrl(countryStrategyUrl);
	});
}

exports.createCountryStrategy = function(depotName, country, strategyName, kitTypeCodes, doNotCountAtSiteIntervals, doNotShipToDepotIntervals, doNotShipToSiteIntervals) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(countryStrategyUrl) < 0)
		{
			exports.openCountryStrategyPage();
		}
	});
	
	casper.waitForSelector('#Country');
	casper.thenEvaluate(function(country) 
	{
		$('#Country option').filter(function() { return $(this).text() == country; }).prop('selected', true);
		$('#Country option').change();
		
	}, country);
	
	casper.then(function() 
	{
		this.click('#AddCountryProfile');
	});
	
	casper.waitForSelector('#Depot');
	casper.thenEvaluate(function(depotName, strategyName) 
	{
		$('#Depot option:contains(' + depotName + ')').prop('selected', true);
		$('#Depot option:contains(' + depotName + ')').change();
		
		$('#Strategy option').filter(function() { return $(this).text() == strategyName; }).prop('selected', true);
		$('#Strategy option').change();
		
	}, depotName, strategyName);
	
	casper.then(function() 
	{
		for (index = 0; index < kitTypeCodes.length; ++index) 
		{
			this.thenEvaluate(function(kitTypeCodes, doNotCountAtSiteIntervals, doNotShipToDepotIntervals, doNotShipToSiteIntervals, index)
			{
				document.querySelector('#KitTypeStopIntervals_' + index + '__DoNotShipToDepotDays').setAttribute('value', doNotShipToDepotIntervals[index]);
				document.querySelector('#KitTypeStopIntervals_' + index + '__DoNotShipToSiteDays').setAttribute('value', doNotShipToSiteIntervals[index]);
				document.querySelector('#KitTypeStopIntervals_' + index + '__DoNotCountAtSiteDays').setAttribute('value', doNotCountAtSiteIntervals[index]);
				
			}, kitTypeCodes, doNotCountAtSiteIntervals, doNotShipToDepotIntervals, doNotShipToSiteIntervals, index);
		}
		
	});
	
	casper.thenEvaluate(function() 
	{ 
		document.forms[0].submit(); 
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Created Country Strategy " + depotName + " - " + country + " - " + strategyName);
	});
};