import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Intro extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-intro">
        <h1>Thought Experiment</h1>
        <p>
          This is an implementation of the thought experiment proposed and shown by
          Dr. Mu-ming Poo at Canonical Computation in Brains and Machines 2018.
        </p>
        <p>
          (<a href="https://www.youtube.com/watch?v=D2OpUPturUY">Main Talk</a> -
          <a href="https://www.youtube.com/watch?v=D2OpUPturUY&feature=youtu.be&list=PLBHioGD0U1Cjd-meZbEcz-9ZxK-mb50tZ&t=1322">
            Thought Experiment Portion
          </a>)
        </p>
        <h2>Question</h2>
        <p>
          Using just Hebbian learning and a potentially fully connected network can a sequence be learned and
          then replayed given just the start of that sequence?
        </p>
        <p>
          The answer is yes and you can watch that happen with the provided simulation. Interesting
          network dynamics observed under these constraints are explored in the <Link to="/discussion">discussion</Link> section.
        </p>
        <h2>Instructions</h2>
        <p>
          This tool will let you:
          <ol>
            <li>1. Train the network</li>
            <li>2. Stop the input sequence</li>
            <li>3. Send a single input to a trained network to see it replay the learned sequence.</li>
            <li>4. Try to break the network and sequence replay with repeated single inputs (not hard to do).</li>
          </ol>
        </p>
        <p>
          On the <Link to="training">training page</Link> you'll find the network to be trained and a set of controls.
        </p>
        <img src="/images/network-small.jpg" alt="Network training tool visualization" />
        <h3>Train the Network</h3>
        <p>
          To start the simulation, and present a sequence of inputs for the network to learn, click <strong>Start Simulation.</strong>
        </p>
        <p>
          As the sequence is presented to the network you can observe the the connection strengths in the network changing.
        </p>
        <p>
          When a connection between two groups is strong enough that activity in one will drive activity in another (above threshold) the connection will change color.
        </p>
        <p>
          When all the appropriate connections are above threshold you should stop the input sequence and silence the neurons.
        </p>
        <h3>Stop Input and Silence Neurons</h3>
        <p>
          To stop the input click the <strong>Stop Input</strong> button. If all neurons had connections above threshold when you do this you'll notice that the sequence is <em>maintained by the network</em>.
        </p>
        <p>
          To stop neural group activity click <strong>Silence Neurons</strong>.
        </p>
        <h3>Single Input to Recall the Sequence</h3>
        <p>
          To trigger sequence recall in a trained network click once on <strong>Single Input</strong>.
        </p>
        <p>
          If you accidentally (or intentionally) click on <strong>Single Input</strong> more than once you may see some interesting network dynamics.
        </p>
      </div>
    );
  }
}
