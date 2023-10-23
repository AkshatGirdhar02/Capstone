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

answer=[]
@app.route('/check_answers',methods=['POST'])
def check_answers():
    score=0
    ans=request.args.getlist("answer")
    for i in range(len(ans)):
        print("ans",ans[i])
        print("answer",answer[i]['answer'])
        if(ans[i]==answer[i]['answer']):
            score+=1
    return jsonify({"score":score})

def get_random_question(question_type=None,difficulty=None):
    ques=[]
    answer=[]
    while len(ques)<15:
        if question_type and question_type in questions:
            q=random.choice(questions[question_type])
            if q['difficulty_category']==difficulty:
                question_without_answer = {key: value for key, value in q.items() if key != 'answer'}
                ques.append(question_without_answer)
                ans={key:value for key, value in q.items() if key=='answer'}
                answer.append(ans)
    return [ques,answer]

@app.route('/random_question', methods=['GET'])
def random_question():
    question_type = request.args.get('type')
    difficulty = request.args.get('difficulty')
    [question,ans] = get_random_question(question_type,difficulty)
    print("--------------------")
    print("ans",ans)
    global answer
    answer=ans
    print("-------------------")
    return jsonify(question)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
