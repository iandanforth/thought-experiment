function te()    
    w1 = eye(8);
    % threshold = 0.7;
    b = 1.2;
    learning_rate = 0.1;

    active_input = 1;
    for threshold = 0.9 % BUG: this can still saturate
        a1_previous = zeros(1,8);
        lw1 = randInitializeWeights(8, 8);
        for i = 1:100
            x = zeros(1, 8);
            x(active_input) = 1;
            bottom_up_input = x * w1

            lateral_input = a1_previous * lw1;

            total_input = bottom_up_input + lateral_input % Consider other functions here

            a1 = total_input > threshold

            if all(a1)
                fprintf('Threshold %f saturated after %d steps\n', threshold, i);
                break;
            end

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
            active_input += 1;
            if active_input > 8
                active_input = 1;
            end
            heatMatrix(lw1);
            pause;
        end
    end



    %  // Update with lw1 = lw1 - alpha * derivative of loss
end