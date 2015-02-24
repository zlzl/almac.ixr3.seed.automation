var require = patchRequire(require);

var kitListUrl = uriHome + 'KitListImport/Upload';

exports.openKitListPage = function()
{
	casper.then(function() 
	{
		this.open(kitListUrl);
		this.waitForUrl(kitListUrl);
	});
}

exports.importList = function(kitFile) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(kitListUrl) < 0)
		{
			exports.openKitListPage();
		}
	});
	
	casper.waitForSelector('#RandomizationUploadForm');
	casper.then(function() 
	{
		this.fill('form#RandomizationUploadForm',
		{
			'Model.File': kitFile
		}, false);
	});
	
	casper.waitForSelector('#Headers_Included');
	casper.then(function() 
	{
		this.click('#Headers_Included');
	});
	
	casper.then(function() 
	{
		this.click('input[name="btnContinue"]');
	});
	
	casper.waitForSelector('#KitList__KitNumber__Kit_Number');
	casper.then(function() 
	{
		this.click('#KitList__KitNumber__Kit_Number');
	});
	
	casper.then(function() 
	{
		this.click('#KitList__SequenceNumber__Sequence_Number');
	});
	
	casper.then(function() 
	{
		this.click('#KitList__KitTypeCode__Kit_Type');
	});
	
	casper.then(function() 
	{
		this.click('input[name="btnContinue"]');
	});
	
	casper.waitForSelector('input[name="btnContinue"]');
	casper.then(function() 
	{
		this.click('input[name="btnContinue"]');
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Imported Kit List");
	});
};