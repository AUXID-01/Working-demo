from flask import Flask, request, jsonify

app = Flask(__name__)

SYMPTOMS_GROUPS = {
    "respiratory": ["cough", "shortness of breath", "wheezing", "chest tightness"],
    "cardiac": ["chest pain", "palpitations", "heart racing"],
    "neurological": ["headache", "dizziness", "seizure", "loss of consciousness", "confusion"],
    "gastrointestinal": ["nausea", "vomiting", "diarrhea", "abdominal pain", "constipation"],
    "constitutional": ["fever", "fatigue", "chills", "weakness", "weight loss"],
    "skin": ["rash", "itching", "swelling"],
    "other": ["joint pain", "muscle ache", "sore throat", "runny nose"]
}

EMERGENCY_SYMPTOMS = [
    "severe chest pain", "loss of consciousness", "seizure", "severe headache", 
    "severe bleeding", "difficulty breathing", "choking", "overdose", "severe burns"
]

EMERGENCY_COMBOS = [
    {"severe chest pain", "shortness of breath"},
    {"loss of consciousness", "seizure"},
    {"difficulty breathing", "choking"},
]

MODERATE_COMBOS = [
    {"fever", "persistent cough"},
    {"sore throat", "high fever"},
    {"diarrhea", "dehydration"},
    {"headache", "vomiting"},
]

def has_combo(symptoms_set, combos):
    return any(combo.issubset(symptoms_set) for combo in combos)

@app.route('/')
def home():
    return "Symptom Checker API is running"

@app.route('/symptom-check', methods=['POST'])
def symptom_check():
    data = request.get_json()

    symptoms = {s.lower().strip() for s in data.get("symptoms", [])}
    severity = int(data.get("severity", 5))
    duration_days = int(data.get("duration_days", 1))
    age = int(data.get("age", 0))
    gender = data.get("gender", "").lower()
    travel_history = data.get("travel_history", False)
    fever = data.get("fever", False)
    fever_temp = float(data.get("fever_temp", 0)) if fever else 0
    difficulty_breathing = data.get("difficulty_breathing", False)
    medical_conditions = [c.lower().strip() for c in data.get("medical_conditions", [])]
    allergies = [a.lower().strip() for a in data.get("allergies", [])]
    pregnant = data.get("pregnant", False) if gender == "female" else False

    if severity >= 8 or difficulty_breathing or fever_temp >= 39.5 or \
       any(symptom in symptoms for symptom in EMERGENCY_SYMPTOMS) or \
       has_combo(symptoms, EMERGENCY_COMBOS):
        category = "cat-4"
        advice = "EMERGENCY: Immediate hospital/ambulance alert required. Contact emergency services now."
    elif severity >= 6 or (fever_temp >= 38.5 and duration_days >= 3) or \
       has_combo(symptoms, MODERATE_COMBOS):
        category = "cat-3"
        advice = "SERIOUS: Book urgent video consultation with doctor immediately."
    elif severity >= 5 or duration_days >= 3 or fever or \
       any(s in symptoms for s in SYMPTOMS_GROUPS["constitutional"]):
        category = "cat-2"
        advice = "MODERATE: Consult a pharmacist or physician for possible medication."
    else:
        category = "cat-1"
        advice = "MILD: Self-care recommended; monitor symptoms and report if condition worsens."

    if age < 5 or age > 70:
        advice += " Special caution advised for children and elderly."
    if pregnant and (fever or severity > 5):
        advice += " Pregnancy risk: please consult your healthcare provider."
    if travel_history:
        advice += " Travel history noted: monitor for infectious diseases."
    if medical_conditions:
        advice += f" Pre-existing conditions listed: {', '.join(medical_conditions)}."
    if allergies:
        advice += f" Known allergies: {', '.join(allergies)}."

    return jsonify({"category": category, "advice": advice})

if __name__ == "__main__":
    app.run(debug=True)

