import json
from app.main import app

with open("openapi.json", "w") as f:
    json.dump(app.openapi(), f)
print("OpenAPI spec dumped successfully.")
