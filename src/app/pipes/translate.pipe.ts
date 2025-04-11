import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'nameTranslator'
})
export class TranslatePipe implements PipeTransform {
  private apiKey = 'AIzaSyB-k4ohUZYjnHODXOZ3k6h1WMkv46eiX3Q';
  private apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`;
  private specialChars = ['<<', '>>', '"', "'"];

  constructor(private http: HttpClient) {}

  async transform(value: string): Promise<string> {
    const processedValue = this.escapeSpecialChars(value);

    const requestBody = {
      q: processedValue,
      target: localStorage.getItem('lang'), 
    };

    try {
      const response = await this.http.post<any>(this.apiUrl, requestBody).toPromise();
      const translatedText = response.data.translations[0].translatedText;
      return this.unescapeSpecialChars(translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      return value; 
    }
  }

  private escapeSpecialChars(text: string): string {
    this.specialChars.forEach(char => {
      text = text.split(char).join(`__${char}__`);
    });
    return text;
  }

  private unescapeSpecialChars(text: string): string {
    this.specialChars.forEach(char => {
      text = text.split(`__${char}__`).join(char);
    });
    return text;
  }
}
