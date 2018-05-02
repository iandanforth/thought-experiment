## Local Dist

### Route Config Base URL - /

/ -> thought-experiment/app/src/

/images -> thought-experiment/app/build/images : Works

images -> thought-experiment/app/src/images : Works

### Route Config Base URL - /thought-experiment/

/ -> thought-experiment/app/src/

/images -> thought-experiment/app/src/images : Works

images -> thought-experiment/app/src/thought-experiment/images : Broken

IDEAS

 - Simlink a subdir thought-experiment one dir up to make this work here
 - Some rewrite rule for deployment?

## Local Dist

### Route Config Base URL - /

/ -> thought-experiment/app/build/

/static -> thought-experiment/app/build/static : Works
/images -> thought-experiment/app/build/images : Works

static -> thought-experiment/app/build/static : Works
images -> thought-experiment/app/build/images : Works

### Route Config Base URL - /thought-experiment/

/ -> thought-experiment/app/build/

/static -> thought-experiment/app/build/static : Works
/images -> thought-experiment/app/build/images : Works

static -> thought-experiment/app/build/thought-experiment/static : Broken
images -> thought-experiment/app/build/thought-experiment/images : Broken


## Github

/ -> github.com/iandanforth/iandanforth.github.io/

/thought-experiment/ -> github.com/iandanforth/thought-experiment/docs/

/static -> github.com/iandanforth/iandanforth.github.io/static : Broken
/images -> github.com/iandanforth/iandanforth.github.io/images : Broken

static -> github.com/iandanforth/thought-experiment/docs/static : Works
images -> github.com/iandanforth/thought-experiment/docs/images : Works

Note the canonical way to use github.io pages is to use RELATIVE URLS


