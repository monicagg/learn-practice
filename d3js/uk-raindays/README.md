# UK Raindays - Radial Stacked Bar Chart

https://observablehq.com/@monicagg/uk-raindays-radial-stacked-bar-chart@248

Circular barplots are pretty, they are primarily use to present obvious cyclical patterns in large rows of data. 

Below, starting from center, each year is compound by the numer of raindays in winter, spring, summer, autumn. 

In term of comparison, first bar shows raindays in winter in different years, and the stacked bars illustrate changes for a whole year.`

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
python -m SimpleHTTPServer
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/d/b752b62685ddb111.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@monicagg/uk-raindays-radial-stacked-bar-chart";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
