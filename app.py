from flask import Flask, request, jsonify
import json
from flask_cors import CORS  # Імпортуємо CORS

app = Flask(__name__)
CORS(app)  # Вмикаємо CORS після створення `app`

data_file = "data.json"

def save_data(new_data):
    try:
        with open(data_file, "r") as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []
    
    data.append(new_data)
    with open(data_file, "w") as file:
        json.dump(data, file, indent=4)

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    if not all(key in data for key in ("name", "email", "message")):
        return jsonify({"error": "Missing data"}), 400
    
    save_data(data)
    print(f"Отримано: {data}")  # Лог в консоль, щоб бачити запити
    return jsonify({"success": "Data saved"})

if __name__ == "__main__":
    app.run(debug=True)
