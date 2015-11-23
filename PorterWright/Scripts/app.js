


(function () {
    var app = angular.module('app', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/about");

        $stateProvider
          .state('about', { url: "/about", templateUrl: "Templates/about.html", controller: 'aboutController' })
          .state('services', { url: "/services", templateUrl: "Templates/services.html", controller: 'servicesController' })
          .state('portfolio', { url: "/portfolio?id", templateUrl: "Templates/portfolio.html", controller: 'portfolioController' })
          .state('testimonials', { url: "/testimonials", templateUrl: "Templates/testimonials.html", controller: 'testimonialsController' })
          .state('contact', { url: "/contact", templateUrl: "Templates/contact.html", controller: 'contactController' });
    });

    angular.module('app').controller('appController', function ($scope, $location, commonService) {

        var clientMenuItems = [];

        commonService.clients.forEach(function (client) {
            clientMenuItems.push({ text: client.name, view: 'portfolio', id: client.id });
        });

        $scope.ui = {
            menuItems: [
                { text: 'ABOUT', view: 'about' },
                { text: 'SERVICES', view: 'services' },
                { text: 'PORTFOLIO', view: 'portfolio', selectChild: true, menuItems: clientMenuItems },
                { text: 'TESTIMONIALS', view: 'testimonials' },
                { text: 'CONTACT', view: 'contact' }]
        };

        $scope.menuClick = function (menuItem) {

            if (!menuItem) {
                menuItem = $scope.ui.menuItems[0];
            }

            if (menuItem.selectChild) {
                menuItem = menuItem.menuItems[0];
            }
            $scope.selectedMenuItem = menuItem;
            $location.url('/' + menuItem.view + (menuItem.id ? "?id=" + menuItem.id : ""));
        }

        $scope.showChildren = function (menuItem) {
            if (menuItem.menuItems) {
                for (var i = 0; i < menuItem.menuItems.length; i++) {
                    if (menuItem.menuItems[i] === $scope.selectedMenuItem) {
                        return true;
                    }
                }
            }
            return false;
        }

        $scope.menuClick($scope.ui.menuItems[0]);
    });

    angular.module('app').controller('aboutController', function ($scope, commonService) {
        $scope.texts = commonService.about;
    });

    angular.module('app').controller('servicesController', function ($scope, commonService) {
        $scope.services = commonService.services;
    });

    angular.module('app').controller('portfolioController', function ($scope, $stateParams, commonService) {
        var id = $stateParams.id;
        $scope.text = '';

        commonService.clients.forEach(function (client) {

            if (client.id === id) {
                $scope.name = client.name;
                $scope.text = client.text;
                $scope.url = client.url;
                $scope.image = client.image;
            }
        });
    });

    angular.module('app').controller('testimonialsController', function ($scope, commonService) {

        commonService.testimonials.forEach(function (testimonial) {
            if (testimonial.url) {
                testimonial.site = testimonial.url
                    .replace("https://", "")
                    .replace("http://", "");
            }
        });


        $scope.testimonials = commonService.testimonials;
    });

    angular.module('app').controller('contactController', function ($scope) {

    });

})();


