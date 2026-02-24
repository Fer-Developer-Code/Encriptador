import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../Services/translation.service';

@Pipe({
    name: 'translate',
    standalone: true,
    pure: false // Necesario para que reaccione al Signal del servicio
})
export class TranslatePipe implements PipeTransform {
    constructor(private translationService: TranslationService) { }

    transform(value: string): string {
        return this.translationService.t(value);
    }
}
