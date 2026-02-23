export const deneasyPage = {
    title: "DeneasyBot - Squad 6",
    date: "05 de dezembro de 2025",
    theme: "theme-hypnospace", 
    content: `
<center>
    <a href="https://github.com/squad6-deneasybot/deneasy-bot" target="_blank" style="text-decoration: none;" alt="DeneasyBot">
        <img src="https://avatars.githubusercontent.com/u/236934282?s=200&v=4" width="200" style="border: 3px ridge #0f0; margin-bottom: 10px; border-radius: 5px;">
    </a>
    <h1>DeneasyBot - O fim da Burocracia Financeira</h1>
</center>

Bem-vindo à página do **DeneasyBot**, o projeto que coroa a **Squad 6** (A Minha) como a grande campeã da Residência de Software II da Universidade Tiradentes (UNIT)!
Desenvolvido em parceria com a *Easy Gestão de Negócios*, este sistema é um assistente virtual robusto via WhatsApp que puxa a orelha da sua empresa e automatiza o caos financeiro e corporativo.
<br>
---

### O Desafio & O Triunfo<br>
O objetivo era claro: facilitar a vida dos gestores, trazendo os dados do ERP direto para a palma da mão no zap, sem interfaces chatas. Eu fiquei responsável pela engenharia do **Back-end**, domando o servidor para garantir que ele não derretesse com as requisições.<br><br>

* **O Título:** Saímos como o grupo campeão. Muito suor, noites em claro e rios de café convertidos em código limpo e funcional.
* <span style="text-decoration: line-through red; text-decoration-thickness: 2px;">**A Decepção:** Infelizmente, não deu pra esconder um Waifu Viewer ou gerar garotas-2D no painel de administração de relatórios. O mercado corporativo financeiro ainda não tem o *mindset* preparado para isso... uma pena.</span>
<br>
---

### Debaixo do Capô (O Mar de Tecnologias)<br>
Através do conhecimento adquirido ao longo do curso, usamos o que há de mais moderno no ecossistema corporativo:<br><br>

* **Java 21 & Spring Boot (3.5.x):** Estruturado com Spring Data JPA, Security e Mail.
* **Orquestrador de Webhooks (Meta/WhatsApp):** Implementei uma máquina de estados complexa (\`ChatStateService\`). O bot sabe exatamente onde você parou na conversa (se está esperando a *App Key*, um código de e-mail ou navegando no menu), evitando que o fluxo enlouqueça.
* **Integração Omie ERP & Resilience4j:** Consumo massivo de APIs financeiras (Resumo, Movimentos, Categorias). Usamos *Rate Limiting* e *Retry* do Resilience4j para garantir que o bot não capote se a API do ERP piscar.
* **Segurança Criptográfica:** Implementação de AES/GCM com Salt dinâmico para blindar as credenciais sensíveis da empresa no banco de dados. Um sistema de segurança muito mais fechado e impenetrável que a zaga do Vasco, diga-se de passagem.
* **Jobs Agendados (\`@Scheduled\`):** Porque máquinas não dormem. Cron jobs rodando de madrugada para compilar relatórios financeiros HTML lindos e enviar direto via E-mail (Mailtrap/SMTP).
<br>
---

### O Que o Bot Faz na Prática?

1. **Autenticação em 2 Fatores:** Ninguém acessa os dados sem receber e validar um código de 6 dígitos mágico por e-mail e gerar um Token JWT na sessão do Zap.
2. **Métricas na Velocidade da Luz:** Projeções de caixa, títulos a vencer, títulos vencidos e ranking das top despesas na tela do seu WhatsApp.
3. **Gerenciamento de Equipe (CRUD):** Gestores adicionam, atualizam e removem o acesso de funcionários usando apenas comandos numéricos no chat.
4. **Wishlists & Avaliações:** Um sistema de feedback direto para a empresa saber onde melhorar (ou apenas para o usuário desabafar sobre seus problemas pessoais).

<br>
<center>
    <a href="https://github.com/squad6-deneasybot/deneasy-bot" target="_blank" style="text-decoration: none;">
        ACESSAR REPOSITÓRIO DO BACK-END
    </a>
    <br>
    <i>Copyright © 2025 José Matheus & Squad 6. A burocracia destruída com sucesso.</i>
</center>

<br><br>

<center>
<img src="https://cyber.dabamos.de/88x31/cogs.gif">
</center>
    `
};