angular.module('app').factory('commonService', function () {

    var about = ['With over fifteen years experience in the luxury brand and web industries, Anna Porter-Wright founded the consultancy with the aim of providing effective e-commerce solutions, specifically targeted to luxury brands.',
        'A bespoke service is offered that specialises in simplifying the technical mystic and jargon that so often defines this area.',
        'Combining a wealth of experience in both London agencies and international luxury brands, the team truly understands the key issues facing the translation of luxury on-line; producing websites that engage the consumer and drive profits from day one. The service is unique, as clients can choose the exact level of service and support they require from a range of recommended experts. This flexible approach avoids costly overheads and facilitates the development of new sales channels without the need for employing specialist staff in-house.'];

    var testimonials = [
        { source: 'Penelope Chilvers', url: 'http://www.PenelopeChilvers.com', text: 'Anna was very effective in our marketing team. She was sensitive enough to capture spirit of  the brand, and showed agility in her motivation to market our product beyond the normal routes.' },
        { source: 'Anya Hindmarch', url: 'http://www.anyahindmarch.com', text: 'Anna Porter-Wright spearheaded the project of our new website and held our hand through each step of the way delivering a greate result on time and on budget. I can highly recommend her.' },
        { source: 'Lucy Enfield', url: 'http://www.ilovegorgeous.co.uk', text: 'Anna Porter-Wright has done a brilliant job in helping us to rebuild our website and now, as an ongoing commission, works on our web marketing plan, mailings and ppc/affiliates campaign. I certainly have no qualms about recommending her.' },
        { source: 'Sophie Worthington', url: 'http://www.ilovegorgeous.co.uk', text: 'We love working with Anna and enjoy experimenting with new ideas and ways to push the brand forward. We are lucky that Anna is so innovative.' },
        { source: 'Lucy Whitfield, Sales Director, Links of London', url: 'http://www.linksoflondon.com', text: 'Anna led the re-launch of the Links of London website which very quickly became a hugely succesful part of our retail strategy. She combines a real attention to detail with and imaginative approach and was always careful to engage her "web novice" colleagues' },
        { source: 'Ryan Kliszat, Managing Director', alt: 'Docdata Commerce', text: 'Anna came in to work drive Anya Hindmarch forward running the eCommerce. From the start she provided a breath of fresh air and always had her finger on the most important issues. This made an impact on the bottom line and she got there from working in partership, which is always stronger. Equally with the luxury fashion you always have to protect the brand which can be a difficult balancing act, I would recommend her to strike the right balance.' }
    ];

    var clients = [
        { id: '1', name: "Penelope Chilvers", url: 'http://www.PenelopeChilvers.com', image: 'PenelopeChilvers', text: 'A long term on-site placement with the objective of getting ecommerce sales figures back on track.  The existing site was refreshed and made responsive with a full marketing plan drafted.  PPC management was also undertaken.  Within 5  weeks the figures were showing a successful return and a year long contract followed.' },
        { id: '2', name: "Field Candy", url: 'http://www.FieldCandy.com', image: 'FieldCandy', text: 'Complete site re-design and full marketing programme implemented.  Additionally third parties were engaged to raise awareness whilst keeping to a limited budget.' },
        { id: '3', name: "Shrimps", url: 'http://www.Shrimps.co.uk', image: 'Shrimps', text: 'Site re-design and re-hosting to enable a stable ecommerce platform necessary for huge spikes in traffic. Complimented by full marketing plan, email and social strategy. On-going engagement.' },
        { id: '4', name: "ERDEM", url: 'https://erdem.com', image: 'Erdem', text: 'A comprehensive site overview and advice project where quick fixes and long term goals were advised. Simple site re-structures were suggested and key marketing levers overhauled.' },
        { id: '5', name: "ilovegorgeous", url: 'http://www.ilovegorgeous.co.uk', image: 'ILoveGorgeous', text: 'Site re-build and on-going marketing programme & support.\r\n\r\nA new site was commissioned to drive e-commerce sales and showcase the intricate designs. Being a relatively young brand, it was important that the site supplied sufficient brand information to encourage the first time visitor to purchase, as well as offering a stream-lined e-commerce solution. A full on and off-line marketing programme has been engineered to support the launch and provide on-going sales momentum.\r\n\r\nFurther sites overseas are now also being considered.\r\n\r\nCurrently enjoying continuing sales growth of over 400%.' },
        { id: '6', name: "The Design Museum", url: 'http://designmuseum.org', image: 'TheDesignMuseum', text: 'A full budgetary review was carried out, scoping out the cost of a new site, required marketing vehicles and predicting resulting sales.' },
        { id: '7', name: "Anya Hindmarch", url: 'http://www.anyahindmarch.com', image: 'AnyaHindmarch', text: 'The original retail site was totally re-built to produce a streamlined e-commerce offering that was inviting and visually engaging, with a strong retail focus at its core. In addition a CRM marketing schedule was engineered, supported by PPC, Affiliate and SEO marketing.\r\n\r\nSales growth from £300k per annum to £1.3 million in 2 years.  The site was also recognised twice by industry awards.' },
        { id: '8', name: "Links of London", url: 'http://www.linksoflondon.com', image: 'LinksOfLondon', text: 'A full e-marketing programme was engineered and launched which was rolled out across the UK and US to provide on-going sales momentum.\r\n\r\nThe website grew from £200k per annum to just over £3 million in 3 years.  The site was also recognised with an industry award.' },
        { id: '9', name: "Moet & Chandon", url: 'http://www.moet.com', image: 'MoetEtChandon', text: 'Extensive marketing support including a three year involvement with London Fashion Week due to Moet & Chandon\'s sponsorship.' },
        { id: '10', name: "Dom Perignon", url: 'http://www.domperignon.com', image: 'DomPerignon', text: 'Supporting the sell through of Dom Perignon including all key communication tools.' }
    ];

    var services = [
        { title: 'Web Build', text: 'Initial build & design of commercial websites to become engaging consumer propositions that drive profits and promote niche or luxury brands. On time, within budget and profitable from day one.' },
        { title: 'Web Evaluation', text: 'A comprehensive process to pin point trouble spots or areas for optimisation. Above all focusing on the issues that drive revenue.' },
        { title: 'Marketing Plans', text: 'Setting up post-launch marketing platforms and vehicles, including supporting seasonal & special events. Ensuring that everything is set up to drive profits within an agreed marketing schedule.' },
        { title: 'Budgeting', text: 'A comprehensive and robust budgeting service exists for both the initial build and to predict sales over specified period of time (6 or 12 months). An invaluable tool for investors and when planning likely product demand.' },
        { title: 'Third Party Affiliations', text: 'Forging marketing relationships and complementary brands that enhance the brand message and promote to a wider audience. Working together for a bigger impact.' },
        { title: 'Continual Marketing Innovation', text: 'Existing marketing activities can also be reviewed so that realistic and hard hitting enhancements can be made. Driving revenue without the need for a rebuild.' }
    ];

    return {
        clients: clients,
        about: about,
        services: services,
        testimonials: testimonials
    };
});


