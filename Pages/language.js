var require = patchRequire(require);

exports.chooseLanguage = function(languageCode) 
{
	casper.waitForSelector('#Add_LanguagePreference');
	casper.then(function() 
	{
		this.click('#Add_LanguagePreference'); 
	});

	casper.waitForSelector('#LanguageCode');
	casper.thenEvaluate(function(languageCode) 
	{
		$('#LanguageCode option').filter(function() { return $(this).val() == languageCode; }).prop('selected', true);
		$('#LanguageCode option').change();
	}, languageCode);
	
	casper.then(function() 
	{
		this.click('#btnSaveAddress'); 
	});
};