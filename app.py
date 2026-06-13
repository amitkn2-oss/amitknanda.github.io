from flask import Flask, render_template, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)

# Mock data - replace with real data
def get_dashboard_data():
    return {
        "profile": {
            "name": "Amit Kumar",
            "title": "Full Stack Developer",
            "bio": "Building beautiful web experiences",
            "avatar": "https://avatars.githubusercontent.com/u/example"
        },
        "stats": {
            "projects": 24,
            "contributions": 1250,
            "followers": 342,
            "repositories": 18
        },
        "activities": [
            {
                "type": "project",
                "title": "Personal Dashboard",
                "description": "Real-time dashboard with animations",
                "date": "Today",
                "icon": "📊"
            },
            {
                "type": "achievement",
                "title": "1000 GitHub Stars",
                "description": "Reached 1000 stars on a project",
                "date": "2 days ago",
                "icon": "⭐"
            },
            {
                "type": "contribution",
                "title": "Code Contribution",
                "description": "Merged pull request to open source",
                "date": "3 days ago",
                "icon": "🔧"
            },
            {
                "type": "project",
                "title": "AI Chat Application",
                "description": "Building an intelligent chatbot",
                "date": "1 week ago",
                "icon": "🤖"
            }
        ],
        "skills": [
            {"name": "Python", "level": 95},
            {"name": "JavaScript", "level": 90},
            {"name": "React", "level": 88},
            {"name": "Flask", "level": 92},
            {"name": "UI/UX", "level": 85},
            {"name": "DevOps", "level": 80}
        ],
        "projects": [
            {
                "id": 1,
                "name": "Personal Dashboard",
                "description": "Modern dashboard with real-time updates",
                "tech": ["Python", "JavaScript", "CSS"],
                "image": "🎨",
                "link": "#"
            },
            {
                "id": 2,
                "name": "AI Chat Bot",
                "description": "Intelligent chatbot with NLP",
                "tech": ["Python", "TensorFlow", "React"],
                "image": "🤖",
                "link": "#"
            },
            {
                "id": 3,
                "name": "Weather App",
                "description": "Real-time weather forecasting",
                "tech": ["JavaScript", "API", "React"],
                "image": "🌤️",
                "link": "#"
            },
            {
                "id": 4,
                "name": "E-Commerce Platform",
                "description": "Full-stack e-commerce solution",
                "tech": ["Python", "React", "PostgreSQL"],
                "image": "🛒",
                "link": "#"
            }
        ]
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/dashboard')
def api_dashboard():
    return jsonify(get_dashboard_data())

@app.route('/api/activity')
def api_activity():
    return jsonify({
        "latest_activity": "Just updated the dashboard!",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
