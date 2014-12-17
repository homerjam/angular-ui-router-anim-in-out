# angular-ui-router-anim-in-out

An animation directive to use with ngAnimate 1.2+ and ui-router


## Installation

`$ bower install angular-ui-router-anim-in-out --save`


## Quick Start

* Include `anim-in-out.js` & `anim-in-out.css` on the page
* Include module as a dependency of your app

```js
angular.module('ExampleApp', ['ngAnimate', 'ui.router', 'anim-in-out'])
```

* Configure states as per [ui-router](https://github.com/angular-ui/ui-router) instructions
* Add the animation directive `anim-in-out` to your `ui-view` elements by applying the class `anim-in-out`

```html
<div ui-view="mainView" class="anim-in-out"></div>
```

* Finally add classes from the `anim-in-out.css` to any elements you wish to transition on state change eg. `anim-fade`, `anim-slide-left`

```html
<div ui-view="mainView" class="anim-in-out anim-fade" data-anim-speed="1000">

    <!-- Dynamically loaded view content -->
    
    <div class="my-component anim-slide-left"></div>

</div>
```

## Usage

Animations are triggered by javascript in order to provide events.

```js
// In your main controller
$rootScope.$on('animStart', function($event, element, speed) {
    // do something
});
    
$rootScope.$on('animEnd', function($event, element, speed) {
    // do something
});
    
    
// In your state controllers
$scope.$on('animIn', function($event, element, speed) {
    // do something
});

// BROKEN see angular/angular.js#6974
$scope.$on('animOut', function($event, element, speed) {
    // do something, eg. scroll to top of page
});
```

The default transition speed is `1000ms` this can be altered using the `data-anim-speed` attribute on the `ui-view`. This is optionally further customised by the `data-anim-in-speed` and `data-anim-out-speed` attributes.

By default the animation of the incoming state will be triggered after a delay (`data-anim-speed` / `data-anim-in-speed`), but this can be changed by setting the attribute `data-anim-sync` to `true`.

```html
<div ui-view="mainView" class="anim-in-out" data-anim-sync="true"></div>
```


## Gotchas

If you notice a difference in behaviour after compiling your app such as an initial transition failing to trigger the suggestion in this [comment](https://github.com/angular/angular.js/issues/5130#issuecomment-34371140)/[plunkr](http://plnkr.co/edit/aoyRehXQnItGYA0EzTOC?p=preview) may help you*.

\* _warning: filthy hack_ ; )


## Compile Sass

    # Install gulp and dependencies
    $ npm install
    
    # Compile sass
    $ gulp sass


## Demo

http://homerjam.github.io/angular-ui-router-anim-in-out/

## You may also like

[angular-gsapify-router](https://github.com/homerjam/angular-gsapify-router) — a similar directive that uses [GSAP](http://greensock.com/) to power transitions; also features fine grained configuration using a priority attached to each state.
