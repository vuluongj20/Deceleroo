let app = angular.module('deceleroo', ['ngRoute']);
const homeScroll = function () {
  let scrollPos = window.scrollY;
  let windowHeight = window.innerHeight;
  const hero = document.querySelector('.hero');
  const arrow = document.querySelector('.arrow-wrap');
  const navButton = document.querySelector('.nav-button.switch-on');
  let heroRatio;
  if (scrollPos < 100) {
    arrow.style.opacity = 1;
  } else {
    arrow.style.opacity = 0;
  }
  if (window.innerWidth > 767) {
    if (scrollPos < windowHeight*0.5) {
      heroRatio = 1 - scrollPos*0.5/windowHeight;
      hero.style.transform = "scale(" + heroRatio + ')';
      hero.style.webkitBorderRadius = 160*(1-heroRatio) + 'px';
      hero.style.borderRadius = 160*(1-heroRatio) + 'px';
      hero.style.willChange = "transform";
      navButton.classList.add('off');
    } else if (windowHeight*0.5 < scrollPos && scrollPos < windowHeight) {
      hero.style.transform = "scale(0.75)";
      hero.style.borderRadius = "40px";
      hero.style.willChange = "transform";
      navButton.classList.remove('off');
    } else {
      hero.style.transform = "scale(0.75)";
      hero.style.borderRadius = "40px";
      hero.style.willChange = "unset";
    }
  } else {
    if (scrollPos < windowHeight*0.2) {
      heroRatio = 1 - scrollPos*0.5/windowHeight;
      hero.style.transform = "scale(" + heroRatio + ')';
      hero.style.webkitBorderRadius = 160*(1-heroRatio) + 'px';
      hero.style.borderRadius = 160*(1-heroRatio) + 'px';
      hero.style.willChange = "transform";
    } else if (windowHeight*0.2 < scrollPos && scrollPos < windowHeight*0.5) {
      hero.style.transform = "scale(0.9)";
      hero.style.borderRadius = "40px";
      hero.style.willChange = "transform";
    } else {
      hero.style.transform = "scale(0.9)";
      hero.style.borderRadius = "40px";
      hero.style.willChange = "unset";
    }
  }
};

app.controller('HomeCon', function($scope, $http) {
  $http.get("data/home.json").then(function(res) {
    $scope.data = res.data;
  });
  $scope.deliver = function(card) {
    setTimeout(() => {
      $scope.$parent.scrollPos = window.scrollY;
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.position = 'fixed';
    }, 500);
    document.querySelector('.details-wrap').classList.add('on');
    $scope.$parent.details[card.type] = card;
  }
  document.addEventListener("scroll", homeScroll);
});
app.controller('PodcastsCon', function($scope, $http) {
  $http.get('data/podcasts.json').then(function(res) {
    $scope.data = res.data;
  });
  $scope.deliver = function(card) {
    setTimeout(() => {
      $scope.$parent.scrollPos = window.scrollY;
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.position = 'fixed';
    }, 500);
    document.querySelector('.details-wrap').classList.add('on');
    $scope.$parent.details.podcast = card;
  }
});
app.controller('VideosCon', function($scope, $http) {
  $http.get('data/videos.json').then(function(res) {
    $scope.data = res.data;
  });
  $scope.deliver = function(card) {
    setTimeout(() => {
      $scope.$parent.scrollPos = window.scrollY;
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.position = 'fixed';
    }, 500);
    document.querySelector('.details-wrap').classList.add('on');
    $scope.$parent.details.video = card;
  }
});
app.controller('AboutCon', function($scope, $http) {
  $http.get('data/about.json').then(function(res) {
    $scope.data = res.data;
  });
});


