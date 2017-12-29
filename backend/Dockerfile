FROM python:3-alpine

WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt

# Expose the Flask port
EXPOSE 5000

CMD [ "python", "app/app.py", "production" ]
