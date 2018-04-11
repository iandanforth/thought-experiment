function te2()

    num_neurons = 8;

    transition_matrix = initializeTransitionMatrix(num_neurons);


    prev_active_neuron = 0;
    active_neuron = 1;
    for i = 1:100
        x = zeros(1, num_neurons);
        x(active_neuron) = 1

        if prev_active_neuron > 0
            transition_matrix = updateTransitionMatrix(
                transition_matrix,
                prev_active_neuron,
                active_neuron
            )
        end

        prev_active_neuron = active_neuron

        active_neuron -= 1;
        if active_neuron > num_neurons
            active_neuron = 1;
        end
        if active_neuron < 1
            active_neuron = num_neurons;
        end
        pause;
    end

end