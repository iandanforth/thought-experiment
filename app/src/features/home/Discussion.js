import React, { Component } from 'react';

export default class Discussion extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-discussion">
        <h1>Discussion</h1>
        <h2>Network Dynamics</h2>
        <p>
          By default the network is trained on a single uni-directional sequence of intputs, but it is never
          fixed. By starting and stopping the sequence or by adding single inputs during a sequence the
          network is recalling it can learn new patterns. When deviating from a perfect uni-directrional series
          of inputs two major modes are observed. 1. Network Saturation and 2. Alternate stable patterns. These
          are discussed below a long with some thoughts on the implementation process and possible next steps.
        </p>
        <h3>Network Saturation</h3>
        <p>
          If you train a network to threshold and stop the input sequence that sequence will be maintained in the
          activity of the neuron groups. If you then provide an additional single input to the network you will have
          two sets of propogating neuron group activity. Most of these two-active-group sequences are not stable and lead
          to network saturation. As they propegate around the network the connections between groups are still being
          strengthened. Eventually in addition to propegating each active neuron one timestep into the future the
          network learns to predict the activity of the second neuron group from the first and visa versa. This
          causes the network to activate additional neuron groups and eventually the network saturates with many
          above threshold connections leading to every neuron group being driven from the activity of the previous
          timestep.
        </p>
        <p>
          Thoughts on how to ameliorate these effects can be found in the Next Steps section.
        </p>
        <h3>Stable Patterns</h3>
        <p>
          Interestingly there is a class of two-active-group sequences which is stable. In the 8 group case
          if a single input is added 4 ahead or 4 behind the initial propegating single group sequence you will get
          a stable propegation of two groups.
        </p>
        <img src="images/stable-sequence.png" alt="Network snapshot showing propegation of a two-active sequence" />
        <p>
          Why is this and are there any others? It is a bit hard to see in the simulation but by redrawing
          the connections of the network as a graph with a circular layout a pattern emerges.
        </p>
        <img src="images/circle-graphs.png" alt="Three circular network graphs showing above threshold connections between neuron groups" />
        <p>
          Graph A is a A is a ring of 8 nodes evenly spaced on a circle. Each node is connected to the next node
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
          A is an example of the above-threshold connections formed initially in an unstable two-active-group.
          B and C are connections formed and maintained in stable two-active groups. They are also examples of
          wheel graphs (they form an implicit hub node). More specifically they are wheel graphs with symetric spokes
          which only occurs with an even number of ring nodes. Indeed it appears that this symmetry is what allows
          for the stable propagation of two-active sequences. Any other n-active group or two-active group
          does not form a symetric wheel graph at any point and does not lead to stability.

          With this view we can postulate that for any network with an even number of neuron groups (n) if you
          present the network with a two-active sequence where the two active neurons are k and k + ( (n / 2) mod n )
          then the above threshold connections in the network will form a symetric wheel graph and propegate
          stably.
        </p>


        <h2>Implementation Notes</h2>

      </div>
    );
  }
}