app.controller('NavControl', function($scope) {
  $scope.pages = [
    "Home",
    "Videos",
    "Podcasts",
    "About"
  ];
  $scope.navOn = function() {
    document.querySelector('nav').classList.add('on');
    document.querySelector('body').style.overflow = 'hidden';
    if ($scope.$parent.isiOS) {
      $scope.scrollPos = window.scrollY;
      document.removeEventListener("scroll", homeScroll);
      document.querySelector('body').style.position = 'fixed';
      document.querySelector('body').style.top = -$scope.scrollPos + 'px';
    }
  }
  $scope.navOff = function() {
    document.querySelector('nav').classList.remove('on');
    document.querySelector('body').style.overflow = 'auto';
    if ($scope.$parent.isiOS) {
      document.querySelector('body').style.position = 'relative';
      window.scrollTo(0, $scope.scrollPos);
      document.querySelector('body').style.top = 0;
      document.addEventListener("scroll", homeScroll);
    }
  }
});
app.controller('ThemeControl', function($scope, $location, $sce, $window) {
  window.addEventListener('resize', function() {
    $scope.$apply();
  });
  $scope.lightTheme = {
    background: '#fff',
    primary: '#f1f1f1',
    secondary: '#ffc107',
    tertiary: '#999',
    text: '#000',
    button: '#e7e7e7',
    buttonText: '#fca500',
    fontSize: window.getComputedStyle(document.querySelector('body')).fontSize.replace('px', '')
  }
  $scope.darkTheme = {
    background: '#101010',
    primary: '#181818',
    secondary: '#fca500',
    tertiary: '#999',
    text: '#fff',
    button: '#222222',
    buttonText: '#fff',
    fontSize: window.getComputedStyle(document.querySelector('body')).fontSize.replace('px', '')
  }
  $scope.theme = $scope.lightTheme;
  $scope.now = new Date().getFullYear();
  $scope.isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  $scope.isChromeiOS = /CriOS/.test(navigator.userAgent);
  $scope.window = $window;
  $scope.lines = [];
  for (let i of Array(5).keys()) {
    let rand = Math.floor(Math.random()*100);
    if (!$scope.lines.includes(rand) && rand > 5 && rand < 95) {
      $scope.lines.push(rand);
    }
  }
  if (!$scope.lines.includes(92)) {
    $scope.lines.push(92);
  }
  if (!$scope.lines.includes(10)) {
    $scope.lines.push(10);
  }
  $scope.currentRoute = $location.path();
  $scope.$on('$routeChangeSuccess', function() {
    document.querySelector('nav').classList.remove('on');
    document.querySelector('body').style.overflow = 'auto';
    if ($scope.isiOS) {
      document.querySelector('body').style.position = 'relative';
      window.scrollTo(0, $scope.scrollPos);
      document.querySelector('body').style.top = 0;
      document.addEventListener("scroll", homeScroll);
    }
    document.removeEventListener("scroll", homeScroll);
    window.scrollTo(0,0);
    $scope.currentRoute = $location.path();
    $scope.lines = [];
    for (let i of Array(5).keys()) {
      let rand = Math.floor(Math.random()*100);
      if (!$scope.lines.includes(rand) && rand > 5 && rand < 95) {
        $scope.lines.push(rand);
      }
    }
    if (!$scope.lines.includes(92)) {
      $scope.lines.push(92);
    }
    if (!$scope.lines.includes(10)) {
      $scope.lines.push(10);
    }
    switch ($location.path()) {
      case  '/podcasts':
        $scope.theme = JSON.parse(JSON.stringify($scope.darkTheme));
        $scope.theme.buttonText = '#fdd835';
        $scope.linesWidth = '60%';
        break;
      case '/videos':
        $scope.theme = JSON.parse(JSON.stringify($scope.lightTheme));
        $scope.theme.buttonText = '#f44336';
        $scope.linesWidth = '75%';
        break;
      case '/about':
        $scope.theme = JSON.parse(JSON.stringify($scope.lightTheme));
        $scope.theme.buttonText = '#8bc34a';
        $scope.linesWidth = '75%';
        break;
      default:
        $scope.theme = $scope.lightTheme;
        $scope.linesWidth = '75%';
    }
    $scope.navLoading = -1;
    $scope.dataLoaded = true;
  });
  $scope.loadingToggle = function(i, page, pages) {
    if ($scope.currentRoute.replace('/', '') != page.toLowerCase() && ($scope.currentRoute != '/' || pages.indexOf(page) != 0)) {
      $scope.navLoading = i;
    }
  }
  $scope.navLoading = -1;
  $scope.details = {};
  $scope.eraseDetails = function() {
    document.querySelector('body').style.overflow = 'auto';
    document.querySelector('body').style.position = 'relative';
    window.scrollTo(0, $scope.scrollPos);
    document.ontouchmove = function (e) {
      return true;
    }
    document.querySelector('.details-wrap').classList.remove('on');
    setTimeout(() => {
      $scope.details = {};
      $scope.$apply();
    }, 500);
  }
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $scope.idify = function(string) {
    return string.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z\d\-]/g, '');
  }
});


app.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'HomeCon'
  })
  .when('/podcasts', {
    templateUrl: 'pages/podcasts.html',
    controller: 'PodcastsCon'
  })
  .when('/videos', {
    templateUrl: 'pages/videos.html',
    controller: 'VideosCon'
  })
  .when('/about', {
    templateUrl: 'pages/about.html',
    controller: 'AboutCon'
  })
  .otherwise({redirectTo: '/'})
})
