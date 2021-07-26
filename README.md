Fun with Async
============================

A hands-on workshop on understaning async tasks. 

## Intro 

We'll go through why we need to handle async tasks, some common semantics for doing that like callbacks, Promises and `async`/`await`.

`server.js` implements a simple webserver (in NodeJS), which accept API styles queries (for e.g. `/i/121`) and responds with a random number in the range of [0, 10]. Depending on the path used the server will respond immediately or after a delay. This can be used to simulate a server which does some work (for e.g. a database lookup before responding) before responding causing the response to be delayed. We will write code to talk to this server and learn various ways of dealing with this delay.

The server supports 3 different URL paths.

- `/i/*` - responds immediately
- `/s/*` - responds with static 10s timeout
- `/r/*` - responds with random timeout [1s, 10s]

You can do this workshop in the programming language of your choice. 

A solution for NodeJS is available in [client.js](/client.js).
A solution for Python is available in [client.py](/client.py).


## Running

You can run the server using

```
node server.js
```

## Exercise 0 - Getting started

Let's get some basics setup. 

Write a program which 
- sends a HTTP request to `localhost:8080/i/42`, 
- gets the response
- computes the time taken for the response

## Exercise 1 - Dealing with delay/latency

Write a program which 
- sends a HTTP request to `localhost:8080/s/42`, 
- gets the response
- computes the time taken for the response (<1s)

Note that since there is a delay in the server's response, the client waits for that amount of time. In the case of programming languages like Python, the HTTP request function call like `urllib.request.urlopen("...").read()` is a blocking call. This means that the client will will blocked from executing anything else during that time. This can cause the application/program to be unresponsive to other events.

One approach to deal with asynchronicity is to use Threads. The HTTP request can be done on a thread which can then block if needed and join back when the response is received. While a viable appoach, it can add a lot of complexity and be error prone.

JavaScript's programming model doesn't have this blocking calls, so the only way to do this is to use a callback. Internally it uses threads to wait for the response and then execute the callback when the response is received. But all the innerworkings of threads is hidden from the developer. So for example in `client.js`, the function (`cb`) pass in to the `httpget` method is a callback. The callback will be called when the server responds. Which means that the client can continue executing code while the server is still responding.

So **callbacks** and **blocking calls** are common mechanisms used to deal with asynchronicity.

## Exercise 1a - Promises and Futures

Another very commonly used mechanism to deal with asynchronicity is **Promises**/**Futures**. A Promise is a way to represent the result of an asynchronous operation. The Promise is resolved when the operation is complete and the Promise is rejected when the operation fails. These are usually just API wrappers around the underlying mechanisms like Threads or Coroutines and expose a nice interface to the developer.

Write a program using Promises/Futures which 
- sends a HTTP request to `localhost:8080/s/42`, 
- gets the response
- computes the time taken for the response (~10s)

Python doesn't have a very simple implementation of Promises/Futures. `concurrent.futures` does allows you run a task on a thread pool, but it isn't as elegant as the Promises/Futures in other languages. Hence the example code in `client.py` uses `async/await` a concept we'll learn in Exercise 3.

## Exercise 2 - Doing many things in parallel

**Promises**/**Futures** are not only nice syntactic sugar over **callbacks** and **blocking calls** but allow an easy way to do many things in parallel. If we want to get many things from a server, and since a request to a server will take time, it makes sense to send another request while waiting for the first one to complete.

Write a program using Promises/Futures which 
- sends a HTTP requests to `localhost:8080/s/42`, `localhost:8080/s/43`, `localhost:8080/s/44` and `localhost:8080/s/45` **IN PARALLEL**
- gets the response
- computes the time taken for the response (~10s)

While it's easy to do this using **callbacks** and **blocking calls**, Promises give a very clean API with the likes of `Promises.all` in Javascript which take a list of Promises and return a single Promise which is resolved when all of the Promises are resolved.

## Exercise 3 - Async dependencies

Write a program which 
- sends a HTTP requests to `localhost:8080/s/42`, `localhost:8080/s/43`, `localhost:8080/s/44` and `localhost:8080/s/45` **IN PARALLEL**
- gets the responses, let's call the responses `A`, `B`, `C` and `D`
- sums the responses (`A+B+C+D`) , let's call the sum `S`
- sends a HTTP request to `localhost:8080/s/$S`,
- gets the response
- computes the time taken for all of the above computation (~20s)

**Promises**/**Futures** are great at doing things in parallel, but they can't do things which depend on the result of other things. For example, if we want to get the sum of the responses, we need to know the sum of the responses before we can get the response for the request to the server. This combination of asychronous and synchronous behavior can get unweildly with Promises.

Many languages support a language level syntax to allow various function to be defined as asynchronous and which can then be either executed in parallel or in series depending on the logic to be implemeted with nice and easy syntax. `async/await` in JavaScript is one such language level syntax.