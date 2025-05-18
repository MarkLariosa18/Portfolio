from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import logging
import validators
from contextlib import contextmanager
from apscheduler.schedulers.background import BackgroundScheduler
import requests
import atexit

app = Flask(__name__, static_folder='frontend/dist', static_url_path='/')
CORS(app, resources={r"/api/*": {"origins": ["https://portfolio-4s1j.onrender.com", "http://localhost:5173"]}})

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
APP_URL = os.getenv('APP_URL', 'https://portfolio-4s1j.onrender.com')
ENV = os.getenv('FLASK_ENV', 'production')

# SQLite database setup
def get_db():
    conn = sqlite3.connect('portfolio.db')
    conn.row_factory = sqlite3.Row
    return conn

@contextmanager
def get_db_connection():
    conn = get_db()
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute('''CREATE TABLE IF NOT EXISTS contacts
                        (id INTEGER PRIMARY KEY AUTOINCREMENT,
                         name TEXT NOT NULL,
                         email TEXT NOT NULL,
                         message TEXT NOT NULL,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
            conn.commit()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Database initialization failed: {str(e)}")
        raise

def send_email(name, email, message):
    try:
        if not EMAIL_ADDRESS or not EMAIL_PASSWORD:
            logger.error("Missing email credentials in .env")
            return False

        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = f'New Contact Form Submission from {name}'

        body = f"""
        New message from your portfolio contact form:

        Name: {name}
        Email: {email}
        Message: {message}
        """
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        logger.info("Email sent successfully")
        return True
    except Exception as e:
        logger.error(f"Email sending failed: {str(e)}")
        return False

# Ping function to prevent spin-down
def ping_self():
    try:
        response = requests.get(f"{APP_URL}/api/health")
        logger.info(f"Ping response: {response.status_code}")
    except Exception as e:
        logger.error(f"Ping failed: {str(e)}")

# Set up scheduler for pinging every 14 minutes
scheduler = BackgroundScheduler()
scheduler.add_job(ping_self, 'interval', minutes=14)
scheduler.start()

# Shutdown scheduler on app exit
atexit.register(lambda: scheduler.shutdown())

@app.route('/api/health')
def health_check():
    try:
        with get_db_connection() as conn:
            conn.execute('SELECT 1')
        return jsonify({'status': 'healthy'}), 200
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return jsonify({'status': 'unhealthy'}), 500

@app.route('/')
def serve_frontend():
    try:
        return send_from_directory(app.static_folder, 'index.html')
    except Exception as e:
        logger.error(f"Failed to serve frontend: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/<path:path>')
def serve_static(path):
    try:
        return send_from_directory(app.static_folder, path)
    except Exception as e:
        logger.error(f"Failed to serve static file {path}: {str(e)}")
        return jsonify({'error': 'File not found'}), 404

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        if not data:
            logger.warning("No JSON data received")
            return jsonify({'error': 'No data provided'}), 400

        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()

        if not all([name, email, message]):
            logger.warning("Missing required fields")
            return jsonify({'error': 'All fields are required'}), 400

        if not validators.email(email):
            logger.warning("Invalid email format")
            return jsonify({'error': 'Invalid email format'}), 400

        if len(name) > 100 or len(message) > 1000:
            logger.warning("Input too long")
            return jsonify({'error': 'Input too long'}), 400

        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
                      (name, email, message))
            conn.commit()
        logger.info("Message stored in database")

        email_sent = send_email(name, email, message)
        if not email_sent:
            logger.warning("Email sending failed, but message saved")
            return jsonify({
                'message': 'Message saved, but failed to send email. I will get back to you soon.'
            }), 200

        return jsonify({'message': 'Message received and email sent'}), 200
    except sqlite3.Error as e:
        logger.error(f"Database error: {str(e)}")
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        logger.error(f"Contact endpoint error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    if not os.path.exists('portfolio.db'):
        init_db()
    app.run(debug=ENV == 'development', port=5000)