var initialIndexes = new Array();
var imageAnchorDivs = new Array();
var whiteSiteIcons = new Array();
var blackSiteIcons = new Array();
var interval = 1000;

function Start() {

    imageAnchorDivs[0] = new ImageAnchorDiv(0);
    imageAnchorDivs[1] = new ImageAnchorDiv(1);
    imageAnchorDivs[2] = new ImageAnchorDiv(2);
    imageAnchorDivs[3] = new ImageAnchorDiv(3);

    blackSiteIcons[0] = new SiteIcon('http://www.anyahindmarch.com', 'Images/AnyaHindmarchLogo.png');
    blackSiteIcons[1] = new SiteIcon('http://designmuseum.org', 'Images/TheDesignMuseumLogo.png');
    blackSiteIcons[2] = new SiteIcon('http://ilovegorgeous.co.uk', 'Images/ILoveGorgeousLogo.png');
    blackSiteIcons[3] = new SiteIcon('http://penelopechilvers.com', 'Images/PenelopeChilversLogo.png');
    blackSiteIcons[4] = new SiteIcon('http://fieldcandy.com', 'Images/FieldCandyLogo.png');
    blackSiteIcons[5] = new SiteIcon('http://shrimps.co.uk', 'Images/ShrimpsLogo.png');
    blackSiteIcons[6] = new SiteIcon('http://shrimps.co.uk', 'Images/ErdemLogo.png');

    whiteSiteIcons[0] = new SiteIcon('http://www.domperignon.com', 'Images/DomPerignonLogo.png');
    whiteSiteIcons[1] = new SiteIcon('http://www.linksoflondon.com', 'Images/LinksOfLondonLogo.png');
    whiteSiteIcons[2] = new SiteIcon('http://www.moet.com', 'Images/MoetEtChandonLogo.png');

    RandomiseArray(whiteSiteIcons);
    RandomiseArray(blackSiteIcons);

    //populate the initialIndexes
    for (i = 0; i < 4; ++i) {
        initialIndexes[i] = i;
    }

    //randomise them
    RandomiseArray(initialIndexes);

    Switch();
}

