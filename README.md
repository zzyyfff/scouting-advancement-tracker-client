# Scouting Advancement Tracker Client!

An online tool to keep track of your rank and all the merit badges you've been working on and have completed.

I was inspired by the recent inclusion of young women into what used to be call the Boy Scouts but is now called Scouts BSA. Scouting was played a major role in my adolescent development, and I was always saddened that it wasn't availible to everyone. This project is dedicated to all children, everywhere.

+ Client site: https://zzyyfff.github.io/scouting-advancement-tracker-client/
+ Client repo: https://github.com/zzyyfff/scouting-advancement-tracker-client
+ Server site: https://obscure-atoll-84260.herokuapp.com/users
+ Server repo: https://github.com/zzyyfff/scouting-advancement-tracker-server

## Getting Started

Simply go to https://zzyyfff.github.io/scouting-advancement-tracker-client/, sign up, sign in, and begin recording your achievements!

## Technologies used

+ HTML
+ CSS + SASS
+ Javascript + jQuery
+ Handlebars
+ Bootstrap

## Getting involved

Interested in playing with the code or contributing? Read on.

#### Prerequisites

+ This front-end is optimized for the Google Chrome browser, but may work elsewhere.
+ Any text editor will do. I use [Atom](https://atom.io/), which makes development easier.

#### Installing

+ Fork and clone the respository locally
+ Navigate to the respository locally and run `npm install`
+ To test locally, run `grunt serve`
+ You will also need to set up the [Scouting Advancement Tracker Server](https://github.com/zzyyfff/scouting-advancement-tracker-server). See further installation instructions on its repo: https://github.com/zzyyfff/scouting-advancement-tracker-server

#### Front-end Deployment

+ Merge down to your `master` branch
+ Push to your remote
+ Then run `grunt deploy`

## Planning and Development

This project is born out of the Software Engineering Immersive course at General Assembly Boston (formerly the WDI, Web Development Immersive) and is the client side of my first full-stack project.

#### My Process

1. Consider and brainstorm on the mission and goals of the project, based on the project requirements.
2. Perform user research; talking to potential users about what they would look for in a scouting advancement tracker and what they would need or want from it.
3. List out the functionality of an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) and separately bucket future functionality that would not be part of the [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product).
4. Draw up wireframes and settle on an initial interface design goal. The final interface will change through user testing and redesign. (*See wireframe images below*)
5. Create user stories (*See example user stories below*)
6. Prioritize user stories, putting the ones with the most dependents first
7. Implement a back-end API with Ruby/Rails/PostgreSQL
8. Create the basic layout of UI elements in HTML/CSS/SASS/Bootstrap/Handlebars, using semantic tags when possible and only enough styling to meet [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) layout needs.
9. Connnect front-end elements to the back-end API.
10. Test, troubleshoot, debug, refactor, and confirm working deployment.
11. If there is enough time, begin work on stretch goal features and test them in deployment
12. Fill in README.md
13. Once all base functionality is established, apply aesthetic style

#### Initial wireframes and user stories
##### [Mobile view of Sign in](https://i.imgur.com/suyf6O5.jpg "Mobile view of Sign in")
##### [Mobile view of Merit Badges](https://i.imgur.com/mjnKzei.jpg "Mobile view of Merit Badges")

##### [Sample user stories](USERSTORIES.md)

## Problem Solving Strategy

When a functional element doesn't work as exepcted, my strategy is to break down the element into smaller parts, testing to make sure each is functioning as expected. In Javascript, this might involve using `console.log()` or `debugger`, while in HTML/CSS this might involve adding a high-contrast, dashed border around a misbehaving element, and, for API usage, it might involve confirming functionality via a curl script or analyzing feedback in the Network tab of the browser development tools. In all situations, I carefully follow the logical sequence of events and make sure I understand what is going on.

When I've exhausted my own ability to debug a situation, I begin formulating how I would communicate this problem to others. I search online for similar issues and educate myself about the technologies and surrounding issues.

Finally, if an answer hasn't been found, I create a showcase of the problem, including example code, the steps to reproduce the problem, and what I've attempted so far, and I use this to ask for help from colleagues and the community of programers.

## Unsolved Problems & Future Direction

+ Ideally, users should not be able to add a merit badge that they already own.
+ Include merit badge requirements that can individually be met.
+ Include rank advancemnt requirements.
+ Allow scouts to join a troop and interact with each other.
+ Integrated messaging between users
+ Aesthetic and interactive redesign, in collaboration with a trained designer

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact jonathan.marcus@gmail.com.

## Acknowledgments

Special thanks to Dr. Edward Marcus, Jennifer Meade, Erica Salling, Ben Jenkins, Toni Langley, Jordan Allain, Caleb Pearce, Naida Rosenberger, GA WDI-30, and everyone at General Assembly Boston.
