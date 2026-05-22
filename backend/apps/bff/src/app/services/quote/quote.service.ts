import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QuoteRequestDto, QuoteResponseDto } from '@target/interfaces';

@Injectable()
export class QuoteService {
  async getQuote(requestDto: QuoteRequestDto): Promise<QuoteResponseDto> {
    const { beitrag, birthdate } = requestDto;

    // FIXME: just for demo's sake
    // for testing errors
    if (birthdate === '2000-01-01') {
      throw new HttpException('This is an explicit error to test error handling in the frontend', HttpStatus.FORBIDDEN);
    }
    // for testing timeouts
    const multiplier = birthdate === '2000-01-02' ? 10000 : 2000;
    // END-FIXME

    await this.sleep(Math.random() * multiplier); // Simulate a real quote service delay 😅

    return {
      basisdaten: {
        geburtsdatum: birthdate,
        versicherungsbeginn: '2025-02-01',
        garantieniveau: '90%',
        alterBeiRentenbeginn: 67,
        aufschubdauer: 30,
        beitragszahlungsdauer: 10,
      },
      leistungsmerkmale: {
        garantierteMindestrente: beitrag * 50,
        einmaligesGarantiekapital: beitrag / 2,
        todesfallleistungAbAltersrentenbezug: 67,
      },
      beitrag: {
        einmalbeitrag: beitrag,
        beitragsdynamik: '1,5%',
      },
    };
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
