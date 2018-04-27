# Thought Experiment

This is an implementation of the thought experiment proposed and shown by
Dr. Mu-ming Poo at Canonical Computation in Brains and Machines 2018. 
(Main Talk - Thought Experiment Portion)

It re-implements his video as an interactive tool and computes the synaptic
changes (weight updates) using the proposed Hebbian rules.

## Network Dynamics

### Perpetual sequences
The initial implementation of combining previous neuron activity with bottom up
activity resulted in sequences that would continue perpetually. Since the activity
of each neuron is binary and the 'memory' of the system is only 1 time-step there
is no way to decay a sequence propagating from previous neuron activity alone.

If your only choice of signal is all or nothing (and you choose all) the signal doesn't decay.

### Saturation

If you probe the network while it's got a perpetual sequence running you can
start two sets of neurons firing in a progressive sequence, but this is not stable.

As the connections adapt to the new sequence they eventually cause all the
neurons to activate and then the network is locked in a saturated perpetually firing state.

## React Pixi Fiber Notes

React-pixi-fiber is an updated version of react-pixi which works with the
new fiber rendering system in React. It combines the declarative programming
style of React with the 2D drawing library Pixi.js.

Until recently combining the imperative style of drawing libraries with React
was problematic. A large application I helped build had a severe style divide
between the React sides of the application and the interactive graphics side.
By consistently following the declarative approach re-usable UI pieces remain
encapsulated in Components.

Users should note you still have to think about two types of components, those
that make up part of a Pixi Stage and those that make up parts of the browser
DOM. You can put one or more Stages in your DOM but you cannot put DOM elements
inside a Pixi stage.

#### Use PureComponents

React provides a base Component and a PureComponent to extend. While PureComponents
have other uses they also implement a shallow props and state comparison which
can prevent costly re-renders of your Pixi components.

## Main Libraries

React - Framework
Redux - Centralized state management
Pixi.js/react-pixi-fiber - Drawing Library
Animated - Animation Library
Rekit - Web based React/Redux IDE
Math.js - An extensive math library with a flexible expression parser with support for symbolic computation

## Tips about these libraries

### Math.js

While the expression parser works *a little* like octave there are some big gaps. For example:

 - max(matrix, 0) does NOT return a matrix. It returns a single number from the 0th dim.
   - There's no equivalent built-in function to max() in octave
 - you can't use an array or a matrix as an index into another array or matrix
 - matrix > value returns a boolean matrix
   - you can force it into 0's and 1's with number(matrix > value)

'scope' is a big part of using math.js. You pass in this object to the math.eval() function
along with your expression string. Then after calculations have been performed you
get your answer out through scope.property

```js
const scope = { foo: 1, bar: 2};
const resultSet = math.eval(`
  foo = foo + bar
`, scope);
console.log(scope.foo); // 3
```

Notes:
 - Use back-ticks for multi-line expressions
 - eval returns a resultSet for every line that doesn't end in a ; (like octave)
 - += doesn't work.


### Pixi.js

#### Avoid calling render()

If nothing has changed in your scene Pixi's render method should not be called
to prevent this ...

### Rekit


#### Exports for connected components

It's tricky to get this right to play well with the testing framework.

A connected component should define *and export* a class Foo

```js


export class Foo extends Component {

}
```

it should *also* provide a default connected version of that component

```js
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Foo);
```

In test files you can import the non-connected version using the destructuring syntax

```js
import { Foo } from './Foo';
```

In application files you should import the default object and give it a name that follows the pattern Connected<Classname>

```js
import ConnectedFoo from './Foo';
```

This gives you all the benefits of being able to test a 'raw' component and a clear indication of which components are
connected and which arn't wherever they are used in your application.

One easy-to-make mistake is to import the unconnected name using default syntax

```js
import Foo from './Foo'; // BAD - Don't do this!
```

Luckily this is caught by eslint with the `import/no-named-as-default` rule.

#### SimpleNave is Simple

This default nav component for Rekit isn't really production worthy.
It also does some funky stuff like displaying the catchall /* route from
common/routeConfig.js visually. 

#### Deleting a .scss file doesn't clean up indexes

If you remove a .scss file using the IDE delete option it doesn't clean that
file out of the relevant .scss index files.

## CSS Reminders

Center justify text? - text-align: center

## Chrome Devtools

Adjust the value of a property by 0.1? ctrl+option and up/down (OSX)


