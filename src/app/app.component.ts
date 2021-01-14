import { Component } from '@angular/core';
import {CardData} from './card-data.model';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-memory-game';

  options: Option[] = [
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'},
    {value: '7', viewValue: '7'},
    {value: '8', viewValue: '8'},
    {value: '9', viewValue: '9'},
    {value: '10', viewValue: '10'},
  ];

  cardImages = [
    'angular',
    'd3',
    'jenkins',
    'postcss',
    'react',
    'sass',
    'ts',
    'webpack'
  ];

  cardPairs = 3;

  cards: CardData[] = [];

  flippedCards: CardData[] = [];

  matchedCount = 0;

  stepCount = 0;

  selectedCardPairs = '3';

  ngOnInit(): void {
    this.setupCards(this.cardPairs);
  }

  setupCards(cnt): void {
    this.cardPairs = cnt;
    this.cards = [];
    this.flippedCards = [];
    this.cardImages.slice(0, this.cardPairs).forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.stepCount++;
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.slice(0, this.cardPairs).length) {
          alert('Game over');
        }
      }

    }, 1000);
  }

  restart(cnt): void {
    this.matchedCount = 0;
    this.stepCount = 0;
    this.setupCards(cnt);
  }

  newGameButtonPressed(): void {
    this.restart(this.selectedCardPairs);
  }

  restartButtonPressed(): void {
    this.restart(this.cardPairs);
  }
}
