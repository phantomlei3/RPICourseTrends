import sys, os

# Sets up local http server with py3
if __name__ == "__main__":
    portNum = 8000  # default port number
    if (len(sys.argv) > 1):
        portNum = int(sys.argv[1])
    os.system('py -3 -m http.server {}'.format(portNum))
    print("Local server launched on port {}".format(portNum))
