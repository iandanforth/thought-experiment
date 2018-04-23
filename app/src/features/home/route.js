// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  Training,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'training',
      name: 'Training',
      component: Training,
      isIndex: true },
  ],
};
