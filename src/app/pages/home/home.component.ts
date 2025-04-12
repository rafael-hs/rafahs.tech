import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit, OnDestroy {
  private particleInterval: any;

  constructor() { }

  ngOnInit(): void {
    // Inicializa o efeito de partículas flutuantes adicionais
    this.initDynamicParticles();
  }

  ngOnDestroy(): void {
    // Limpa o intervalo quando o componente é destruído
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
  }

  // Função para criar partículas dinâmicas adicionais
  initDynamicParticles(): void {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Cria partículas dinâmicas a cada 4 segundos (reduzido)
    this.particleInterval = setInterval(() => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Posição aleatória
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      
      // Tamanho menor
      const size = Math.random() * 1.5 + 0.5;
      
      // Apenas cores azuis para maior sutileza
      const colors = ['#00ffff', '#00f0ff', '#0088ff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Aplica estilos
      particle.style.top = `${top}%`;
      particle.style.left = `${left}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 5px ${color}`;
      particle.style.opacity = '0.3';
      
      // Adiciona ao container
      particlesContainer.appendChild(particle);
      
      // Remove após alguns segundos
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 4000);
    }, 4000);
  }

  toggleNavButton() {
    let button = document.getElementById("resumeButton")
    if (button) {
      let nav = document.getElementById("resumes")
      if (nav?.classList.contains("show")) {
        nav.classList.add("hidden")
        nav.classList.remove("show")
      }
      else {
        if (nav) {
          nav.classList.add("show")
          nav.classList.remove("hidden")
        }
      }
    }
  }
}
