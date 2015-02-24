var require = patchRequire(require);

var studySettingUrl = uriHome + 'StudyManagement/Index';

exports.openStudySettingPage = function()
{
	casper.then(function() 
	{
		this.open(studySettingUrl);
		this.waitForUrl(studySettingUrl);
	});
}

exports.enableEnrollment = function() 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(studySettingUrl) < 0)
		{
			exports.openStudySettingPage();
		}
	});
	
	casper.waitForSelector('#Enrollment');
	casper.then(function() 
	{
		this.clickLabel('Enrollment', 'a');
	});
	
	casper.waitForSelector('#Edit_Screening');
	casper.then(function() 
	{
		this.click('#Edit_Screening');
	});
	
	casper.waitForSelector('#Screening_Enabled');
	casper.then(function() 
	{
		this.click('#Screening_Enabled');
	});
	
	casper.waitForSelector('#Save_Study_Screening');
	casper.then(function() 
	{
		this.click('#Save_Study_Screening');
	});
	
	casper.waitForSelector('#Edit_Randomization');
	casper.then(function() 
	{
		this.click('#Edit_Randomization');
	});
	
	casper.waitForSelector('#Randomization_Enabled');
	casper.then(function() 
	{
		this.click('#Randomization_Enabled');
	});
	
	casper.waitForSelector('#Save_Study_Randomization');
	casper.then(function() 
	{
		this.click('#Save_Study_Randomization');
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Enabled Enrollment");
	});
};