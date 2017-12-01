# Neighborhood Map

You will develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

## Getting Started

For this project, I had to optimize this site for speed. Consequently, I had to optimize the critical rendering path and make the page render as quickly as possible. 

After testing the site on [Google PageSpeed](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Flmedinatriana.github.io%2Fwebsite-optimization "Google PageSpeed"), I found out that the site was runinng below 60 fps, and consequently it got a poor review both on mobile and desktop.

To resolve these issues, I optimized the images (resizing, and decreasing the quality.), inline the CSS, minimize CSS and JS. Ultimately, All this changes, improved the rendering tremendously.

## Running Instructions

1. To check the optimizations, please check dist and src folders respectively.
2. The scr folder shows the original files to be optimized.
3. The dist folder shows the optimizations made to the site.
4. To run a test please go to [Google PageSpeed](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Flmedinatriana.github.io%2Fwebsite-optimization "Google PageSpeed"), and paste the following [published site link](https://lmedinatriana.github.io/website-optimization/ "Website Optimization Project").
5. Google PageSpeed Insights will analize the site and will provide tips to make the page faster.


### Optimizations to Landing Page

* No landing page redirects
* Eliminated render-blocking JavaScript and CSS in above-the-fold content
* Enabled compression
* Minified CSS
* Minified HTML
* Minified JavaScript
* Optimized images
* Prioritized visible content
* Reduced server response time

### Optimizations to views/js/main.js

Optimizations made to views/js/main.js make views/pizza.html to render with a consistent frame-rate at 60fps when scrolling.

* Applied document.getElementById() because Web API call is faster.
* Applied document.getElementsByClassName() because Web API call is faster.
* Created a local variable to save document.getElementsByClassName('randomPizzaContainer') outside the loop so the DOM is not explicitly touched in every iteration.
* Calculated the number of pizzas needed to fill the screen, based on browser window resolution.
* Put scrolltop out of loop because function was too expensive 
* Added randomPizzaContainer[i].style.width = newwidth;

## Authors

* **Udacity** - *Initial work* - [GitHub](https://github.com/udacity/frontend-nanodegree-mobile-portfolio)


