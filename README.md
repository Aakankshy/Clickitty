# Clickitty
A simple typing app based in React. With over 1000 proverbs/phrases infinitely scrolling through a simple to use UI, Clickitty helps you practice your typing and beef up your typing speed.

## Getting Started
```
npm install
npx babel --watch src --out-dir public --presets react.app/prod				// to run before making edits
```

While the main "handwritten" code sits comfortably in `src`, babel auto generates its files in `public` alongside the `index.html` and `styling.css` files. Assuming the above commands have been run, making edits in App.jsx automatically update the autogenerated files and can be viewed on the website with a quick refresh.

Speaking of which, opening `index.html` will open the website and the latter command is unnecessary for this if edits to the code are not being made.

## Features
So far, the main "selling-points" are the following:
- A collection of over 1000 proverbs to keep you typing
- A typing speed calculator which displays your typing prowess in words per minute (WPM)
- An animated placeholder for the calculation to give you some time while you finish up what you're in the middle of typing
- An error catcher that makes the input area flash red when you make a mistake (no mistakes allowed!)
- A leniency system that resets the time you take to type if you clear the input area to "try, try again"
- A nice, simple UI design with mute color choices to support you through both your early morning warmups and late night enjoyment