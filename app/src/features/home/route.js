// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  Training,
  Intro,
  Discussion,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'introduction', name: 'Introduction', component: Intro, isIndex: true },
    { path: 'training',
      name: 'Training',
      component: Training
    },
    { path: 'discussion', name: 'Discussion', component: Discussion },
  ],
};
