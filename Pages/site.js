var require = patchRequire(require);

var siteUrl = uriHome + 'Sites/Search';
var siteEditUrl = uriHome + 'Sites/Edit';

exports.openSitePage = function()
{
	casper.then(function() 
	{
		this.open(siteUrl);
		this.waitForUrl(siteUrl);
	});
}

exports.openSiteEditPage = function(siteCode)
{
	exports.openSitePage();
	
	casper.then(function() 
	{
		this.clickLabel(siteCode, 'a');
	});
}

exports.createSite = function(siteName, siteCode, primaryInvestigator, primaryInvestigatorEmail, country, timeZone) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(siteUrl) < 0)
		{
			exports.openSitePage();
		}
	});
	
	casper.waitForSelector('a[data-object-id="Create_Site"]');
	casper.then(function() 
	{
		this.clickLabel('Create Site', 'a'); 
	});

	casper.waitForSelector('#SiteBasicInformation_Name');
	casper.thenEvaluate(function(siteName, siteCode, primaryInvestigator, primaryInvestigatorEmail, country, timeZone) 
	{
		document.querySelector('#SiteBasicInformation_Name').setAttribute('value', siteName);
		document.querySelector('#SiteBasicInformation_SiteCode').setAttribute('value', siteCode);
		document.querySelector('#SiteBasicInformation_PrimaryInvestigator').setAttribute('value', primaryInvestigator);
		document.querySelector('#Primary_Investigator_Email').setAttribute('value', primaryInvestigatorEmail);
		
		$('#CountryId option').filter(function() { return $(this).text() == country; }).prop('selected', true);
		$('#CountryId option').change();
		
		$('#TimeZoneId option').filter(function() { return $(this).val() == timeZone; }).prop('selected', true);
		$('#TimeZoneId option').change();
		
	}, siteName, siteCode, primaryInvestigator, primaryInvestigatorEmail, country, timeZone);
	
	casper.then(function() 
	{
		this.click('#Create_Site'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Created Site " + siteCode);
	});
};

exports.addMailingAddress = function(siteCode, attention, addr1, addr2, addr3, city, state, zip) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(siteEditUrl) < 0)
		{
			exports.openSiteEditPage(siteCode);
		}
	});
	
	casper.waitForSelector('#BasicDetails');
	casper.then(function() 
	{
		this.clickLabel('Basic Details', 'a');
	});
	
	casper.waitForSelector('#Add_MailingAddress');
	casper.then(function() 
	{
		this.click('#Add_MailingAddress');
	});
	
	casper.waitForSelector('#MailingAddress_Attention');
	casper.thenEvaluate(function(attention, addr1, addr2, addr3, city, state, zip) 
	{
		document.querySelector('#MailingAddress_Attention').setAttribute('value', attention);
		document.querySelector('#MailingAddress_StreetAddress').setAttribute('value', addr1);
		document.querySelector('#MailingAddress_AddressLine2').setAttribute('value', addr2);
		document.querySelector('#MailingAddress_AddressLine3').setAttribute('value', addr3);
		document.querySelector('#MailingAddress_City').setAttribute('value', city);
		document.querySelector('#MailingAddress_StateOrProvince').setAttribute('value', state);
		document.querySelector('#MailingAddress_PostalCode').setAttribute('value', zip);
	}, attention, addr1, addr2, addr3, city, state, zip);
	
	casper.then(function() 
	{
		this.click('#Save'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Added Site Mailing Address " + siteCode);
	});
};

exports.activateSite = function(siteCode) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(siteEditUrl) < 0)
		{
			exports.openSiteEditPage(siteCode);
		}
	});
	
	casper.waitForSelector('#BasicDetails');
	casper.then(function() 
	{
		this.clickLabel('Basic Details', 'a');
	});
	
	casper.waitForSelector('#Edit_SitePermissions');
	casper.then(function() 
	{
		this.click('#Edit_SitePermissions');
	});
	
	casper.waitForSelector('#siteActivationStatus-true');
	casper.then(function() 
	{
		this.click('#siteActivationStatus-true');
	});
	
	casper.then(function() 
	{
		this.click('#Save');
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Activated Site " + siteCode);
	});
}

