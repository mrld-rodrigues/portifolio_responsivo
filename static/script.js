/* Abre e fecha menu lateral em modo mobile */

const menuMobile = document.querySelector('.menu-mobile')
const body = document.querySelector('body')

menuMobile.addEventListener('click', () => {
    menuMobile.classList.contains("bi-list")
        ? menuMobile.classList.replace("bi-list", "bi-x")
        : menuMobile.classList.replace("bi-x", "bi-list");
    body.classList.toggle("menu-nav-active")
});


/* Fechar a navbar quando cliclar em algum item e muda o icone para list*/

const navItem = document.querySelectorAll(".nav-item")

navItem.forEach(item => {
    item.addEventListener("click", () => {
        if (body.classList.contains("menu-nav-active")) {
            body.classList.remove("menu-nav-active")
            menuMobile.classList.replace("bi-x", "bi-list");
        }
    })
})

// Animar todos os itens na tela que tiverem o atributo data-animation

const item = document.querySelectorAll("[data-animation]");
const animationScroll = () => {
    const windowTop = window.scrollY + window.innerHeight * 0.85;

    item.forEach(element => {
        if (windowTop > element.offsetTop) {
            element.classList.add("animate");
        } else {
            element.classList.remove("animate");
        }
    });
};

animationScroll()

window.addEventListener("scroll", () => {
    animationScroll();
})

// Ativar o o botão de carregamento do enviar

const form = document.querySelector('form');
const btnEnviar = document.querySelector('#btn-enviar');
const btnEnviando = document.querySelector('#btn-enviando');

form.addEventListener('submit', (event) => {
  // previne que o formulário seja enviado antes da verificação
  event.preventDefault();
  
  // verifica se todos os campos foram preenchidos
  const nome = document.querySelector('#nome').value;
  const email = document.querySelector('#email').value;
  const mensagem = document.querySelector('#mensagem').value;
  
  if (nome && email && mensagem) {
    // exibe o botão "enviando" e esconde o botão "enviar"
    btnEnviando.style.display = 'block';
    btnEnviar.style.display = 'none';
    
    // envia a mensagem
    form.submit();
  } else {
    // exibe uma mensagem de erro
    alert('Por favor, preencha todos os campos.');
  }
});

// Timer para o alerta desaparecer
setTimeout(()=>{
    document.querySelector('#alerta').style.display = 'none';
}, 3000)