function Switch() {

    //get random imageAnchorDiv index
    var imageAnchorDivIndex = Math.floor(Math.random() * imageAnchorDivs.length);

    //while initialIndex still has values remove the first and use that
    if (initialIndexes.length > 0) {
        imageAnchorDivIndex = initialIndexes.splice(0, 1);
    }
    //once initialIndexes has been cleared increase the interval

    if (initialIndexes.length == 0) {

        interval = 5000;
    }

    var siteIcons = whiteSiteIcons;

    if (imageAnchorDivIndex % 2 == 0) {
        siteIcons = blackSiteIcons;
    }


    //get random siteIcon index
    var siteIconIndex = Math.floor(Math.random() * siteIcons.length);
    //get siteIcon
    var siteIcon = siteIcons[siteIconIndex];
    //remove from array
    siteIcons.splice(siteIconIndex, 1);

    //if existing siteIcon is not null
    if (imageAnchorDivs[imageAnchorDivIndex].siteIcon != null) {
        siteIcons.push(imageAnchorDivs[imageAnchorDivIndex].siteIcon);
    }

    imageAnchorDivs[imageAnchorDivIndex].show(siteIcon);

    //start the Show again
    window.timer = window.setTimeout("Switch()", interval);
}

function SiteIcon(siteUrl, iconUrl) {
    this.siteUrl = siteUrl;
    this.iconUrl = iconUrl;
}

function ImageAnchorDiv(index) {
    this.img = document.getElementById('img' + index);
    this.a = document.getElementById('a' + index);
    this.div = document.getElementById('div' + index);
    this.siteIcon = null;

    this.show = function (siteIcon) {
        this.siteIcon = siteIcon;

        this.div.style.backgroundImage = 'url(' + this.img.src + ')';
        this.div.style.backgroundRepeat = 'no-repeat';

        //set opacity of img to 0
        setOpacity(this.img, 0);

        this.img.src = siteIcon.iconUrl;
        this.a.href = siteIcon.siteUrl;


        //clear any existing timer
        if (this.img.timer)
            window.clearTimeout(this.img.timer);

        var startMS = (new Date()).getTime();

        //start the opacity changing
        this.img.timer = window.setTimeout("changeOpacity('" + this.img.id + "',1000," + startMS + ",0,100)", 10);
    }
}


function setOpacity(object, opacityPct) {
    // IE.
    object.style.filter = 'alpha(opacity=' + opacityPct + ')';
    // Old mozilla and firefox
    object.style.MozOpacity = opacityPct / 100;
    // Everything else.
    object.style.opacity = opacityPct / 100;
}

function changeOpacity(id, msDuration, msStart, fromO, toO) {
    var element = document.getElementById(id);
    var opacity = element.style.opacity * 100;
    var msNow = (new Date()).getTime();
    opacity = fromO + (toO - fromO) * (msNow - msStart) / msDuration;
    if (opacity < 0)
        setOpacity(element, 0);
    else if (opacity > 100)
        setOpacity(element, 100);
    else {
        setOpacity(element, opacity);
        element.timer = window.setTimeout("changeOpacity('" + id + "'," + msDuration + "," + msStart + "," + fromO + "," + toO + ")", 1);
    }
}

function RandomiseArray(array) {

    for (i = 0; i < 100; ++i) {
        var from = Math.floor(Math.random() * array.length);
        var to = Math.floor(Math.random() * array.length);
        var tmp = array[from];
        array[from] = array[to];
        array[to] = tmp;
    }
}