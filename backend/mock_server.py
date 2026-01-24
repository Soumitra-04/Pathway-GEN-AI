from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os

# CONFIG
PORT = 8000
DATA_FILE = "./market_data/trends.txt"

class MockPathwayHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Only handle the specific Pathway route
        if self.path == "/v1/retrieve":
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len)
            print(f"Received Query: {post_body.decode('utf-8')}")

            # 1. Read your text file
            try:
                if os.path.exists(DATA_FILE):
                    with open(DATA_FILE, "r", encoding="utf-8") as f:
                        file_content = f.read()
                else:
                    file_content = "Default market data: AI is trending up."
            except Exception as e:
                file_content = f"Error reading file: {str(e)}"

            # 2. Mimic Pathway's JSON response format
            # Pathway returns a list of objects with a 'text' field
            response_data = [
                {"text": file_content, "metadata": {"source": "trends.txt"}}
            ]

            # 3. Send Response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def run(server_class=HTTPServer, handler_class=MockPathwayHandler):
    server_address = ('', PORT)
    httpd = server_class(server_address, handler_class)
    print(f"✅ MOCK Pathway Server running on port {PORT}")
    print(f"📂 Reading data from: {DATA_FILE}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()