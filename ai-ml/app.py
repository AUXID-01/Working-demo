from flask import Flask, request, jsonify, render_template_string

app = Flask(__name__)

CATEGORY_RULES = {
    "cat-4": {
        "symptoms": [
            "severe chest pain", "loss of consciousness", "seizure", "severe headache",
            "heart palpitations", "shortness of breath", "difficulty breathing", "choking",
            "suspected poisoning", "overdose", "severe bleeding", "fracture", "severe burns"
        ],
        "combinations": [
            ["severe chest pain", "shortness of breath"], ["choking", "difficulty breathing"]
        ],
        "severity_min": 8,
        "advice": "EMERGENCY: Ambulance dispatch & hospital alert required!"
    },
    "cat-3": {
        "symptoms": [
            "chest pain", "shortness of breath", "serious symptoms", "confusion", "persistent vomiting", "high fever"
        ],
        "combinations": [
            ["high fever", "persistent cough"], ["chest pain", "shortness of breath"],
            ["fever", "shortness of breath"]
        ],
        "duration_min": 3,  # fever ≥3 days
        "advice": "SERIOUS: Book video consult with doctor ASAP. Post-consultation care needed."
    },
    "cat-2": {
        "symptoms": [
            "persistent fever", "persistent cough", "sore throat", "pain with moderate severity",
            "body ache", "moderate headache", "moderate cough", "fatigue", "mild fever > 2 days"
        ],
        "combinations": [
            ["sore throat", "fever"], ["runny nose", "sore throat"],
            ["moderate headache", "fever"], ["body ache", "moderate cough"]
        ],
        "severity_min": 5,
        "advice": "MODERATE: Needs medication & pharmacy notification. Admin to track adherence."
    },
    "cat-1": {
        "symptoms": [
            "mild headache", "runny nose", "fatigue", "mild cough", "mild fever", "common cold"
        ],
        "combinations": [
            ["mild headache", "fatigue"], ["runny nose", "mild cough"], ["common cold", "mild cough"]
        ],
        "severity_max": 4,
        "advice": "MILD: Self-care. Rest, fluids, OTC remedies; schedule remote check-in."
    }
}

def classify_symptoms(symptoms, severity, duration_days=1):
    symptoms_lower = [s.lower().strip() for s in symptoms]

    # Cat-4 first
    if severity >= CATEGORY_RULES["cat-4"]["severity_min"]:
        return {"category": "cat-4", "advice": CATEGORY_RULES["cat-4"]["advice"]}
    for emerg in CATEGORY_RULES["cat-4"]["symptoms"]:
        if emerg in symptoms_lower:
            return {"category": "cat-4", "advice": CATEGORY_RULES["cat-4"]["advice"]}
    for combo in CATEGORY_RULES["cat-4"]["combinations"]:
        if all(s in symptoms_lower for s in combo):
            return {"category": "cat-4", "advice": CATEGORY_RULES["cat-4"]["advice"]}
    # Cat-3
    for combo in CATEGORY_RULES["cat-3"]["combinations"]:
        if all(s in symptoms_lower for s in combo):
            return {"category": "cat-3", "advice": CATEGORY_RULES["cat-3"]["advice"]}
    if ("fever" in symptoms_lower and duration_days >= CATEGORY_RULES["cat-3"].get("duration_min", 999)) or \
        any(ser in symptoms_lower for ser in CATEGORY_RULES["cat-3"]["symptoms"]):
        return {"category": "cat-3", "advice": CATEGORY_RULES["cat-3"]["advice"]}
    # Cat-2
    for combo in CATEGORY_RULES["cat-2"]["combinations"]:
        if all(s in symptoms_lower for s in combo):
            return {"category": "cat-2", "advice": CATEGORY_RULES["cat-2"]["advice"]}
    if severity >= CATEGORY_RULES["cat-2"]["severity_min"] or \
        ("fever" in symptoms_lower and duration_days > 2) or \
        any(mod in symptoms_lower for mod in CATEGORY_RULES["cat-2"]["symptoms"]):
        return {"category": "cat-2", "advice": CATEGORY_RULES["cat-2"]["advice"]}
    # Cat-1
    for combo in CATEGORY_RULES["cat-1"]["combinations"]:
        if all(s in symptoms_lower for s in combo):
            return {"category": "cat-1", "advice": CATEGORY_RULES["cat-1"]["advice"]}
    if severity <= CATEGORY_RULES["cat-1"]["severity_max"] or \
        any(mild in symptoms_lower for mild in CATEGORY_RULES["cat-1"]["symptoms"]):
        return {"category": "cat-1", "advice": CATEGORY_RULES["cat-1"]["advice"]}
    # Fallback
    return {"category": "cat-2", "advice": "Unclassified input: Please consult a doctor for evaluation."}

# Home page with simple HTML form
@app.route("/", methods=["GET"])
def home():
    form_html = """
    <h2>Symptom Checker</h2>
    <form method="POST" action="/symptom-check">
        <label>Symptoms (comma separated):</label><br>
        <input type="text" name="symptoms"><br><br>

        <label>Severity (1-10):</label><br>
        <input type="number" name="severity" min="1" max="10"><br><br>

        <label>Duration (days):</label><br>
        <input type="number" name="duration_days" min="1"><br><br>

        <button type="submit">Check</button>
    </form>
    """
    return render_template_string(form_html)

@app.route('/symptom-check', methods=['POST'])
def symptom_check():
    if request.is_json:  # API request
        data = request.get_json()
        symptoms = data.get('symptoms', [])
    else:  # Form submission
        symptoms = request.form.get("symptoms", "").split(",")
    severity = int(request.values.get('severity', 5))
    duration_days = int(request.values.get('duration_days', 1))

    result = classify_symptoms(symptoms, severity, duration_days)

    # If HTML form submission → render result nicely
    if not request.is_json:
        return render_template_string(f"""
        <h3>Result</h3>
        <p><b>Category:</b> {result['category']}</p>
        <p><b>Advice:</b> {result['advice']}</p>
        <a href="/">Go Back</a>
        """)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
