FROM python:2.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD req.txt /code/
RUN pip install -r req.txt
ADD . /code/
RUN ./patches/apply.sh
RUN ./manage.py makemigrations
RUN ./manage.py migrate
