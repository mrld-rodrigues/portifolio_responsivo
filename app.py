from flask import Flask, flash, render_template, redirect, request
import smtplib
import ssl
from email.message import EmailMessage

app = Flask(__name__)
app.secret_key = 'xes666xes'

# Armazena informações de autenticação em um arquivo de configuração
from control.config import emailp, password


class Contato:
    def __init__(self, nome, email, mensagem):
        self.nome = nome
        self.email = email
        self.mensagem = mensagem


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send', methods=['POST'])
def send():

    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        mensagem = request.form['mensagem']        
        contato = Contato(nome, email, mensagem)        
        # configurações do e-mail
        msg = EmailMessage()
        msg['Subject'] = 'Contato Portfólio'
        msg['From'] = emailp
        msg['To'] = emailp
        body = f"""
        Nome: {contato.nome}\n
        Email: {contato.email}\n
        Mensagem: {contato.mensagem}
        """
        msg.set_content(body)        
        # envio do e-mail
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
            smtp.login(emailp, password)
            smtp.send_message(msg)
            flash('Mensagem enviada com sucesso!')
            print(emailp, password)
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
