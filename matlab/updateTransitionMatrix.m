function UTM = updateTransitionMatrix(TM, p, a)

    TM(p, a) += 1;
    TM(p,:) /= sum(TM(p, :));
    UTM = TM;
    
end