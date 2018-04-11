function TM = initializeTransitionMatrix(n)

    TM = ones(n, n);
    TM -= eye(n);
    TM /= n - 1;

end