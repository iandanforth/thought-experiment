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
          interesting. Saturation - Where the all units in the network would be end up perpetually active and
          Stability - Where a small number of patterns could be maintained by the network without leading to
          saturation.
        </p>
        <h2>Network Saturation</h2>
        <img src="images/saturated-network.png" alt="A network where all units are active" />
        <p>
          Saturation is relatively easy to observe. If you train the network with at least four repetitions
          of the standard input sequence (so that connections between immediate neighbors of the network are
          above threshold) and then present multiple single inputs, it is likely that the network
          will become saturated after a short period of time. The network learns equally from activations that are
          driven from lateral inputs as from those driven by bottom up inputs. As the network learns to
          try to predict its own behavior it begins strengthening more and more connections until a large
          percentage are above threshold, which eventually drives all units. The network has no signal decay
          or inhibitory mechanism so once each unit is driven at each timestep it will remain locked in this state.
        </p>
        <h2>Stable Patterns</h2>
        <p>
          The simplest stable pattern is the one presented as the original input sequence. One unit comes on
          followed by the next, then the next, etc. Wrapping around to the beginning as it reaches the end of
          the line of units. I'll refer to this as a one-active pattern. You can't do it from the provided
          UI but it doesn't matter which unit comes on first after the pattern is learned, it will start
          perpetual recall of this sequence. In addition the direction of the pattern doesn't matter. The network
          is symetric after all.
        </p>
        <p>
          One-active patterns don't need to be consecutive. You can train the network on a pattern that
          skips input units and it will learn this just fine, as long as any one unit only ever predicts one
          other unit. If the pattern is such that at one time period a unit predicts one unit and at another
          a separate unit the network will strengthen both connections to the point that eventually the first
          will immediately drive two other units. This leads quickly to network saturation.
        </p>
        <p>
          There is also a class of stable two-active patterns. Patterns where there are two units active in
          the network at the same time. Most two-active sequences are not stable and lead
          to network saturation.
        </p>
        <p>
          In the 8 unit case if a single input is added 4 ahead or 4 behind the initial propegating active unit
          you will get a stable propegation of two active units.
        </p>
        <img src="images/stable-network-1-3-1.png" alt="Network snapshot showing propegation of a two-active sequence" />
        <p>
          Why is this and are there any others? It is a bit hard to see in the simulation but by redrawing
          the connections of the network as a graph with a circular layout a pattern emerges. Every active unit
          in the stable case always predicts only units that will become active in the next timestep.
        </p>
        <img src="images/ring-topo.jpg" alt="Three circular network graphs showing above threshold connections between neuron groups" />
        <p>
          Graph A is a ring of 8 nodes evenly spaced on a circle. Each node is connected to the next node
          in the ring and the node (n+3) % 8. Note that none of the edges pass through the center point of the
          circle.
        </p>
        <p>
          B is a ring of 8 nodes evenly spaced on a circle. Each node is connected to the next node in the
          ring and the node (n+4) % 8. Note that each edge not on the outer ring passes through the center
          of the circle.
        </p>
        <p>
          C is a ring of 10 evenly spaced nodes where the calculation of non-ring edges is (n+5) % 10.
        </p>
        <p>
          A is an example of the above-threshold connections formed initially in an unstable two-active sequence.
          B and C are connections formed and maintained in stable two-active groups. They are also examples of
          wheel graphs (they form an implicit hub node). More specifically they are wheel graphs with symetric spokes
          which only occurs with an even number of ring nodes. Indeed it is this symmetry is that allows
          for the stable propagation of two-active sequences. Any other n-active group or two-active group
          does not form a symetric wheel graph at any point and does not lead to stability. In any other type of
          sequence you get units which will not be active in the immediately next timestep.

          With this view we can postulate that for any network with an even number of neuron groups (n) if you
          present the network with a two-active sequence where the two active neurons are k and k + ( (n / 2) mod n )
          then the above threshold connections in the network will form a symetric wheel graph and propegate
          stably.
        </p>
      </div>
    );
  }
}
