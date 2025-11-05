# Vision Vuln-scanner
Vision Vuln-Scanner is a lightweight educational vulnerability scanner and web UI for learning web & network security concepts. It bundles a simple frontend (HTML/CSS/JS) and a Python scanner backend that runs locally, produces scan logs, and is intended only for authorized, educational, and defensive use.

Short disclaimer: For educational use only. The author (Vision) is not responsible for misuse — run this tool only against systems you own or have explicit written permission to test.

What it is

Vision Vuln-Scanner is a small educational project that demonstrates simple automated checks for common web vulnerabilities and provides a minimal web UI to run scans and view results. It is not a professional penetration-testing suite.


Disclaimer — READ THIS BEFORE USING

This tool is provided solely for educational, research, and defensive security purposes. By using this software you agree:

You will only scan systems you own or for which you have explicit, written permission.

The author, Vision, and contributors are not liable for any misuse, damage, or legal consequences arising from your use.

The tool is provided as-is with no warranty. Use at your own risk and in compliance with all applicable laws.

If you do not accept these terms, do not use this project.


Features

Simple web-based UI (index.html, script.js, styles.css)

Python-based scanner backend (scanner.py)

Outputs JSON-formatted scan logs

Easy to run on Windows, Linux, or macOS

Designed for learning and experimentation


Repository contents
Vuln-scanner/
├── .gitignore
├── LICENSE
├── README.md
├── requirements.txt
├── index.html
├── styles.css
├── script.js
├── logo.png
├── scanner.py
├── run.sh
├── run.bat


Requirements

Python 3.8+

pip

(Optional) virtualenv or builtin venv

Install Python packages from requirements.txt:

pip install -r requirements.txt


Tip: pin package versions in requirements.txt for reproducible installs.


Installation (quick)

Clone the repo:

git clone https://github.com/vision-dev1/vuln-scanner.git
cd vuln-scanner


Create & activate a virtual environment:

macOS / Linux:

python3 -m venv .venv
source .venv/bin/activate


Windows (PowerShell):

python -m venv .venv
.\.venv\Scripts\Activate.ps1


Install dependencies:

pip install -r requirements.txt

Running the app
Option A — Run directly (recommended for development)

Run the Python scanner which will start the local web UI (if implemented to do so):

python scanner.py


or use the provided script:

Linux / macOS:

chmod +x run.sh
./run.sh


Windows:

run.bat


Option B — Serve the frontend separately

If scanner.py exposes an API (e.g., Flask), run the backend and open index.html in your browser or serve it with a static server. Example for a simple Python HTTP server (frontend only):

# from the project root
python -m http.server 8000
# open http://localhost:8000/index.html


How to use

Start the backend (python scanner.py or ./run.sh).

Open the UI at the URL printed by the backend (usually http://127.0.0.1:5000 or open index.html directly).

Enter the target (only use authorized targets), configure scan options, and click Scan.

View scan progress in the UI. JSON-formatted logs will be created in scan_logs/ (local).


Development notes

Keep the scanner modular: separate HTTP/UI code from scanning logic.

Sanitize and rate-limit any automated requests to avoid accidental DoS.

Add unit tests for parsing/formatting logic where possible.

Consider implementing a --dry-run mode for testing.


Contribution

Contributions welcome! If you accept contributions, add CONTRIBUTING.md. Keep PRs small and include tests or examples. Ensure contributors understand the legal & ethical constraints.


Security & Legal

This tool is not a replacement for professional security testing.

Always obtain written permission before testing third-party systems.

If you discover a real vulnerability while using this tool, follow responsible disclosure practices.


License

This project is distributed under the terms in LICENSE. (MIT LICENSE)

Contact

Author: Vision
GitHub: https://github.com/yourusername (replace with your actual handle)
Email: (optional — add if you want public contact)
