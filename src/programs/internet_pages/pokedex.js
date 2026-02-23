export const pokedexPage = {
    title: "Pokédex & Arena",
    date: "9 de Novembro de 2025",
    theme: "theme-hypnospace",
    content: `
<center>
    <a href="https://pokedex-and-arena.onrender.com/" target="_blank" style="text-decoration: none;" alt="Pokédex & Arena">
        <img src="https://i.postimg.cc/vZ62X4Xw/pokedex.png" width="300" style="border: 4px solid #FF0000; border-radius: 5px; margin-bottom: 10px; image-rendering: pixelated;">
    </a>
    <h1 style="color: #FFDE00; text-shadow: 2px 2px #3B4CCA;">Pokédex & Arena</h1>
</center>

Bem-vindo ao **Pokédex & Arena**! Todo o programador tem o seu rito de passagem, e o meu foi construir esta enciclopédia. Desenvolvido para a disciplina de *Lab. de Programação*, este projeto não se limita a ser uma lista passiva: aqui, os monstrinhos vão mesmo à porrada.
<br>
---

### O Desafio Académico<br>
A ideia principal era interagir com uma API RESTful e manipular os dados no ecrã. Mas, como fazer apenas o básico é aborrecido, decidi implementar um simulador de batalhas a correr diretamente no servidor.<br><br>

* **O Triunfo:** Integrar a clássica <a href="pokeapi.co" target="_blank">PokeAPI</a> para extrair estatísticas, tipos e habilidades em tempo real.
* **O Caos:** Garantir que a lógica de combate (com cálculo de dano e atributos) funcionasse de forma fiável no *Back-end* sem deitar abaixo o servidor.
<br>
---

### A Minha Master Ball (Tecnologias)<br>
Afastando-nos do ideal corporativo, aqui o foco foi a agilidade e a rapidez de desenvolvimento:<br><br>

* **Python (Flask):** O motor de toda a aplicação. Leve, direto ao assunto e perfeito para renderizar os *templates* HTML e calcular quem ganha a batalha.
* **HTML, CSS & JavaScript:** O *Front-end* clássico. Sem frameworks pesados a atrapalhar, apenas código puro para apresentar os dados ao utilizador.
* **PokeAPI:** A espinha dorsal dos dados. Onde vamos buscar todas as informações oficiais.
<br>
---

### O Que Temos?

1. **A Pokédex Clássica:** Pesquisa direta pelo Nome ou ID. Exibe atributos base, tipos, habilidades.
2. **Arena de Combate:** O verdadeiro trunfo. Escolhes dois Pokémon, e o sistema simula uma batalha turno a turno, gerando um **registo completo (log) do combate** até um deles cair inanimado.

<br>
<center>
    <a href="https://pokedex-and-arena.onrender.com/" target="_blank" style="text-decoration: none; font-size: 16px; font-weight: bold; color: #FFF;">ENTRAR NA ARENA (ONRENDER)</a>
    <br><br>
    <a href="https://github.com/jm-works/Pokedex-And-Arena" target="_blank" style="text-decoration: none;">
        ACESSAR CÓDIGO FONTE
    </a>
    <br><br>
    <i>Feito por JM | José Matheus e muitas gramas de Café em pó.</i>
    <br><br>
</center>

<center style="margin-top: 20px; opacity: 0.6;">
    <img src="https://cyber.dabamos.de/88x31/corp.gif">
    <img src="https://cyber.dabamos.de/88x31/coolness09.gif">
</center>
    `
};