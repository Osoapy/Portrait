function changeImage(direction, event) {
    const pai = event.target.parentNode;
    const images = pai.querySelectorAll('.images img');
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    images[activeIndex].classList.remove('active');
    
    let newIndex = activeIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    // Adiciona a classe 'active' na nova imagem para aplicar a transição de opacidade
    images[newIndex].classList.add('active');

    // Animação com GSAP nos botões de navegação (setas)
    gsap.to(event.target, {
        scaleX: 1.2114, // Aumenta o tamanho do botão
        duration: 0.2, // Duração da animação
        ease: "power1.out", // Tipo de transição
        yoyo: true, // Faz a animação voltar ao estado inicial
        repeat: 1 // Repete a animação
    });
}

function createProject(priority, title, team, description, imageArray, link) {
    // Criação do container principal
    const portfolioContainer = document.createElement('div');
    portfolioContainer.className = 'portfolio-box';

    // Título do projeto
    const projectTitle = document.createElement('div');
    projectTitle.className = 'project-title';
    projectTitle.textContent = title;
    portfolioContainer.appendChild(projectTitle);

    // Seção da equipe
    const teamSection = document.createElement('div');
    teamSection.className = 'section';

    const teamTitle = document.createElement('div');
    teamTitle.className = 'section-title';
    teamTitle.textContent = 'Equipe';
    teamSection.appendChild(teamTitle);

    const teamDiv = document.createElement('div');
    teamDiv.className = 'team';

    team.forEach(member => {
        const memberP = document.createElement('p');
        memberP.textContent = member;
        teamDiv.appendChild(memberP);
    });

    teamSection.appendChild(teamDiv);
    portfolioContainer.appendChild(teamSection);

    // Seção de descrição
    const descriptionSection = document.createElement('div');
    descriptionSection.className = 'section';

    const descriptionTitle = document.createElement('div');
    descriptionTitle.className = 'section-title';
    descriptionTitle.textContent = 'Descrição';
    descriptionSection.appendChild(descriptionTitle);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description';

    const descriptionP = document.createElement('p');
    descriptionP.textContent = description;
    descriptionDiv.appendChild(descriptionP);

    descriptionSection.appendChild(descriptionDiv);
    portfolioContainer.appendChild(descriptionSection);

    // Seção de imagens
    const imageSection = document.createElement('div');
    imageSection.className = 'section';

    const imageTitle = document.createElement('div');
    imageTitle.className = 'section-title';
    imageTitle.textContent = 'Imagens do Aplicativo';
    imageSection.appendChild(imageTitle);

    const imagesDiv = document.createElement('div');
    imagesDiv.className = 'images';

    imageArray.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Imagem do aplicativo ${index + 1}`;
        if (index === 0) img.className = 'active';
        imagesDiv.appendChild(img);
    });

    // Botões de navegação de imagens
    const leftArrow = document.createElement('button');
    leftArrow.className = 'arrow arrow-left';
    leftArrow.textContent = '<';
    leftArrow.addEventListener('click', event => changeImage(-1, event));
    imagesDiv.appendChild(leftArrow);

    const rightArrow = document.createElement('button');
    rightArrow.className = 'arrow arrow-right';
    rightArrow.textContent = '>';
    rightArrow.addEventListener('click', event => changeImage(1, event));
    imagesDiv.appendChild(rightArrow);

    imageSection.appendChild(imagesDiv);
    portfolioContainer.appendChild(imageSection);

    // Seção de link do projeto
    const linkSection = document.createElement('div');
    linkSection.className = 'section';

    const linkTitle = document.createElement('div');
    linkTitle.className = 'section-title';
    linkTitle.textContent = 'Link do Projeto';
    linkSection.appendChild(linkTitle);

    const linkDiv = document.createElement('div');
    linkDiv.className = 'github-link';

    const linkAnchor = document.createElement('a');
    linkAnchor.href = link;
    linkAnchor.target = '_blank';
    linkAnchor.textContent = 'Veja no GitHub';
    linkDiv.appendChild(linkAnchor);

    linkSection.appendChild(linkDiv);
    portfolioContainer.appendChild(linkSection);

    // Retorna o elemento completo
    return portfolioContainer;
}

let listOfProjects = [];

function renderProjects() {
    // Remove todos os projetos do DOM
    document.querySelectorAll('.portfolio-container').forEach(container => container.remove());

    // Adiciona os projetos ordenados pela prioridade
    listOfProjects
        .sort((a, b) => b.priority - a.priority) // Ordem decrescente por prioridade
        .forEach(project => {
            document.body.appendChild(project.element);
        });
}

function addProject(priority, title, team, description, imageArray, link) {
    const projectElement = createProject(priority, title, team, description, imageArray, link);
    listOfProjects.push({ priority, element: projectElement });
    renderProjects();
}

addProject(
    30,
    'Compilador Online de Lua',
    ['João Gabriel, Emanuel Franklyn, Hugo e Leonardo'],
    'Criado para otimizar o tempo durante o minicurso (ministrado por mim e Emanuel) Desvendando Lua: Conceito, Sintaxe e Aplicações...',
    [
        './assets/desvendandoLua0.png',
        './assets/desvendandoLua1.png',
        './assets/desvendandoLua2.png',
        './assets/desvendandoLua3.png',
        './assets/desvendandoLua4.png',
        './assets/desvendandoLua5.png',
    ],
    'https://github.com/Osoapy/Desvendando-Lua'
);