import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DefaultPage extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="introduction-default-page">
        <h1>Thought Experiment</h1>
        <p className="question-text">
          Using a single layer, laterally connected network and a learning rule based on&nbsp;
          <a href="https://en.wikipedia.org/wiki/Spike-timing-dependent_plasticity">
            spike timing dependent plasticity
          </a> can a sequence be learned and then replayed given just the start of that
          sequence?
        </p>
        <p>
          The answer is <strong>yes</strong> and you can watch that happen with the provided simulation.
          Interesting network dynamics observed under these constraints are explored in the <Link to="/discussion" href="simulation">discussion</Link> section.
        </p>
        <p>
          This thought experiment was originally proposed by&nbsp;
          <a href="http://www.ion.ac.cn/laboratories/int.asp?id=42">
            Dr. Mu-ming Poo
          </a> at Canonical Computations in Brains and Machines 2018.
          (<a href="https://www.youtube.com/watch?v=D2OpUPturUY">Main Talk</a> -&nbsp;
          <a href="https://www.youtube.com/watch?v=D2OpUPturUY&feature=youtu.be&list=PLBHioGD0U1Cjd-meZbEcz-9ZxK-mb50tZ&t=1322">
            Thought Experiment Portion
          </a>) This is an independant implementation of that section of his talk. Any errors are mine and not those of Dr. Poo.
        </p>
        <h2>Simulation</h2>
        <p>
          See the <Link to="simulation" href="simulation">Simulation</Link> page.
        </p>
        <h2>Instructions</h2>
        <img src="images/sim-hero-2.jpg" alt="Network training tool visualization" />
        <div className="caption">
          The Simulation Interface
        </div>
        <h3>Steps</h3>
        <ol>
          <li>1. Train the network</li>
          <li>2. Stop the input sequence</li>
          <li>3. Send a single input to a trained network to see it replay the learned sequence.</li>
          <li>4. Try to break the network and sequence replay with repeated single inputs (not hard to do).</li>
        </ol>
        <h3>Train the Network</h3>
        <p>
          To start the simulation, and present a sequence of inputs for the network to learn, click
          <img className="button-image" src="images/start-input.jpg" alt="Start Input button" />
        </p>
        <p>
          As the sequence is presented to the network you can observe the the connection strengths in the
          network changing. <strong>It takes four full presentations of the sequence for the connections to get
          above threshold and start driving the next, predicted neuron group.</strong>
        </p>
        <p>
          When a connection between two groups is strong enough that activity in one will drive activity in
          another (above threshold) the connection will change color.
        </p>
        <div className="connection-strengths-flex-container">
          <div className="connection-strengths-container">
            <img src="images/connection-strengths.jpg" alt="Disconnected, Weakly Connected, and Above Threshold neuron groups" />
            <p className="caption">
              Note: All connections are excitatory. Orange and blue indicate direction (right or left) for stylistic purposes.
            </p>
          </div>
        </div>
        <p>
          When all the appropriate connections are above threshold you should stop the input sequence and
          silence the neurons.
        </p>
        <h3>Stop Input and Silence Neurons</h3>
        <p>
          To stop the input click <img className="button-image" src="images/stop-input.jpg" alt="Stop Input button" />. If all neurons had connections
          above threshold when you do this you'll notice that the sequence is <em>maintained by the network</em>.
        </p>
        <p>
          To stop neural group activity click <img className="button-image" src="images/silence-neurons.jpg" alt="Silence Neurons button" />.
        </p>
        <h3>Use a single input to trigger sequence recall</h3>
        <p>
          To trigger sequence recall in a trained network click once on <img className="button-image" src="images/single-input.jpg" alt="Single Input button" />.
        </p>
        <p>
          If you accidentally (or intentionally) click on Single Input more than once you may see some interesting network dynamics.
        </p>
        <h3>Reset the Simulation</h3>
        <p>
          If the simulation begins behaving oddly at any point or you want to watch the training again
          click the <img className="button-image" src="images/reset-simulation.jpg" alt="Reset Simulation button" /> button.
        </p>
        <h2>Other Options</h2>
        <div className="other-options-content-container">
          <div className="other-options-img-container">
            <img src="images/sidebar-controls.png" alt="Sidebar controls for Simulation"/>
          </div>
          <div className="other-options-text-container">
            <h3>Simulation Speed</h3>
            <p>
              In the sidebar on the simulation page you'll see a slider to alter how fast the simulation runs.
              Changing the simulation speed will alter how quickly new inputs are presented and how quickly the network updates itself.
            </p>
            <h3>Number of Neuron Groups</h3>
            <p>
              In the sidebar there is a dropdown selector where you can pick among a small range of values for the
              number of neuron groups to simulate. Changing this value will reset the simulation and connections.
            </p>
            <h3>Input Sequence Direction</h3>
            <p>
              You can reverse the direction of the presented input sequence by using the Sequence Direction
              dropdown to select 'Right to Left'. If you do this after the left to right sequence has been
              learned it is likely the network will saturate (see <Link to="discussion" href="discussion">Discussion</Link>).
            </p>
          </div>
        </div>
      </div>
    );
  }
}
