from flask import Flask, request, render_template,redirect
import google.generativeai as genai

app = Flask(__name__)

genai.configure(api_key="AIzaSyChSTvXp4795Cpvg-wSJnhsK2ItlNvGnGI")

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

convo = model.start_chat(history=[])

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_message', methods=['POST', 'GET'])
def send_message():
    message = request.form['message']
    print(message)
    convo.send_message(message)
    return convo.last.text

if __name__ == '__main__':
    app.run(debug=True)
