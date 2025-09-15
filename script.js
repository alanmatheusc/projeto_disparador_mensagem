    (function(){
      const form = document.getElementById('disparadorForm');
      const planilhaField = document.getElementById('url-planilha');
      const messageField = document.getElementById('message');
      const errorMsg = document.getElementById('errorMsg');
      const successMsg = document.getElementById('successMsg');

      const webhookURL = "AQUI O WEBHOOK ou a API";
      
      function enviarMensagemeUrl(payload){
        fetch(webhookURL, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload), 
        })
        .then(response => response.json())
        .then(data => {
          successMsg.textContent = "Enviado com sucesso!";
          successMsg.style.display = 'block';
          // opcional: limpar mensagem erro
          errorMsg.style.display = 'none';
        })
        .catch(error => {
          errorMsg.textContent = "Ocorreu um erro ao enviar.";
          errorMsg.style.display = 'block';
          successMsg.style.display = 'none';
          console.error('Error:', error);
        });
      }

      function tratarUrl(url){
        const regex = /\/d\/([^\/]+)\/edit/;
        const match = url.match(regex);
        if(match && match[1]){
          return match[1];
        }
        return null;
      }

      function verificarCampos(url,mensagem){
        const urlTratada = tratarUrl(url);
        if(!urlTratada || !mensagem){
          errorMsg.innerHTML = "Atenção! Verifique os campos acima.";
          errorMsg.style.display = 'block';
          successMsg.style.display = 'none';
          return null;
        }
        errorMsg.style.display = 'none';
        return { urlTratada, mensagem };
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const payload = verificarCampos(planilhaField.value.trim(), messageField.value.trim());
        if(payload){
          enviarMensagemeUrl(payload);
          planilhaField.value = '';
          messageField.value = '';
        }
      });
    })();