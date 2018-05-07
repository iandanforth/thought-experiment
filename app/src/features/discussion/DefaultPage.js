import React, { Component } from 'react';

export default class DefaultPage extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="discussion-default-page">
        <h1>Discussion</h1>
        <p>
          Despite the simplicity of the implemented network there are a couple of features I found particularly
          interesting. Saturation - Where all units in the network end up perpetually active and
          Stability - Where a small number of patterns can be maintained by the network without leading to
          saturation.
        </p>
        <h2>Network Saturation</h2>
        <img src="images/saturated-network.png" alt="A network where all units are active" />
        <p>
          Saturation is relatively easy to observe. If you train the network with at least four repetitions
          of the standard input sequence (so that connections between immediate neighbors of the network are
          above threshold) and then present multiple single inputs, it is likely that the network
          will become saturated after a short period of time. The network learns equally from activations.
          Those that are driven from lateral inputs as well as those from bottom up input. As the network learns to
          try to predict its own behavior it begins strengthening more and more connections until a large
          percentage are above threshold, which eventually drives all units. (More on this below) The network has 
          no signal decay or inhibitory mechanism so once each unit is driven at each timestep it will remain locked in this state.
        </p>
        <h2>Stable Patterns</h2>
        <p>
          The simplest stable pattern is the one presented as the original input sequence. One unit comes on
          followed by the next, then the next, etc. finally wrapping around to the beginning as it reaches the end of
          the line of units. I'll refer to this as a one-active pattern. After this one-active pattern is learned
          it will be maintained by the network indefinitely once it is recalled. Because the network is symmetric
          the original input presentation order doesn't matter. You can explore this in the simulation.
        </p>
        <p>
          A two-active pattern is where exactly two units are active in a given timestep. These almost always
          lead to saturation but there is a class of stable two-active patterns.
        </p>
        <p>
          In the 8 unit case if a single input is added 4 ahead or 4 behind the initial propagating active unit
          you will get a stable propagation of two active units. As it travels around the network it appears as
          one unit active followed by three off and then one on.
        </p>
        <img src="images/stable-network-1-3-1.png" alt="Network snapshot showing propagation of a two-active sequence" />
        <p>
          Why is this and are there any others? It is a bit hard to see in the simulation but by redrawing
          the connections of the network as a graph with a circular layout a pattern emerges. Every active unit
          in the stable case always predicts only units that will become active in the next timestep.
        </p>
        <img src="images/two-active-patterns.png" alt="Three circular network graphs showing predictive connections between neuron groups" />
        <p>
          Graph A is a ring of 8 nodes evenly spaced on a circle. The two-active pattern it is being presented is
          1on-2off-1on. The red nodes are currently active. The blue nodes will be active in the next timestep
          from bottom up input. Each node is trying to learn the 1on-2off-1on pattern. The red lines show each
          red node predicting that pattern one timestep in the future. As you can see the red lines are not each
          connected to a blue node. This indicates that the prediction does not line up with the actual pattern
          in the next timestep for one of the nodes.
        </p>
        <p>
          B is a ring of 8 nodes evenly spaced on a circle. The two-active pattern is 1on-3off-1on. As with
          A, red nodes are active now and blue will be in the next timestep. The red lines (predictions) all
          connect with nodes that will become active in the next timestep. The prediction lines up with future
          activity.
        </p>
        <p>
          C is a ring of 10 evenly spaced nodes. The two-active pattern is 1on-4off-1on. Again we see an accurate
          prediction of the next timestep from each currently active node.
        </p>
        <p>
          A is an example of a two-active sequence which will lead to saturation. B and C are stable. Why? The
          learning rule in the network does not penalize inaccurate predictions. All it says is that a
          neuron which becomes active immediately prior to another neuron will have its predictive connection
          strengthened and the reciprocal (anti-predictive) connection weakened.
        </p>
        <p>
          In A, as the 1on-2off-1on pattern travels around the network, the "errant" connection will occasionally
          be predictive and will be strengthened. The rest of the time it will be left alone. Eventually that
          connection will be strong enough to drive the predicted neuron in the next timestep directly. The
          two-active pattern will become a three-active pattern. That three-active pattern will propegate and
          drive additional connections above threshold until all neurons are being driven from errant lateral
          predictions and the network saturates.
        </p>
        <p>
          B and C, on the other hand, have no errant predictions. Lateral predictions always line up with bottom
          up inputs. No errant connections are strengthened and so no additional active units are added to the
          two-active pattern. You'll note that active neurons in the two stable cases are directly across from
          each other. Indeed it is this symmetry is that allows for the stable propagation of two-active sequences. 
          Any other n-active group or two-active group with asymmetric activation leads to saturation.
        </p>
        <p>
          Mathematically a two-active sequence in a network of n nodes where the two active neurons are k and
          k + ( (n / 2) mod n ) appears to propagate stably. Note this implies that only networks with even node
          counts can stably propagate two-active patterns under this learning rule.
        </p>
        <h2>Conclusion and Next Steps</h2>
        <p>
          Implementing this thought experiment was thoroughly enjoyable. Most neural networks are huge, unwieldy
          beasts but this simulation is entirely tractable. It's surprising how dynamic even a simplified STDP
          based learning rule can be. There are dozens of modifications that could be made to the simulation to
          push it closer to either accurate Neuroscience or modern deep networks. I'll leave some ideas here for
          either the enthusiastic student or a future version of myself to try.
        </p>
        <ul>
          <li> - What is the minimal change required to prevent saturation?</li>
          <li> - What kind of predictive error penalty should be added?</li>
          <li> - Can predictive error detection modulate learning rate?</li>
          <li> - What is the simplest attention mechanism that could be added?</li>
          <li> - What happens if you allow for recurrent connections?</li>
          <li> - Can the simulation be trivially extended to multiple layers?</li>
          <li> - Should feedback connections be added?</li>
          <li> - Can such a simple network ever learn higher-order sequences?</li>
          <li> - If so, what is the capacity of the network to learn multiple sequences?</li>
          <li> - Can you simultaneously learn inhibitory connections?</li>
          <li> - Would global neuro-modulators for activity or learning rate help or merely confuse?</li>
        </ul>
        <h2>Thanks!</h2>
        <p>
          Thank you for taking the time to play around with this project and thank you Dr. Poo for the
          inspirational talk.
        </p>
        <p>
          Bug reports and contributions are welcome on the&nbsp;
          <a href="http://www.github.com/iandanforth/thought-experiment">project github</a>.
        </p>
      </div>
    );
  }
}
