let app = angular.module('deceleroo', ['ngRoute']);
const homeScroll = function () {
  let scrollPos = window.scrollY;
  let windowHeight = window.innerHeight;
  const arrow = document.querySelector('.arrow-wrap');
  let heroRatio;
  if (scrollPos < 100) {
    arrow.style.opacity = 1;
  } else {
    arrow.style.opacity = 0;
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
app.controller('ArticlesCon', function($scope, $http) {
  $http.get('data/articles.json').then(function(res) {
    $scope.data = res.data;
  });
  $scope.deliver = function(card) {
    const dateWritten = new Date(card.written);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let wordCount = 0;
    setTimeout(() => {
      $scope.$parent.scrollPos = window.scrollY;
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.position = 'fixed';
    }, 500);
    document.querySelector('.details-wrap').classList.add('on');
    $scope.$parent.details.article = card;
    $scope.$parent.details.article.dateWritten =  months[dateWritten.getMonth()] + ' ' + dateWritten.getDate() + ', ' + dateWritten.getFullYear();
    for (let para of card.content) {
      if (para.type == 'text') {
        wordCount += para.content.split(' ').length + 1;
      }
    }
    $scope.$parent.details.article.wordCount = Math.ceil(wordCount/265) + 1;
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
    // "Articles",
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
      // case '/articles':
      //   $scope.theme = JSON.parse(JSON.stringify($scope.lightTheme));
      //   $scope.theme.buttonText = '#000';
      //   $scope.linesWidth = '75%';
      //   break;
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
  // .when('/articles', {
  //   templateUrl: 'pages/articles.html',
  //   controller: 'ArticlesCon'
  // })
  .when('/about', {
    templateUrl: 'pages/about.html',
    controller: 'AboutCon'
  })
  .otherwise({redirectTo: '/'})
})
