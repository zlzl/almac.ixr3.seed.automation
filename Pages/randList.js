var require = patchRequire(require);

var randListUrl = uriHome + 'RandomizationImport/Upload';

exports.openRandListPage = function()
{
	casper.then(function() 
	{
		this.open(randListUrl);
		this.waitForUrl(randListUrl);
	});
}

exports.importList = function(randFile) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(randListUrl) < 0)
		{
			exports.openRandListPage();
		}
	});
	
	casper.waitForSelector('#RandomizationUploadForm');
	casper.then(function() 
	{
		this.fill('form#RandomizationUploadForm',
		{
			'Model.File': randFile
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
	
	casper.waitForSelector('#RandomizationList__RandomizationNumber__Select');
	casper.then(function() 
	{
		this.click('#RandomizationList__RandomizationNumber__Randomization_number');
	});
	
	casper.then(function() 
	{
		this.click('#RandomizationList__TreatmentCode__Treatment_Code');
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
		saveCapture("Imported Rand List");
	});
};