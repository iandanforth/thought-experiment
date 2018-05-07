# Implementation Notes

## Network Dynamics

### Perpetual sequences
The initial implementation of combining previous neuron activity with bottom up
activity resulted in sequences that would continue perpetually. Since the activity
of each neuron is binary and the 'memory' of the system is only 1 time-step there
is no way to decay a sequence propagating from previous neuron activity alone.

If your only choice of signal is all or nothing (and you choose all) the signal doesn't decay.

In addition because the final group is potentially connected to the first the
sequence can 'wrap.'

#### Stable Sequences

The following input patterns will be maintained indefinitely (with 8 groups):
 - 1on
 - 1on-3off-1on


### Saturation

If you probe the network while it's got a perpetual sequence running you can
start two sets of neurons firing in a progressive sequence, but this is usually not stable.

As the connections adapt to the new sequence they eventually cause all the
neurons to activate and then the network is locked in a saturated perpetually firing state.

The following input patterns will lead to saturating the network (with 8 groups):
 - 2+on
 - 1on-1off-1on
 - 1on-2off-1on
 - 1on-4off-1on (equivalent to 1on-2off-1on)
 - 1on-5off-1on (equivalent to 1on-1off-1on)
 - 1on-6off-1on (equivalent to 2on)

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

## Extra Libraries

cytoscape.js - Graph theory / network topology visualization

## Tips about these libraries

### React

#### Context

The context API is in flux. Previously you had to define `static contextTypes` on your class to receive
context.

Then you had to define `static childContextTypes` to provide a specific piece of context to children AND
`getChildContext()` to return an object containing the desired context.

Now there is a new "stable" context API that is based on Providers and Consumers. 

```js
const {Provider, Consumer} = React.createContext(defaultValue);
```

The basic idea is that you wrap the top of a component tree in a provider and
then any component that needs access to the context is wrapped in a consumer
AND a function that takes the context as an argument and returns the normal
output of render()

Note the similarities to the redux API where there is a producer and connected
components are wrapped in a connect() method.

In the new context API there's no explicit equivalent of Actions though. You
can pass down functions that modify context (e.g. centralized state) but it is
a direct modification rather than an indirect one which goes through reducers.

### React router

To split anywhere on a route you create a <Route path={path} component={component} />
If the URL is not that path it will return null.

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

If nothing has changed in your scene Pixi's render method should not be called.

By default PIXI will start a Ticker that is called every RAF frame. (1/60th of a second).
If there are any registered callbacks it will call update(). Some combination of
PIXI defaults and RPF means there is a registered callback that calls render().

This means that by default render() is called 60x per second instead of just 
when things are updated. This will eat your users batteries.

One way around this is to turn off autoStart in the PIXI app, set sharedTicker to true,
and then turn off the shared ticker with ticker.stop() and ticker.autoStart = false.

From then on you'll be in charge of calling render() (which is less than ideal).

If you need to call render() indiscriminantly then you can wrap context.app.render()
in an underscope throttle() method which will prevent duplicate executions.

A better way to handle this might be to provide your own Ticker to PIXI and only
render when a 'dirty' flag is set, but I haven't done this so ymmv.

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

#### SimpleNav is Simple

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