exports.enableTreatmentDispensing = function(siteCode) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(siteEditUrl) < 0)
		{
			exports.openSiteEditPage(siteCode);
		}
	});
	
	casper.waitForSelector('#BasicDetails');
	casper.then(function() 
	{
		this.clickLabel('Basic Details', 'a');
	});
	
	casper.waitForSelector('#Edit_TreatmentDispensing');
	casper.then(function() 
	{
		this.click('#Edit_TreatmentDispensing');
	});
	
	casper.waitForSelector('#treatmentDispensing-true');
	casper.then(function() 
	{
		this.click('#treatmentDispensing-true');
	});
	
	casper.then(function() 
	{
		this.click('#Save');
	});
	
	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Enabled Site Treatment Dispensing " + siteCode);
	});
}

exports.addSupplyShipping = function(siteCode) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(siteEditUrl) < 0)
		{
			exports.openSiteEditPage(siteCode);
		}
	});
	
	casper.waitForSelector('#Supplies');
	casper.then(function() 
	{
		this.clickLabel('Supplies', 'a');
	});
	
	casper.waitForSelector('#Add_ShippingAddress');
	casper.then(function() 
	{
		this.click('#Add_ShippingAddress');
	});
	
	casper.waitForSelector('#copyToShippingAddress');
	casper.then(function() 
	{
		this.click('#copyToShippingAddress');
	});
	
	casper.then(function() 
	{
		this.click('#Save'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Added Site Supply Shipping " + siteCode);
	});
};

exports.enableSupplyOrdering = function(siteCode) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(siteEditUrl) < 0)
		{
			exports.openSiteEditPage(siteCode);
		}
	});
	
	casper.waitForSelector('#Supplies');
	casper.then(function() 
	{
		this.clickLabel('Supplies', 'a');
	});
	
	casper.waitForSelector('#Edit_SupplyOrdering');
	casper.then(function() 
	{
		this.click('#Edit_SupplyOrdering');
	});
	
	casper.waitForSelector('#supplyOrdering-true');
	casper.then(function() 
	{
		this.click('#supplyOrdering-true');
	});
	
	casper.then(function() 
	{
		this.click('#Save'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Enabled Site Supply Ordering " + siteCode);
	});
};

exports.orderSupplies = function(siteCode, kitTypeCodes, orderQuantities) 
{
	casper.then(function()
	{
		var currentUrl = casper.getCurrentUrl();
		if (currentUrl.indexOf(siteEditUrl) < 0)
		{
			exports.openSiteEditPage(siteCode);
		}
	});
	
	casper.waitForSelector('#lnkOrderSupplies');
	casper.then(function() 
	{
		this.click('#lnkOrderSupplies');
	});
	
	casper.waitForSelector('input[data-object-id="Initiate_Order"]');
	casper.then(function() 
	{
		this.click('input[data-object-id="Initiate_Order"]');
	});
	
	casper.waitForSelector('#Select_Supplies');
	casper.then(function() 
	{
		for (index = 0; index < kitTypeCodes.length; ++index) 
		{
			this.thenEvaluate(function(kitTypeCodes, orderQuantities, index)
			{
				var element = __utils__.getElementByXPath("//div[@class='Row']/div[starts-with(.,'" + kitTypeCodes[index] + " - ')]/following::*[@value='0']");
				element.setAttribute('value', orderQuantities[index]);
				
			}, kitTypeCodes, orderQuantities, index);
		}
	});
	
	casper.then(function() 
	{
		this.click('#Select_Supplies'); 
	});
	
	casper.waitForSelector('#btnCreateOrder');
	casper.then(function() 
	{
		this.click('#btnCreateOrder'); 
	});
	
	casper.waitForSelector('#TransactionReasons_SelectedReason');
	casper.thenEvaluate(function() 
	{
		$('#TransactionReasons_SelectedReason option').filter(function() { return $(this).text() == 'Other'; }).prop('selected', true); 
		$('#TransactionReasons_SelectedReason option').change();
	});
	
	casper.then(function() 
	{
		this.click('#Save'); 
	});

	casper.waitForSelector('div[class="alert success"]');
	casper.then(function() 
	{
		saveCapture("Ordered Supplies " + siteCode);
	});
};