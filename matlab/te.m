function te()    
    a1_previous = zeros(1,8);
    w1 = eye(8);
    lw1 = randInitializeWeights(8, 8);
    threshold = 0.7;
    b = 1.2;
    learning_rate = 0.01;

    counter = 1;

    while true
        x = zeros(1, 8);
        x(counter) = 1;
        bottom_up_input = x * w1

        lateral_input = a1_previous * lw1

        total_input = bottom_up_input + lateral_input % Consider other functions here

        a1 = total_input > threshold

        % Weight updates
        % Beta is a boosting factor 
        % Lateral input should almost never drive activity as strongly as bottom_up
        % So remove some of that error
        boosted_lateral = b * lateral_input;
        err = boosted_lateral - a1;


        log_loss = -a1 .* log(boosted_lateral) - (1 - a1) .* log(1- boosted_lateral);

        grad = bottom_up_input' * (boosted_lateral - a1);

        lw1 = lw1 - learning_rate * grad;

        a1_previous = a1;
        counter += 1;
        if counter > 8
            counter = 1;
        end
        pause;
    end



    %  // Update with lw1 = lw1 - alpha * derivative of loss
end