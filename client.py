#/bin/env python

import httpx
import asyncio
import urllib.request
import time

def exercise0() :
    print("--------Exercise 0----------------")
    start = time.time();
    data = urllib.request.urlopen("http://localhost:8080/i/42").read()
    print(f"Received response {data}");
    print(f"Time taken {time.time()-start}s");

def exercise1() :
    print("--------Exercise 1----------------")
    start = time.time();
    data = urllib.request.urlopen("http://localhost:8080/s/42").read()
    print(f"Received response {data}");
    print(f"Time taken {time.time()-start}s");
    print(f"Python can have blocking methods");

async def exercise1a() :
    print("--------Exercise 1a----------------")
    start = time.time();
    async with httpx.AsyncClient() as client:
        response = await client.get("http://localhost:8080/s/42", timeout=None)
        print(f"Received response {response.text}");
        print(f"Time taken {time.time()-start}s");

async def get_text(url) :
    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=None)
        return response.text

async def exercise2() :
    print("--------Exercise 2----------------")
    urls = [
        "http://localhost:8080/s/42", 
        "http://localhost:8080/s/43", 
        "http://localhost:8080/s/44", 
        "http://localhost:8080/s/45"
    ]
    start = time.time();
    client = httpx.AsyncClient()
    getResponses = [get_text(url) for url in urls]
    data = await asyncio.gather(*getResponses)
    await client.aclose()
    print(f"Received response {data}");
    print(f"Time taken {time.time()-start}s");
    
async def exercise3() :
    print("--------Exercise 3----------------")
    urls = [
        "http://localhost:8080/s/42", 
        "http://localhost:8080/s/43", 
        "http://localhost:8080/s/44", 
        "http://localhost:8080/s/45"
    ]
    start = time.time();
    getResponses = [get_text(url) for url in urls]
    data = await asyncio.gather(*getResponses)
    print(f"Received response {data}");
    S = sum([int(x) for x in data])
    getResponse = [get_text("http://localhost:8080/s/"+str(S))]
    data2 = await asyncio.gather(*getResponse)
    print(f"Received response {data2}");
    print(f"Time taken {time.time()-start}s");
    

# exercise0()
# exercise1()
# asyncio.run(exercise1a())
# asyncio.run(exercise2())
# asyncio.run(exercise3())