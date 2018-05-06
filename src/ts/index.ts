import {
  randomNumber,
  nodeListToArray,
} from './helpers';

import './../scss/index.scss';

interface Container {
  scrollTop: number;
  scrollBottom: number;
  bgColor: string;
}

class CurtisCampbell {
  private containers: Container[];
  private iconsContainer: HTMLDivElement;
  private faces: HTMLImageElement[];

  constructor () {
    this.initialize();
  }

  initialize () {
    console.log('Hello. I see you are checking out my website!');
    console.log(`It's the smart play, I can't lie.`);
    console.log('You see those icons in the background? Great, huh?');
    console.log(`I refuse to take credit for those. Please check out \
                https://www.flaticon.com/authors/freepik for more!`);

    let facesCounter = 0;

    this.containers = [];
    this.faces = nodeListToArray(document.querySelectorAll('.face img'));
    this.iconsContainer =  document.querySelector('.background-icons');

    this.faces.forEach((element) => {
      const image = new Image();
      image.addEventListener('load', () => {
        facesCounter++;

        if (facesCounter === this.faces.length) {
          this.setupFaceAnimation();
        }
      });

      image.src = element.src;
    });

    this.setupBackground();
    this.setupContainers();
    this.attachEventListeners();
  }

  setupBackground () {
    const minSize = 128;
    const maxSize = 256;
    const minDelay = 0;
    const maxDelay = 1000;
    const minDuration = 250;
    const maxDuration = 750;
    const minTranslate = -40;
    const maxTranslate = 40;

    const imgElements = nodeListToArray(this.iconsContainer.querySelectorAll('img'));
    const images: HTMLImageElement[] = [];

    let imageLoadCounter = 0;

    // pull images from icon div
    imgElements.forEach((element: HTMLImageElement) => {
      const image = new Image();
      image.alt = element.alt;
      image.src = element.src;
      image.style.width = `${randomNumber(minSize, maxSize)}px`;
      image.style.top = `${randomNumber(minTranslate, maxTranslate)}px`;
      image.style.left = `${randomNumber(minTranslate, maxTranslate)}px`;
      image.style.animationDuration = `${randomNumber(minDuration, maxDuration)}ms`;
      image.style.animationDelay = `${randomNumber(minDelay, maxDelay)}ms`;
      image.src = image.src;

      image.addEventListener('load', () => {
        imageLoadCounter++;
        images.push(image);
        this.iconsContainer.removeChild(element);

        if (imageLoadCounter === imgElements.length) {
          this.generateIconGrid(images);
        }
      });
    });
  }

  generateIconGrid (images: HTMLImageElement[]) {
    const gridSize: number = 6;
    const gridArray: Element[] = new Array(gridSize * gridSize);

    // create Grid
    for (let i = 0; i < gridArray.length; i++) {
      const div = document.createElement('div');
      this.iconsContainer.appendChild(div);
    }

    const divArray = nodeListToArray(this.iconsContainer.querySelectorAll('div'));

    images.forEach((image: HTMLImageElement) => {
      let generating = true;

      while (generating) {
        const index = Math.floor(Math.random() * (gridArray.length));
        const div = divArray[index];

        if (!div.querySelector('img')) {
          div.appendChild(image);
          generating = false;
        }
      }
    });

    this.iconsContainer.classList.remove('hidden');
  }

  setupFaceAnimation () {
    const facesContainer = document.querySelector('.face');
    const timer = 500;
    let currentIndex = 0;

    facesContainer.classList
      .remove('hidden');

    setTimeout(() => {
      facesContainer.classList
      .add('animated');

      facesContainer.classList
        .add('bounceIn');
    }, 0);

    setInterval(() => {
      this.faces.forEach((element: HTMLElement) => element.classList.add('hidden'));
      this.faces[currentIndex].classList.remove('hidden');
      currentIndex = currentIndex < this.faces.length - 1 ?
        currentIndex + 1 : 0;
    }, timer);
  }

  setupContainers () {
    const containers = nodeListToArray(document.querySelectorAll('.container'));
    containers.forEach((element: HTMLElement) => {
      this.containers.push({
        bgColor: element.dataset.bg,
        scrollBottom: element.offsetTop + element.clientHeight,
        scrollTop: element.offsetTop,
      });
    });
  }

  attachEventListeners () {
    document.addEventListener('scroll', this.onScroll);
  }

  onScroll = (e: Event) => {
    const windowScroll = window.scrollY;
    const scrollOffset = 200;

    this.containers.forEach((container) => {
      if (
        windowScroll > container.scrollTop - scrollOffset &&
        windowScroll < container.scrollBottom + scrollOffset
      ) {
        document.body.style.backgroundColor = container.bgColor;
      }
    });
  }
}

const app = new CurtisCampbell();
