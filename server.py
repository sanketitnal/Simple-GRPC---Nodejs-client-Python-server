import grpc
from concurrent import futures
import time
import auth_pb2_grpc as auth_grpc
import auth_pb2 as auth_pb2


class AuthService(auth_grpc.AuthServiceServicer):
    def validateCredentials(self, request, context):
        print("Login request received")
        print("Username: " + request.username)
        print("Password: " + request.password)
        response = auth_pb2.AuthResponse()
        if request.username == "admin" and request.password == "admin":
            print("Login successful")
            response.status = 1
        else:
            print("Login failed")
            response.status = 0
        print("----------------------------------")
        return response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    auth_grpc.add_AuthServiceServicer_to_server(AuthService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started")
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
