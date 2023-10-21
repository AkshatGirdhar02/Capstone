from flask import Flask, jsonify, request
import random
from flask_cors import CORS
from difficulty_level_in_ques import mcq_data, oline_data, oword_data, tf_data
import pandas as pd

app = Flask(__name__)
CORS(app)  # for react

def handle_nan(value):
    return '' if pd.isna(value) else value

questions = {
    'MCQ': mcq_data.applymap(handle_nan).to_dict(orient='records'),
    'TrueFalse': tf_data.applymap(handle_nan).to_dict(orient='records'),
    'OneWord': oword_data.applymap(handle_nan).to_dict(orient='records'),
    'OneLiner': oline_data.applymap(handle_nan).to_dict(orient='records')
}

def get_random_question(question_type=None):
    if question_type and question_type in questions:
        return random.choice(questions[question_type])
    else:
        question_type = random.choice(list(questions.keys()))
        return random.choice(questions[question_type])

@app.route('/random_question', methods=['GET'])
def random_question():
    question_type = request.args.get('type')
    question = get_random_question(question_type)
    print(question)
    return jsonify(question)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
