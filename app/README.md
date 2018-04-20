# Thought Experiment

This is an implementation of the thought experiment proposed and shown by
Mu-ming Poo at Canonical Computation in Brains and Machines 2018. 
(Main Talk - Thought Experiment Portion)

It re-implements his video as an interactive tool and computes the synaptic
changes (weight updates) using the proposed Hebbian rules.

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

## Main Libraries

React - Framework
Redux - Centralized state management
Pixi.js/react-pixi-fiber - Drawing Library
Animated - Animation Library
Rekit - Web based React/Redux IDE

## Tips about these libraries

#### Use PureComponents

React provides a base Component and a PureComponent to extend. While PureComponents
have other uses they also implement a shallow props and state comparison which
can prevent costly re-renders of your Pixi components.

#### Avoid calling render()

If nothing has changed in your scene Pixi's render method should not be called
to prevent this ...


