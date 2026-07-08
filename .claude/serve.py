import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

DIRECTORY = "/Users/chetnagrover/Desktop/DesAIgn Square"
Handler = functools.partial(SimpleHTTPRequestHandler, directory=DIRECTORY)
ThreadingHTTPServer(("127.0.0.1", 4599), Handler).serve_forever()
