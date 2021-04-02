# Circle.js

<p><b><a href="http://basical.fr/test/3d/circle/">A Free and Simple way for your 3D Gallery.</a></b><br/>
Transform a simple images list in a 3D gallery. No complex parameter, no js modification.<br/>
  Circle.js is based on THREE JS.
</p>
<p><img src="circle-capture.jpg" /></p>

## Démo
<a href="http://basical.fr/test/3d/circle/exemple.html">Exemple of a simple 3D gallery</a>

## Features
* Transform basic img blocks into 3D gallery
* 100% responsive
* Customizable background color
* Only horizontal images for the moment
* No GIF compatibilty
  
## Browser support
Circle.js supports all browsers in her last version : Chrome, Firefox, Edge.

## Installation
### CDN
* SCRIPT : https://cdn.jsdelivr.net/gh/getLib/circle.js@e50cd6ba5471acdb25a098038998fc228b55aa05/circle.min.js
* CSS : https://cdn.jsdelivr.net/gh/getLib/circle.js@e50cd6ba5471acdb25a098038998fc228b55aa05/circle.css
### Download from GitHub
You can also directly download lightgallery from GitHub.

## Create your 3D Gallery

### List your images
First of all create the images list. Create a `div #circle3dImg` and add all your image in.
You can place it where you want, this block will be hide.
You need to specify the width `data-width` and height `data-height` of each image.
```html
<div id="circle3dImg">
<img data-width="1200" data-height="900" src="gallerie/img1.webp" />
<img data-width="1200" data-height="900" src="gallerie/img2.png" />
<img data-width="1000" data-height="750" src="gallerie/img3.webp" />
<img data-width="800" data-height="600" src="gallerie/img4.webp" />
</div>
```
### Add your 3D canvas
Then you will place your canvas block `canvas #circle3dCanvas`. Your 3D gallery will be print there.
You can define the background-color in the `data-background` parameter.
```html
<canvas id="circle3dCanvas" data-background="#fff"></canvas>
```
Then, define your canvas style. You can do what you want with this block.
For responsive size, you just need to add `!important` below height and width.<br/>
Exemple : 
```css
#circle3dCanvas{height:40vw !important;width:90vw !important;}
```

### Final Touch
Add the Circle .js and .css files at the end of your page.
```html
<link rel="stylesheet" href="circle.css">
<script type="module" src="circle.min.js"></script>
```
<strong>That's it !</strong>

